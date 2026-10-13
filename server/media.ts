import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { Request, Response } from 'express';
import { db } from './db';
import { AuthenticatedRequest } from './auth';

const UPLOAD_DIR = path.resolve(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Allowed MIME types and their expected magic bytes signatures
const ALLOWED_SIGNATURES: { [mime: string]: (buffer: Buffer) => boolean } = {
  'image/jpeg': (buf) => buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff,
  'image/png': (buf) =>
    buf.length >= 8 &&
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47 &&
    buf[4] === 0x0d &&
    buf[5] === 0x0a &&
    buf[6] === 0x1a &&
    buf[7] === 0x0a,
  'image/webp': (buf) =>
    buf.length >= 12 &&
    buf.toString('ascii', 0, 4) === 'RIFF' &&
    buf.toString('ascii', 8, 12) === 'WEBP',
  'image/gif': (buf) =>
    buf.length >= 6 &&
    (buf.toString('ascii', 0, 6) === 'GIF87a' || buf.toString('ascii', 0, 6) === 'GIF89a'),
};

const storage = multer.memoryStorage();

export const uploadMiddleware = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 Megabytes maximum
    files: 1,
  },
  fileFilter: (_req, file, cb) => {
    // Preliminary MIME check; rigorous binary inspection happens after upload into memory
    const mime = file.mimetype.toLowerCase();
    if (['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(mime)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, WEBP, and GIF images are permitted for security. SVGs and active documents are disallowed.'));
    }
  },
});

export function handleMediaUpload(req: AuthenticatedRequest, res: Response): void {
  const file = req.file;
  if (!file) {
    res.status(400).json({ error: 'No file uploaded.' });
    return;
  }

  const mime = file.mimetype.toLowerCase();
  const validator = ALLOWED_SIGNATURES[mime];

  // Deep binary validation: inspect actual magic bytes
  if (!validator || !validator(file.buffer)) {
    db.logAudit({
      actorEmail: req.userSession?.email || 'unknown',
      action: 'MEDIA_UPLOAD_REJECTED',
      resourceType: 'media',
      resourceId: file.originalname,
      details: `Spoofed or invalid file signature detected for MIME: ${mime}`,
      ip: req.ip || '127.0.0.1',
      outcome: 'failure',
    });
    res.status(400).json({
      error: 'Security rejection: file content does not match declared image signature.',
    });
    return;
  }

  // Generate cryptographic non-guessable storage filename
  const extensionMap: Record<string, string> = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
    'image/gif': '.gif',
  };
  const ext = extensionMap[mime] || '.bin';
  const safeFilename = `innosight_${Date.now()}_${crypto.randomBytes(8).toString('hex')}${ext}`;
  const targetPath = path.join(UPLOAD_DIR, safeFilename);

  try {
    fs.writeFileSync(targetPath, file.buffer);
    const publicUrl = `/uploads/${safeFilename}`;
    const altText = (req.body.altText as string) || path.parse(file.originalname).name;

    const mediaRecord = db.addMedia({
      filename: safeFilename,
      originalName: path.basename(file.originalname),
      mimeType: mime,
      size: file.size,
      url: publicUrl,
      altText,
    });

    db.logAudit({
      actorEmail: req.userSession?.email || 'admin',
      action: 'MEDIA_UPLOADED',
      resourceType: 'media',
      resourceId: mediaRecord.id,
      details: `Uploaded ${file.originalname} (${file.size} bytes) -> ${publicUrl}`,
      ip: req.ip || '127.0.0.1',
      outcome: 'success',
    });

    res.status(201).json({
      success: true,
      media: mediaRecord,
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to write media file to disk securely.' });
  }
}
