import React, { useState, useEffect } from 'react';
import {
  FilePlus,
  ChevronUp,
  ChevronDown,
  Folder,
  Link as LinkIcon,
  X,
  Cloud,
} from 'lucide-react';
import { ImportSourceType } from './CloudImportModal';

interface AddMoreDropdownProps {
  onSelectSource: (source: 'device' | ImportSourceType) => void;
  className?: string;
  buttonLabel?: string;
  defaultOpen?: boolean;
}

export const AddMoreDropdown: React.FC<AddMoreDropdownProps> = ({
  onSelectSource,
  className = '',
  buttonLabel = 'Add More Files',
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSelect = (source: 'device' | ImportSourceType) => {
    setIsOpen(false);
    onSelectSource(source);
  };

  return (
    <div className={`inline-block ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold text-indigo-700 bg-indigo-50/95 hover:bg-indigo-100 border border-indigo-200 transition-all cursor-pointer shadow-2xs group active:scale-95"
        title="Add files from Device, Google Drive, Dropbox, OneDrive, or URL"
        aria-expanded={isOpen}
      >
        <FilePlus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600 group-hover:scale-110 transition-transform" />
        <span>{buttonLabel}</span>
        <span className="border-l border-indigo-200 pl-1 text-indigo-500">
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </span>
      </button>

      {/* Centered Modal Overlay (Prevents Any Cutoff or Clipping Anywhere on Screen) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl shadow-2xl bg-gradient-to-b from-[#4758EC] to-[#3646D7] text-white overflow-hidden border border-indigo-300/40 font-sans flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-4 py-3 border-b border-white/20 flex items-center justify-between bg-black/20 shrink-0">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-white/20 text-white">
                  <FilePlus className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="font-extrabold text-sm text-white tracking-wide">
                    Choose Image Source
                  </h3>
                  <p className="text-[10px] text-indigo-100/80">
                    Select where you want to import your photos from
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/20 text-white/80 hover:text-white cursor-pointer transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Body Containing All 5 Options */}
            <div
              className="p-2 space-y-1.5 overflow-y-auto max-h-[65vh] divide-y divide-white/10"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(255,255,255,0.6) rgba(0,0,0,0.15)',
              }}
            >
              {/* Option 1: From Device / Phone */}
              <button
                type="button"
                onClick={() => handleSelect('device')}
                className="w-full px-3.5 py-2.5 text-left flex items-center gap-3.5 rounded-xl hover:bg-white/20 active:bg-white/30 transition-colors cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  <Folder className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-xs sm:text-sm font-bold text-white leading-tight">
                    1. From Device / Phone
                  </span>
                  <span className="block text-[11px] text-indigo-100/80">
                    Select photos from your computer or phone storage
                  </span>
                </div>
              </button>

              {/* Option 2: From Google Drive */}
              <button
                type="button"
                onClick={() => handleSelect('drive')}
                className="w-full px-3.5 py-2.5 text-left flex items-center gap-3.5 rounded-xl hover:bg-white/20 active:bg-white/30 transition-colors cursor-pointer group pt-2.5"
              >
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  <svg className="w-5 h-5" viewBox="0 0 87.3 78" fill="none">
                    <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5z" fill="#0066DA"/>
                    <path d="M43.65 25 29.9 1.2c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44C.4 50 0 51.55 0 53.1h27.5z" fill="#00AC47"/>
                    <path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H59.8l5.85 10.15z" fill="#EA4335"/>
                    <path d="M43.65 25 57.4 1.2C56.05.4 54.5 0 52.95 0H34.35c-1.55 0-3.1.4-4.45 1.2z" fill="#00832D"/>
                    <path d="M59.8 53.1H87.3c0-1.55-.4-3.1-1.2-4.5l-25.4-44c-.8-1.4-1.95-2.5-3.3-3.3L43.65 25z" fill="#FFBA00"/>
                    <path d="M73.55 76.8H27.5l-13.75 23.8c1.35.8 2.9 1.2 4.45 1.2h50.9c1.55 0 3.1-.4 4.45-1.2z" fill="#2684FC"/>
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-xs sm:text-sm font-bold text-white leading-tight">
                    2. From Google Drive
                  </span>
                  <span className="block text-[11px] text-indigo-100/80">
                    Paste Google Drive public link (Zero login)
                  </span>
                </div>
              </button>

              {/* Option 3: From Dropbox */}
              <button
                type="button"
                onClick={() => handleSelect('dropbox')}
                className="w-full px-3.5 py-2.5 text-left flex items-center gap-3.5 rounded-xl hover:bg-white/20 active:bg-white/30 transition-colors cursor-pointer group pt-2.5"
              >
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                    <path d="M6.02 1.83 0 5.75l6.02 3.92 6-4.04-6-3.8zM17.98 1.83l-6 3.8 6 4.04 6.02-3.92-6.02-3.92zM0 13.59l6.02 3.92 6-3.8-6.02-4.04L0 13.59zm17.98-3.92-6.02 4.04 6 3.8 6.02-3.92-6-3.92zM6 19.46l6.02 3.89 6.02-3.89-6.02-3.8-6.02 3.8z"/>
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-xs sm:text-sm font-bold text-white leading-tight">
                    3. From Dropbox
                  </span>
                  <span className="block text-[11px] text-indigo-100/80">
                    Paste Dropbox share link to download
                  </span>
                </div>
              </button>

              {/* Option 4: From OneDrive */}
              <button
                type="button"
                onClick={() => handleSelect('onedrive')}
                className="w-full px-3.5 py-2.5 text-left flex items-center gap-3.5 rounded-xl hover:bg-white/20 active:bg-white/30 transition-colors cursor-pointer group pt-2.5"
              >
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-xs sm:text-sm font-bold text-white leading-tight">
                    4. From OneDrive
                  </span>
                  <span className="block text-[11px] text-indigo-100/80">
                    Paste OneDrive public link
                  </span>
                </div>
              </button>

              {/* Option 5: From Any Web Link / Image URL */}
              <button
                type="button"
                onClick={() => handleSelect('url')}
                className="w-full px-3.5 py-2.5 text-left flex items-center gap-3.5 rounded-xl hover:bg-white/20 active:bg-white/30 transition-colors cursor-pointer group pt-2.5"
              >
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  <LinkIcon className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-xs sm:text-sm font-bold text-white leading-tight">
                    5. From Any Web Link / URL
                  </span>
                  <span className="block text-[11px] text-indigo-100/80">
                    Paste direct image URL or Base64 web link
                  </span>
                </div>
              </button>
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-black/20 border-t border-white/20 flex items-center justify-between text-xs shrink-0">
              <span className="text-[11px] text-indigo-100/80">
                Supports all major image types
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white font-bold cursor-pointer transition-colors text-xs"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
