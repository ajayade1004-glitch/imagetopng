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
  CheckSquare,
  Square,
  Image as ImageIcon,
  Loader2,
  ExternalLink,
  Layers,
} from 'lucide-react';

export type ImportSourceType = 'url' | 'drive' | 'dropbox' | 'onedrive';

export interface ExtractedImageItem {
  url: string;
  name: string;
  alt?: string;
  selected?: boolean;
}

interface CloudImportModalProps {
  source: ImportSourceType | null;
  isOpen: boolean;
  onClose: () => void;
  onImportFile: (file: File) => void;
  onImportFiles?: (files: File[]) => void;
  onSelectDevice?: () => void;
}

export const CloudImportModal: React.FC<CloudImportModalProps> = ({
  source,
  isOpen,
  onClose,
  onImportFile,
  onImportFiles,
  onSelectDevice,
}) => {
  const [urlInput, setUrlInput] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Extracted images state
  const [extractedImages, setExtractedImages] = useState<ExtractedImageItem[]>([]);
  const [pageTitle, setPageTitle] = useState<string | null>(null);
  const [isDirect, setIsDirect] = useState(false);

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
          help: 'Paste any Dropbox shared link. We automatically stream the direct image asset with zero login required.',
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
          title: 'Import Image from Any Web URL or Page',
          badge: 'Smart Multi-Image Extractor',
          placeholder: 'Paste any webpage link or image URL (e.g. Wikipedia, Unsplash, Blog, or Direct Link)',
          help: 'Paste any webpage URL or image link. Our smart scanner extracts ALL images on that page so you can select and convert them all at once!',
          iconBg: 'bg-indigo-600',
          samples: [
            {
              name: 'Wikimedia PNG Demonstration',
              url: 'https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png',
            },
            {
              name: 'Unsplash Nature HD (JPG)',
              url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
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

  // Step 1: Extract all images from URL
  const handleFetchImages = async () => {
    setError(null);
    const raw = urlInput.trim();

    if (!raw) {
      setError('Please paste a web link or image URL to continue.');
      return;
    }

    setIsExtracting(true);
    setStatusMessage('Scanning webpage and extracting all images...');
    setExtractedImages([]);

    try {
      // 1. Check if Base64 Data URI
      if (raw.startsWith('data:image/')) {
        const arr = raw.split(',');
        const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        const blob = new Blob([u8arr], { type: mime });
        const file = new File([blob], `imported-${Date.now()}.png`, {
          type: blob.type || 'image/png',
          lastModified: Date.now(),
        });
        if (onImportFiles) onImportFiles([file]);
        else onImportFile(file);
        handleClose();
        return;
      }

      // 2. Call backend /api/extract-images
      const extractApi = `/api/extract-images?url=${encodeURIComponent(raw)}`;
      const res = await fetch(extractApi);

      if (res.ok) {
        const data = await res.json();
        if (data.images && data.images.length > 0) {
          setPageTitle(data.pageTitle || 'Web Images');
          setIsDirect(data.isDirect || data.images.length === 1);
          setExtractedImages(
            data.images.map((img: any) => ({
              url: img.url,
              name: img.name || 'image.png',
              alt: img.alt || 'Web Photo',
              selected: true, // Default all checked
            }))
          );
          setStatusMessage(null);
          setIsExtracting(false);
          return;
        }
      }

      // Fallback: Direct candidate
      setPageTitle('Direct Image Link');
      setIsDirect(true);
      setExtractedImages([
        {
          url: raw,
          name: 'web-image.png',
          alt: 'Direct Web Image',
          selected: true,
        },
      ]);
      setStatusMessage(null);
    } catch (err: any) {
      console.warn('Extraction fallback:', err);
      setPageTitle('Direct Image Link');
      setIsDirect(true);
      setExtractedImages([
        {
          url: raw,
          name: 'web-image.png',
          alt: 'Web Image',
          selected: true,
        },
      ]);
    } finally {
      setIsExtracting(false);
      setStatusMessage(null);
    }
  };

  // Helper: Fetch a single image URL into a File object with fast proxy
  const fetchSingleImageAsFile = async (item: ExtractedImageItem): Promise<File | null> => {
    let blob: Blob | null = null;
    const targetUrl = item.url;

    // 1. Try local server proxy
    try {
      const proxyApi = `/api/proxy-image?url=${encodeURIComponent(targetUrl)}`;
      const res = await fetch(proxyApi);
      if (res.ok) {
        const b = await res.blob();
        if (b && b.size > 100) blob = b;
      }
    } catch {
      // Fall through
    }

    // 2. Try direct CORS fetch
    if (!blob) {
      try {
        const res = await fetch(targetUrl, { mode: 'cors' });
        if (res.ok) {
          const b = await res.blob();
          if (b && b.size > 100) blob = b;
        }
      } catch {
        // Fall through
      }
    }

    // 3. Try high-availability CDN proxy
    if (!blob) {
      const proxies = [
        `https://corsproxy.io/?url=${encodeURIComponent(targetUrl)}`,
        `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`,
      ];
      for (const p of proxies) {
        try {
          const res = await fetch(p);
          if (res.ok) {
            const b = await res.blob();
            if (b && b.size > 100) {
              blob = b;
              break;
            }
          }
        } catch {
          // Next
        }
      }
    }

    // 4. Canvas Image fallback
    if (!blob) {
      try {
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
                reject(new Error('Canvas error'));
                return;
              }
              ctx.drawImage(img, 0, 0);
              canvas.toBlob(
                (b) => {
                  if (b && b.size > 0) resolve(b);
                  else reject(new Error('Blob error'));
                },
                'image/png',
                1.0
              );
            } catch (err) {
              reject(err);
            }
          };
          img.onerror = () => reject(new Error('Image render error'));
          img.src = targetUrl;
        });
      } catch {
        // Failed
      }
    }

    if (blob) {
      const safeName = item.name.endsWith('.png') ? item.name : `${item.name.replace(/\.[^.]+$/, '')}.png`;
      return new File([blob], safeName, {
        type: blob.type || 'image/png',
        lastModified: Date.now(),
      });
    }

    return null;
  };

  // Step 2: Import all selected images in parallel
  const handleImportSelected = async () => {
    const selectedItems = extractedImages.filter((img) => img.selected);
    if (selectedItems.length === 0) {
      setError('Please select at least one image to convert.');
      return;
    }

    setIsImporting(true);
    setError(null);
    setStatusMessage(`Importing ${selectedItems.length} image(s)...`);

    // Fetch images with fast parallel pool
    const fetchPromises = selectedItems.map((item) => fetchSingleImageAsFile(item));
    const results = await Promise.allSettled(fetchPromises);

    const validFiles: File[] = [];
    results.forEach((r) => {
      if (r.status === 'fulfilled' && r.value) {
        validFiles.push(r.value);
      }
    });

    setIsImporting(false);
    setStatusMessage(null);

    if (validFiles.length > 0) {
      if (onImportFiles) {
        onImportFiles(validFiles);
      } else {
        validFiles.forEach((f) => onImportFile(f));
      }
      handleClose();
    } else {
      setError('Could not download the selected images due to strict host CORS protection. You can download the image to your device and use "From Device" instead.');
    }
  };

  const toggleSelectImage = (index: number) => {
    setExtractedImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, selected: !img.selected } : img))
    );
  };

  const selectAll = (select: boolean) => {
    setExtractedImages((prev) => prev.map((img) => ({ ...img, selected: select })));
  };

  const handleClose = () => {
    setUrlInput('');
    setExtractedImages([]);
    setPageTitle(null);
    setError(null);
    setStatusMessage(null);
    onClose();
  };

  const selectedCount = extractedImages.filter((img) => img.selected).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-fade-in font-sans">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${details.iconBg} text-white flex items-center justify-center shadow-md shadow-blue-500/10`}>
              {details.logo}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                  {details.title}
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-800 rounded-full">
                  {details.badge}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Paste link to find, select, and convert all images to PNG
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* URL Input Form */}
          <div className="space-y-2">
            <label htmlFor="import-url-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Paste Web Page URL or Direct Image Link:
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  id="import-url-input"
                  type="url"
                  value={urlInput}
                  onChange={(e) => {
                    setUrlInput(e.target.value);
                    setError(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleFetchImages();
                  }}
                  placeholder={details.placeholder}
                  disabled={isExtracting || isImporting}
                  className="w-full pl-9 pr-8 py-2.5 sm:py-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500 focus:ring-3 focus:ring-blue-100 text-slate-800 transition-all placeholder:text-slate-400 font-mono disabled:opacity-50"
                  autoFocus
                />
                <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                {urlInput && (
                  <button
                    type="button"
                    onClick={() => {
                      setUrlInput('');
                      setExtractedImages([]);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={handleFetchImages}
                disabled={!urlInput.trim() || isExtracting || isImporting}
                className="px-4 sm:px-5 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:opacity-50 disabled:pointer-events-none text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-blue-500/20 cursor-pointer flex items-center gap-1.5 shrink-0"
              >
                {isExtracting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Scanning...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Fetch Images</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Status Message / Loading Progress */}
          {(isExtracting || isImporting) && statusMessage && (
            <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-3 text-xs text-blue-800 animate-pulse">
              <Loader2 className="w-4 h-4 animate-spin text-blue-600 shrink-0" />
              <span className="font-medium">{statusMessage}</span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-700 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold">{error}</p>
                {onSelectDevice && (
                  <button
                    type="button"
                    onClick={() => {
                      handleClose();
                      onSelectDevice();
                    }}
                    className="mt-2 text-[11px] font-bold text-red-800 underline hover:no-underline cursor-pointer flex items-center gap-1"
                  >
                    <Folder className="w-3.5 h-3.5" />
                    <span>Upload from Device / Phone Instead</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* EXTRACTED IMAGES SELECTION GRID */}
          {extractedImages.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-slate-100 animate-fade-in">
              {/* Grid Header & Controls */}
              <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-md bg-blue-100 text-blue-700">
                    <ImageIcon className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-xs font-extrabold text-slate-800 block leading-tight">
                      Found {extractedImages.length} Image{extractedImages.length > 1 ? 's' : ''} on page
                    </span>
                    {pageTitle && (
                      <span className="text-[11px] text-slate-500 block truncate max-w-xs sm:max-w-md">
                        {pageTitle}
                      </span>
                    )}
                  </div>
                </div>

                {extractedImages.length > 1 && (
                  <div className="flex items-center gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => selectAll(true)}
                      className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-bold cursor-pointer transition-colors shadow-2xs"
                    >
                      Select All
                    </button>
                    <button
                      type="button"
                      onClick={() => selectAll(false)}
                      className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-bold cursor-pointer transition-colors shadow-2xs"
                    >
                      Deselect All
                    </button>
                  </div>
                )}
              </div>

              {/* Grid Gallery */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[320px] overflow-y-auto p-1">
                {extractedImages.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => toggleSelectImage(idx)}
                    className={`relative rounded-xl border-2 overflow-hidden cursor-pointer group transition-all bg-slate-50 flex flex-col ${
                      img.selected
                        ? 'border-blue-600 ring-2 ring-blue-100 shadow-md bg-blue-50/20'
                        : 'border-slate-200 hover:border-slate-300 opacity-75 hover:opacity-100'
                    }`}
                  >
                    {/* Checkbox badge */}
                    <div className="absolute top-2 left-2 z-10">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shadow-xs transition-colors ${
                          img.selected ? 'bg-blue-600 text-white' : 'bg-white/90 border border-slate-300 text-transparent'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    </div>

                    {/* Thumbnail Image */}
                    <div className="aspect-square w-full relative bg-slate-100 overflow-hidden flex items-center justify-center">
                      <img
                        src={`/api/proxy-image?url=${encodeURIComponent(img.url)}`}
                        alt={img.alt || `Found image ${idx + 1}`}
                        loading="lazy"
                        onError={(e) => {
                          // Try direct if proxy fails
                          (e.target as HTMLImageElement).src = img.url;
                        }}
                        className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform"
                      />
                    </div>

                    {/* Filename caption */}
                    <div className="p-1.5 bg-white border-t border-slate-100 text-[10px] text-slate-600 truncate font-mono">
                      {img.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sample quick test links (if user has not searched yet) */}
          {extractedImages.length === 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Quick Test Links (Click to try):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {details.samples.map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setUrlInput(s.url);
                      setError(null);
                    }}
                    className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50/70 hover:border-blue-300 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {s.name}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <span className="text-[10px] text-slate-400 block truncate font-mono mt-0.5">
                      {s.url}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-slate-400" />
            <span>High-speed proxy with zero server storage</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>

            {extractedImages.length > 0 ? (
              <button
                type="button"
                onClick={handleImportSelected}
                disabled={selectedCount === 0 || isImporting}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:opacity-50 disabled:pointer-events-none text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-blue-500/20 cursor-pointer flex items-center gap-2"
              >
                {isImporting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Importing ({selectedCount})...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Import &amp; Convert Selected ({selectedCount})</span>
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFetchImages}
                disabled={!urlInput.trim() || isExtracting}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:opacity-50 disabled:pointer-events-none text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-blue-500/20 cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Fetch Images</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
