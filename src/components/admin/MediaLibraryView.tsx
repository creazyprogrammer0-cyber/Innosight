import React, { useEffect, useState, useRef } from 'react';
import { cmsClient } from '../../services/cmsClient';
import {
  Upload,
  Image as ImageIcon,
  Trash2,
  Copy,
  Check,
  AlertCircle,
  FileCheck,
  Search,
} from 'lucide-react';

export const MediaLibraryView: React.FC = () => {
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [altText, setAltText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadMedia = async () => {
    setLoading(true);
    try {
      const data = await cmsClient.getMedia();
      setMediaItems(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message || 'Failed to load media library');
      setMediaItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      await cmsClient.uploadMedia(file, altText);
      setAltText('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      await loadMedia();
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete media asset "${name}"?`)) return;
    try {
      await cmsClient.deleteMedia(id);
      await loadMedia();
    } catch (err: any) {
      alert(err.message || 'Failed to delete');
    }
  };

  const safeMedia = Array.isArray(mediaItems) ? mediaItems : [];
  const filteredMedia = safeMedia.filter((m) => {
    if (!m) return false;
    const name = String(m.originalName || m.filename || '').toLowerCase();
    const alt = String(m.altText || '').toLowerCase();
    const query = searchQuery.toLowerCase();
    return name.includes(query) || alt.includes(query);
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-emerald-600" />
            Media & Asset Library
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Magic-byte verified image storage • Max 5MB • Safe cryptographic file naming
          </p>
        </div>

        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#7025E8] hover:bg-[#5E1DC7] text-white text-xs font-semibold rounded-xl shadow-sm transition-all cursor-pointer disabled:opacity-50"
          >
            {uploading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            <span>Upload Image</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search media..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#7025E8] focus:bg-white"
          />
        </div>
        <div className="text-xs text-slate-400">
          Showing {filteredMedia.length} of {mediaItems.length} assets
        </div>
      </div>

      {/* Grid of Assets */}
      {loading ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200/80">
          <div className="w-8 h-8 border-3 border-[#7025E8] border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="p-12 text-center text-xs text-slate-400 bg-white rounded-2xl border border-slate-200/80">
          No media files uploaded yet. Click "Upload Image" to upload JPG, PNG, WEBP, or GIF.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="aspect-video bg-slate-100 flex items-center justify-center overflow-hidden relative">
                <img
                  src={item.url}
                  alt={item.altText || item.originalName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-3 text-xs space-y-1.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="font-semibold text-slate-900 truncate" title={item.originalName}>
                    {item.originalName}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {(item.size / 1024).toFixed(1)} KB • {item.mimeType?.split('/')[1]?.toUpperCase()}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <button
                    onClick={() => handleCopyUrl(item.url, item.id)}
                    className="inline-flex items-center gap-1 text-[11px] text-[#7025E8] hover:text-[#5E1DC7] font-semibold cursor-pointer"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleDelete(item.id, item.originalName)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors cursor-pointer"
                    title="Delete media"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
