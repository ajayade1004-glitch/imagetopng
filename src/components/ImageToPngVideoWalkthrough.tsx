import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, CheckCircle2, ShieldCheck, Zap, Sparkles, Volume2, VolumeX } from 'lucide-react';

export const ImageToPngVideoWalkthrough: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const duration = 12000; // 12 seconds interactive video walkthrough

  const steps = [
    {
      title: 'Step 1: Choose & Drop Image',
      description: 'Drag any JPG, WEBP, HEIC, SVG, or RAW file into the Image to PNG converter.',
      tag: 'Upload Phase',
    },
    {
      title: 'Step 2: Local Hardware Decoding',
      description: 'Browser reads the image stream directly in GPU RAM without sending data to servers.',
      tag: 'Private In-Browser Processing',
    },
    {
      title: 'Step 3: Lossless DEFLATE PNG Encoding',
      description: 'The image to PNG engine generates 8-bit alpha channels with true pixel fidelity.',
      tag: 'Lossless Conversion',
    },
    {
      title: 'Step 4: Instant PNG Download',
      description: 'Click Download PNG or bundle all converted files in one fast ZIP archive.',
      tag: 'Instant Export',
    },
  ];

  useEffect(() => {
    if (isPlaying) {
      const stepInterval = duration / steps.length;
      const animate = (time: number) => {
        if (!startTimeRef.current) startTimeRef.current = time;
        const elapsed = (time - startTimeRef.current) % duration;
        const currentProgress = (elapsed / duration) * 100;
        setProgress(currentProgress);

        const currentStepIndex = Math.min(
          steps.length - 1,
          Math.floor(elapsed / stepInterval)
        );
        setActiveStep(currentStepIndex);

        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      startTimeRef.current = null;
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setProgress(0);
    setActiveStep(0);
    startTimeRef.current = null;
  };

  return (
    <div className="w-full bg-slate-900 text-white rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
      {/* Video Header Bar */}
      <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
          <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
          <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
          <span className="ml-2 text-xs font-mono text-slate-400">
            Video Tutorial: How to Convert Image to PNG Online
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>100% Client-Side Video Demo</span>
        </div>
      </div>

      {/* Video Viewport Stage */}
      <div className="relative aspect-video w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
        {/* Semantic HTML5 Video for SEO Crawlers & Fallback */}
        <video
          controls
          poster="/image-to-png.webp"
          className="sr-only"
          aria-label="Image to PNG Video Tutorial"
        >
          <source src="/image-to-png.webp" type="video/mp4" />
          <p>Your browser does not support HTML5 video. Use our interactive Image to PNG converter above.</p>
        </video>

        {/* Animated Background Mesh */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Dynamic Interactive Stage Display */}
        <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center">
          {/* Step Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{steps[activeStep].tag}</span>
          </div>

          {/* Graphic Simulation Card */}
          <div className="w-64 sm:w-80 h-32 sm:h-36 rounded-xl bg-slate-800/90 border border-slate-700 flex flex-col items-center justify-center p-4 shadow-2xl relative mb-4 transition-all">
            {activeStep === 0 && (
              <div className="flex flex-col items-center animate-pulse">
                <div className="w-12 h-12 rounded-xl bg-blue-600/30 border border-blue-400 text-blue-300 flex items-center justify-center mb-2">
                  <Zap className="w-6 h-6 text-blue-400" />
                </div>
                <p className="text-xs font-bold text-white">Drag &amp; Drop Image Here</p>
                <p className="text-[11px] text-slate-400">JPG, WEBP, SVG, HEIC, TIFF</p>
              </div>
            )}

            {activeStep === 1 && (
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin mb-2" />
                <p className="text-xs font-bold text-emerald-400">Processing in Browser RAM...</p>
                <p className="text-[11px] text-slate-300">GPU Canvas Pixel Buffer</p>
              </div>
            )}

            {activeStep === 2 && (
              <div className="flex flex-col items-center">
                <div className="px-3 py-1 rounded-lg bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-black font-mono mb-2">
                  DEFLATE 8-BIT ALPHA
                </div>
                <p className="text-xs font-bold text-white">Lossless PNG Container Ready</p>
                <p className="text-[11px] text-emerald-400">0% Quality Loss • Zero Artifacts</p>
              </div>
            )}

            {activeStep === 3 && (
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-2 shadow-lg shadow-emerald-600/40">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-emerald-300">Converted Image to PNG!</p>
                <p className="text-[11px] text-slate-300">Downloaded to device</p>
              </div>
            )}
          </div>

          <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
            {steps[activeStep].title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md leading-relaxed">
            {steps[activeStep].description}
          </p>
        </div>

        {/* Video Overlay Play Trigger when paused */}
        {!isPlaying && (
          <button
            onClick={togglePlay}
            aria-label="Play Image to PNG video walkthrough"
            className="absolute inset-0 w-full h-full bg-slate-950/60 backdrop-blur-xs flex items-center justify-center group cursor-pointer transition-all z-20"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-blue-600 group-hover:bg-blue-500 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1 text-white" />
            </div>
            <span className="absolute bottom-6 px-4 py-1.5 rounded-full bg-slate-900/90 text-xs font-semibold text-white border border-slate-700">
              Click to Watch 12s Walkthrough: Convert Image to PNG
            </span>
          </button>
        )}
      </div>

      {/* Video Progress Bar */}
      <div className="w-full bg-slate-800 h-1.5 cursor-pointer relative">
        <div
          className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full transition-all duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Video Control Bar */}
      <div className="px-4 py-3 bg-slate-950 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Play Walkthrough</span>
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer transition-colors"
            title="Replay from start"
            aria-label="Replay video"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-slate-400 text-[11px]">
          <span>Format: Full HD Interactive Canvas</span>
          <span>•</span>
          <span>Audio: Silent / Descriptive</span>
        </div>

        <button
          onClick={() => setIsMuted((prev) => !prev)}
          className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer transition-colors"
          aria-label={isMuted ? 'Audio muted' : 'Audio unmuted'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
