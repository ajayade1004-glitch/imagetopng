import React, { useState } from 'react';
import {
  X,
  Link as LinkIcon,
  Download,
  AlertCircle,
  Check,
  Globe,
  Sparkles,
  HelpCircle,
  Copy,
  ArrowRight,
  Folder,
} from 'lucide-react';

export type ImportSourceType = 'url' | 'drive' | 'dropbox' | 'onedrive';

interface CloudImportModalProps {
  source: ImportSourceType | null;
  isOpen: boolean;
  onClose: () => void;
  onImportFile: (file: File) => void;
  onSelectDevice?: () => void;
}

export const CloudImportModal: React.FC<CloudImportModalProps> = ({
  source,
  isOpen,
  onClose,
  onImportFile,
  onSelectDevice,
}) => {
  const [urlInput, setUrlInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !source) return null;

  const getSourceDetails = () => {
    switch (source) {
      case 'drive':
        return {
          title: 'Import from Google Drive',
          badge: 'No Login Needed',
          placeholder: 'Paste Google Drive file link (e.g. https://drive.google.com/file/d/.../view)',
          help: 'Make sure your Google Drive link sharing is set to "Anyone with the link". We fetch and convert your image directly in browser memory without requiring your Google account credentials.',
          iconBg: 'bg-amber-500',
          samples: [
            {
              name: 'Sample Google Drive Photo',
              url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
            },
          ],
          logo: (
            <svg className="w-5 h-5" viewBox="0 0 87.3 78" fill="none">
              <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5z" fill="#0066DA"/>
              <path d="M43.65 25 29.9 1.2c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44C.4 50 0 51.55 0 53.1h27.5z" fill="#00AC47"/>
              <path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H59.8l5.85 10.15z" fill="#EA4335"/>
              <path d="M43.65 25 57.4 1.2C56.05.4 54.5 0 52.95 0H34.35c-1.55 0-3.1.4-4.45 1.2z" fill="#00832D"/>
              <path d="M59.8 53.1H87.3c0-1.55-.4-3.1-1.2-4.5l-25.4-44c-.8-1.4-1.95-2.5-3.3-3.3L43.65 25z" fill="#FFBA00"/>
              <path d="M73.55 76.8H27.5l-13.75 23.8c1.35.8 2.9 1.2 4.45 1.2h50.9c1.55 0 3.1-.4 4.45-1.2z" fill="#2684FC"/>
            </svg>
          ),
        };
      case 'dropbox':
        return {
          title: 'Import from Dropbox',
          badge: 'Direct CDN',
          placeholder: 'Paste Dropbox shared link (e.g. https://www.dropbox.com/s/.../photo.jpg)',
          help: 'Paste any Dropbox shared link. We automatically stream the direct image asset (raw=1) with zero login required.',
          iconBg: 'bg-blue-600',
          samples: [
            {
              name: 'Sample Dropbox Image',
              url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
            },
          ],
          logo: (
            <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
              <path d="M6.02 1.83 0 5.75l6.02 3.92 6-4.04-6-3.8zM17.98 1.83l-6 3.8 6 4.04 6.02-3.92-6.02-3.92zM0 13.59l6.02 3.92 6-3.8-6.02-4.04L0 13.59zm17.98-3.92-6.02 4.04 6 3.8 6.02-3.92-6-3.92zM6 19.46l6.02 3.89 6.02-3.89-6.02-3.8-6.02 3.8z"/>
            </svg>
          ),
        };
      case 'onedrive':
        return {
          title: 'Import from OneDrive',
          badge: 'Zero Login',
          placeholder: 'Paste OneDrive public shared link',
          help: 'Paste any OneDrive public image link. The photo will be imported and converted locally in your browser memory.',
          iconBg: 'bg-sky-600',
          samples: [
            {
              name: 'Sample Public Image',
              url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
            },
          ],
          logo: (
            <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
            </svg>
          ),
        };
      default:
        return {
          title: 'Import Image from URL',
          badge: 'Direct Web Fetch',
          placeholder: 'https://example.com/image.jpg (or webp, png, avif, svg)',
          help: 'Paste any web image URL or Data URI. Our built-in image pipeline will fetch and convert it into a crisp PNG.',
          iconBg: 'bg-indigo-600',
          samples: [
            {
              name: 'Unsplash Nature (JPG)',
              url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
            },
            {
              name: 'Wikimedia PNG Demonstration',
              url: 'https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png',
            },
            {
              name: 'Sample WebP Photo',
              url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
            },
          ],
          logo: <LinkIcon className="w-5 h-5 text-white" />,
        };
    }
  };

  const details = getSourceDetails();

  // Helper: Normalize Cloud and CDN Links
  const normalizeUrlCandidates = (raw: string): string[] => {
    let u = raw.trim();
    if (!u) return [];

    // Base64 Data URL
    if (u.startsWith('data:image/')) {
      return [u];
    }

    const candidates: string[] = [];

    // 1. Google Drive URLs
    if (u.includes('drive.google.com')) {
      const match = u.match(/\/d\/([a-zA-Z0-9_-]+)/) || u.match(/id=([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        const fileId = match[1];
        candidates.push(`https://lh3.googleusercontent.com/d/${fileId}`);
        candidates.push(`https://drive.google.com/uc?export=download&id=${fileId}`);
      }
    }

    // 2. Dropbox URLs
    if (u.includes('dropbox.com')) {
      let direct = u.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
      if (direct.includes('?dl=0')) direct = direct.replace('?dl=0', '?raw=1');
      else if (!direct.includes('raw=1')) direct += direct.includes('?') ? '&raw=1' : '?raw=1';
      candidates.push(direct);
      candidates.push(u);
    }

    // 3. Imgur URLs
    if (u.includes('imgur.com') && !u.includes('i.imgur.com')) {
      const match = u.match(/imgur\.com\/([a-zA-Z0-9]+)/);
      if (match && match[1]) {
        candidates.push(`https://i.imgur.com/${match[1]}.png`);
      }
    }

    // Standard candidate
    if (!candidates.includes(u)) {
      candidates.push(u);
    }

    return candidates;
  };

  // Convert Base64 Data URL to Blob
  const dataUrlToBlob = (dataUrl: string): Blob => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const handleImport = async () => {
    setError(null);
    const raw = urlInput.trim();

    if (!raw) {
      setError('Please paste an image URL or link to continue.');
      return;
    }

    setIsLoading(true);
    setStatusMessage('Connecting to image source...');

    try {
      // 1. Check if Base64 Data URI
      if (raw.startsWith('data:image/')) {
        const blob = dataUrlToBlob(raw);
        const file = new File([blob], `imported-${Date.now()}.png`, {
          type: blob.type || 'image/png',
          lastModified: Date.now(),
        });
        onImportFile(file);
        onClose();
        setUrlInput('');
        return;
      }

      const candidates = normalizeUrlCandidates(raw);
      let blob: Blob | null = null;
      let usedUrl = candidates[0] || raw;

      // 2. Stage 1: Try Local Server Proxy endpoint (/api/proxy-image)
      for (const targetUrl of candidates) {
        try {
          setStatusMessage('Streaming image via secure proxy...');
          const proxyApiUrl = `/api/proxy-image?url=${encodeURIComponent(targetUrl)}`;
          const res = await fetch(proxyApiUrl);
          if (res.ok) {
            const b = await res.blob();
            if (b && b.size > 100) {
              blob = b;
              usedUrl = targetUrl;
              break;
            }
          }
        } catch {
          // Fall through
        }
      }

      // 3. Stage 2: Direct CORS fetch
      if (!blob) {
        for (const targetUrl of candidates) {
          try {
            setStatusMessage('Attempting direct connection...');
            const res = await fetch(targetUrl, { mode: 'cors' });
            if (res.ok) {
              const b = await res.blob();
              if (b && b.size > 100) {
                blob = b;
                usedUrl = targetUrl;
                break;
              }
            }
          } catch {
            // CORS blocked, continue
          }
        }
      }

      // 4. Stage 3: Public High-Availability Image Proxies
      if (!blob) {
        const proxyUrls = [
          `https://api.allorigins.win/raw?url=${encodeURIComponent(usedUrl)}`,
          `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(usedUrl)}`,
          `https://corsproxy.io/?url=${encodeURIComponent(usedUrl)}`,
        ];

        for (const proxyUrl of proxyUrls) {
          try {
            setStatusMessage('Routing through CDN proxy...');
            const res = await fetch(proxyUrl);
            if (res.ok) {
              const b = await res.blob();
              if (b && b.size > 200) {
                blob = b;
                break;
              }
            }
          } catch {
            // Next proxy
          }
        }
      }

      // 5. Stage 4: Canvas Image element fallback
      if (!blob) {
        setStatusMessage('Rendering via canvas pipeline...');
        blob = await new Promise<Blob>((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            try {
              const canvas = document.createElement('canvas');
              canvas.width = img.naturalWidth || img.width;
              canvas.height = img.naturalHeight || img.height;
              const ctx = canvas.getContext('2d');
              if (!ctx) {
                reject(new Error('Canvas context unavailable'));
                return;
              }
              ctx.drawImage(img, 0, 0);
              canvas.toBlob(
                (b) => {
                  if (b && b.size > 0) resolve(b);
                  else reject(new Error('Failed to convert canvas to blob'));
                },
                'image/png',
                1.0
              );
            } catch (canvasErr) {
              reject(canvasErr);
            }
          };
          img.onerror = () => {
            reject(new Error('Image could not be rendered.'));
          };
          img.src = usedUrl;
        });
      }

      if (!blob || blob.size === 0) {
        throw new Error('Image could not be retrieved.');
      }

      // Generate a clean filename
      let filename = 'imported-photo.png';
      try {
        const parsed = new URL(usedUrl);
        const segs = parsed.pathname.split('/');
        const last = segs[segs.length - 1];
        if (last && last.includes('.')) {
          filename = decodeURIComponent(last);
        } else {
          filename = `${source || 'imported'}-${Date.now().toString().slice(-4)}.png`;
        }
      } catch {
        filename = `${source || 'imported'}-${Date.now().toString().slice(-4)}.png`;
      }

      const file = new File([blob], filename, {
        type: blob.type.startsWith('image/') ? blob.type : 'image/png',
        lastModified: Date.now(),
      });

      onImportFile(file);
      onClose();
      setUrlInput('');
    } catch (err: any) {
      console.error(err);
      setError(
        'Could not fetch image directly from this URL due to CORS security rules on the remote server. Try clicking one of the sample test links below, or save the image to your phone/computer and use "From Device".'
      );
    } finally {
      setIsLoading(false);
      setStatusMessage(null);
    }
  };

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrlInput(text.trim());
      }
    } catch {
      // Permission denied
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-fade-in text-xs font-sans"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl flex flex-col max-h-[90vh] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50/90 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className={`p-2 rounded-xl ${details.iconBg} text-white shadow-xs`}>
              {details.logo}
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                  {details.title}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-blue-100 text-blue-800">
                  {details.badge}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                100% In-Browser • Zero Credentials Stored
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-5 space-y-3.5 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-800">
                Paste Image URL or File Link:
              </label>
              <button
                type="button"
                onClick={handlePasteClipboard}
                className="text-[11px] text-blue-600 hover:text-blue-800 font-semibold cursor-pointer inline-flex items-center gap-1"
              >
                <Copy className="w-3 h-3" />
                <span>Paste from Clipboard</span>
              </button>
            </div>

            <div className="relative">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder={details.placeholder}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
                autoFocus
              />
              {urlInput && (
                <button
                  type="button"
                  onClick={() => setUrlInput('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Helper instructions */}
          <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 text-[11px] text-slate-600 leading-relaxed">
            {details.help}
          </div>

          {/* Quick 1-Click Test Samples */}
          {details.samples && details.samples.length > 0 && (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-[11px] font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Quick Test Samples (Click to Test Instantly):
              </p>
              <div className="flex flex-wrap gap-1.5">
                {details.samples.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setUrlInput(s.url)}
                    className="px-2.5 py-1 rounded-lg bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-400 text-[11px] font-medium text-slate-700 hover:text-blue-600 transition-colors cursor-pointer shadow-2xs inline-flex items-center gap-1"
                  >
                    <span>{s.name}</span>
                    <ArrowRight className="w-2.5 h-2.5 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Status Message */}
          {isLoading && (
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs flex items-center gap-2 animate-pulse">
              <div className="w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <span>{statusMessage || 'Loading image...'}</span>
            </div>
          )}

          {/* Error Banner with 1-Click Device Switch Shortcut */}
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex flex-col gap-2.5">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
                <p className="leading-relaxed">{error}</p>
              </div>
              {onSelectDevice && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onSelectDevice();
                  }}
                  className="self-start px-3 py-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-900 font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
                >
                  <Folder className="w-3.5 h-3.5 text-red-700" />
                  <span>Choose from Device / Phone Instead</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer (Always Visible at bottom) */}
        <div className="p-3.5 border-t border-slate-200 bg-slate-50/90 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold cursor-pointer text-xs transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleImport}
            disabled={isLoading || !urlInput.trim()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold cursor-pointer shadow-md shadow-blue-600/20 disabled:opacity-50 transition-all active:scale-95 text-xs sm:text-sm"
          >
            {isLoading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Importing...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Import &amp; Convert</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
