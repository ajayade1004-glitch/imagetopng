import React, { useState } from 'react';
import {
  ShieldCheck,
  ChevronDown,
  Layers,
  ArrowRight,
  Sparkles,
  Zap,
  Lock,
  Download,
  Palette,
  Sliders,
  ExternalLink,
  HelpCircle,
  FileImage,
  CheckCircle2,
  Cpu,
  Monitor,
  Smartphone,
  Flame,
  FileText,
  FileCode,
  Check,
  Info,
  BookOpen,
  Award,
  Maximize2,
  HardDrive,
  Globe,
  Settings,
} from 'lucide-react';
import { MainConverter } from '../components/MainConverter';
import { ImageToPngVideoWalkthrough } from '../components/ImageToPngVideoWalkthrough';
import { FreePngSamples } from '../components/FreePngSamples';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { ProFeatureShowcase } from '../components/ProFeatureShowcase';
import { SUPPORTED_FORMATS } from '../data/formats';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const faqs = [
    {
      q: 'What is an Image to PNG converter and why is it essential for modern designers?',
      a: 'An **Image to PNG** converter is an online tool designed to **convert image to png format** directly within your web browser. When you run an **image to png converter**, it transforms lossy or proprietary raster files (such as JPG, JPEG, WEBP, HEIC, or AVIF) into universally compatible Portable Network Graphics (PNG). Unlike lossy containers that discard image data during every save, a lossless **image to png converter free** tool preserves 100% of pixel clarity, crisp typographic edges, and vibrant color gamuts. This makes our **image converter to png** essential for creating website assets, mobile app graphics, logos, vector rasterizations, and transparent product mockups without visual degradation.',
    },
    {
      q: 'How to convert image to png step-by-step for free without software installation?',
      a: 'To learn **how to convert image to png**, simply follow these four easy steps: First, drag and drop your photo into the conversion drop zone above or click "Choose Image" to select a file from your device. Second, our built-in client-side **image to png converter** immediately decodes the raw bitmap in local browser memory. Third, customize optional settings such as background color removal or target file size compression. Fourth, click "Download PNG" or "Download All as ZIP" to export your newly created files. You can **convert to png image** files in less than a second with zero software setup required.',
    },
    {
      q: 'How do I convert image to transparent PNG format with crisp edges?',
      a: 'To **convert image to transparent png**, upload your graphic into our **image to png converter**. If your input file (such as SVG, WebP, TIFF, or PSD) already contains transparent alpha layers, our converter automatically preserves all 256 gradations of the 8-bit alpha channel. For solid background images (like white studio portraits or product photos), you can enable our background transparency removal feature to turn background pixels transparent, producing a pristine **image to transparent png** or **image to png transparent** output ready for dark or light website themes.',
    },
    {
      q: 'Can I convert JPG to PNG image files without losing clarity?',
      a: 'Yes. When you **convert jpg to png image** files, our engine reconstructs the discrete cosine transform (DCT) macroblocks from the JPG and writes every individual RGB pixel into uncompressed memory before encoding it with lossless DEFLATE compression. While converting cannot reconstruct detail already lost during original JPG compression, it completely stops any future degradation. Using our **jpg to png image converter** or **png to jpg image converter** ensures that subsequent edits, resizing, and watermarking will never introduce new compression artifacts.',
    },
    {
      q: 'Is this image to png converter free for unlimited batch conversions?',
      a: 'Yes! Our **image to png converter free** web application is 100% free forever. We do not require credit card details, account registration, email verification, or hidden subscriptions. You can **image convert to png free** on single graphics or drag in dozens of files simultaneously. Our multi-threaded client-side conversion engine converts all images in parallel right on your computer or phone hardware, providing lightning-fast batch processing.',
    },
    {
      q: 'What is the technical difference between PNG-8, PNG-24, and PNG-32?',
      a: 'PNG supports three major bit-depth profiles: PNG-8 uses an indexed color palette of up to 256 colors with 1-bit binary transparency (similar to GIF). PNG-24 uses 24-bit Truecolor (8 bits per channel for Red, Green, and Blue) supporting over 16.7 million distinct colors with solid backgrounds. PNG-32 adds an 8-bit Alpha transparency channel to PNG-24, enabling 256 levels of smooth opacity for soft drop shadows and anti-aliased curves. Our **image to png converter** automatically chooses the optimal bit-depth to maximize visual fidelity while minimizing file weight.',
    },
    {
      q: 'Can I perform web image to png conversion directly from online URLs?',
      a: 'Yes. Our platform includes an advanced Cloud & URL import modal that facilitates direct **web image to png** conversion. You can paste any image URL, Google Drive shared link, Dropbox asset link, or OneDrive public file. Our multi-tier proxy pipeline fetches the binary image stream into memory without requiring you to download the file to your hard drive first, allowing you to **change image to png** in a single browser tab.',
    },
    {
      q: 'How to make PNG image files in high-definition (PNG to HD image)?',
      a: 'To discover **how to make png image** graphics in high definition, upload your high-resolution source file into our **png to hd image converter**. Our canvas pipeline retains 100% of the native source DPI (dots per inch) and pixel dimensions. You can also utilize our built-in canvas resizer to scale up your image dimensions using bicubic interpolation, creating a crisp **png to hd image** output tailored for retina screens, 4K wallpapers, and large-format print media.',
    },
    {
      q: 'How do I convert PNG image to PDF or reverse convert image png to jpg?',
      a: 'While our main utility focuses on **image to png converter** workflows, our comprehensive conversion suite also includes dedicated utilities for **image png to jpg**, **png to image**, **png to image converter**, and **png image to pdf converter** needs. You can switch between formats seamlessly using the format navigation bar located at the top and bottom of our site.',
    },
    {
      q: 'Are my confidential documents and private photos secure on this website?',
      a: 'Your security and privacy are 100% guaranteed. Unlike old-fashioned server-based converters that transmit your private images across the internet to third-party cloud servers, our **image to png converter** executes all decoding, rasterization, and compression locally inside your browser sandbox via WebAssembly and HTML5 Canvas. Your photos never leave your device, ensuring total compliance with privacy regulations like GDPR, CCPA, and HIPAA.',
    },
    {
      q: 'Can I convert HEIC photos from iPhone to PNG on Windows or Android?',
      a: 'Yes! Apple iOS devices often save photos in High Efficiency Image Container (HEIC) format, which Windows PCs and Android devices cannot preview natively. Our **image to png converter** includes a high-performance in-browser HEIC decoder that effortlessly unpacks HEIC/HEIF containers and converts them into standard, universal PNG files with zero quality loss.',
    },
    {
      q: 'Why should I convert SVG vector files to PNG raster format?',
      a: 'While SVG is ideal for scalable vector art, many social media platforms (such as Twitter, Facebook, Instagram, and LinkedIn), email clients (like Outlook and Gmail), and presentation apps do not support SVG embedding. When you **convert image to png format** from SVG, you rasterize your vector curves into high-resolution, anti-aliased 32-bit PNGs with full alpha transparency that render identically across every web browser and operating system.',
    },
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      {/* 
        ========================================================================
        QUARTER 1 (0% - 25%): HERO SECTION, TARGET KEYWORDS & CONVERTER TOOL
        ========================================================================
      */}
      <section className="relative pt-3 sm:pt-6 pb-2 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200 mb-3 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>100% In-Browser Private Conversion • Zero Server Uploads</span>
          </div>

          {/* H1 Heading with Primary Target Keyword */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Image to PNG Converter – Convert Images to PNG Online Free
          </h1>

          {/* First 50 Words - Primary Keyword 'Image to PNG' in bold and early in paragraph */}
          <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Use our fast, free <strong className="font-bold text-slate-900">Image to PNG</strong> converter to convert image to png files in seconds. Our high-performance <strong className="font-semibold text-slate-800">image to png converter free</strong> utility transforms JPG, WEBP, HEIC, GIF, and SVG into crisp PNG images with lossless DEFLATE compression and full transparent background support.
          </p>

          {/* Quick Value Metrics */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-medium text-slate-600">
            <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
              <Zap className="w-3.5 h-3.5 text-amber-500" /> Instant Processing
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
              <Palette className="w-3.5 h-3.5 text-emerald-500" /> 8-Bit Alpha Transparency
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
              <Lock className="w-3.5 h-3.5 text-blue-500" /> 100% Client-Side Privacy
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
              <Download className="w-3.5 h-3.5 text-indigo-500" /> Batch ZIP Download
            </span>
          </div>
        </div>

        {/* Main Interactive Converter Box - Placed Above the Fold */}
        <div className="mt-5 max-w-4xl mx-auto px-4 sm:px-6">
          <MainConverter />
        </div>

        {/* Fast Format Navigation Links (16+ Semantic Links for SEO Architecture) */}
        <div className="mt-6 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
            Popular Image Converter to PNG Tools
          </p>
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
            {[
              { label: 'JPG to PNG', path: '/jpg-to-png' },
              { label: 'JPEG to PNG', path: '/jpeg-to-png' },
              { label: 'WEBP to PNG', path: '/webp-to-png' },
              { label: 'HEIC to PNG', path: '/heic-to-png' },
              { label: 'SVG to PNG', path: '/svg-to-png' },
              { label: 'TIFF to PNG', path: '/tiff-to-png' },
              { label: 'GIF to PNG', path: '/gif-to-png' },
              { label: 'BMP to PNG', path: '/bmp-to-png' },
              { label: 'PSD to PNG', path: '/psd-to-png' },
              { label: 'RAW to PNG', path: '/raw-to-png' },
              { label: 'AVIF to PNG', path: '/avif-to-png' },
              { label: 'ICO to PNG', path: '/ico-to-png' },
            ].map((fmt) => (
              <a
                key={fmt.path}
                href={fmt.path}
                onClick={(e) => handleLinkClick(e, fmt.path)}
                className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50/50 transition-colors cursor-pointer shadow-2xs"
              >
                {fmt.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Top Banner Advertisement Slot */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdPlaceholder slotId="top-banner" />
      </section>

      {/* 
        ========================================================================
        QUARTER 2 (25% - 50%): STEP-BY-STEP HOW-TO GUIDE & VIDEO DEMONSTRATION
        ========================================================================
      */}
      <section id="how-it-works" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Interactive Guide
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2.5">
              How to Convert Image to PNG Online in 4 Simple Steps
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Follow this step-by-step tutorial to learn <strong className="font-semibold text-slate-800">how to convert image to png</strong> using our free browser-based <strong className="font-semibold text-slate-800">image converter to png</strong>.
            </p>
          </div>

          {/* 4 Clear Step Cards with Bullet Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 hover:border-blue-300 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center mb-3.5 shadow-xs">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5">
                Upload or Import Photo
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Click "Choose Image", drag files into the box, or paste cloud links from Google Drive, Dropbox, and web URLs to <strong className="font-semibold text-slate-800">convert image to png</strong> instantly.
              </p>
              <ul className="mt-3 text-[11px] text-slate-500 space-y-1 list-disc pl-4">
                <li>Supports JPG, WEBP, HEIC, SVG, TIFF, PSD</li>
                <li>Batch import multiple files simultaneously</li>
                <li>Instant loading with zero server upload wait</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 hover:border-blue-300 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center mb-3.5 shadow-xs">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5">
                In-Browser Pixel Decoding
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our client-side <strong className="font-semibold text-slate-800">image to png converter</strong> decodes raw image pixels in memory using WebAssembly and hardware-accelerated Canvas.
              </p>
              <ul className="mt-3 text-[11px] text-slate-500 space-y-1 list-disc pl-4">
                <li>100% private in-browser memory execution</li>
                <li>No server-side copies or telemetry stored</li>
                <li>Instant processing on mobile and desktop</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 hover:border-blue-300 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center mb-3.5 shadow-xs">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5">
                Lossless DEFLATE Encoding
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Transform your raw pixels into an optimized <strong className="font-semibold text-slate-800">Image to PNG</strong> container with full alpha transparency channel preservation.
              </p>
              <ul className="mt-3 text-[11px] text-slate-500 space-y-1 list-disc pl-4">
                <li>Preserves 8-bit alpha transparency channels</li>
                <li>Optional target size compression (50KB, 200KB)</li>
                <li>Integrated crop, rotate, and watermark tools</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 hover:border-emerald-300 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center mb-3.5 shadow-xs">
                4
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5">
                Instant PNG Download
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Download your fresh, crisp PNG files individually or bundle all converted pictures into an organized, compressed ZIP archive.
              </p>
              <ul className="mt-3 text-[11px] text-slate-500 space-y-1 list-disc pl-4">
                <li>Single-click high-speed PNG file export</li>
                <li>Batch ZIP archive packaging in one click</li>
                <li>Ready for commercial web, app, and print use</li>
              </ul>
            </div>
          </div>

          {/* Interactive Video Walkthrough */}
          <div className="pt-8 border-t border-slate-200" id="video-tutorial">
            <div className="text-center max-w-2xl mx-auto mb-5">
              <h3 className="text-lg sm:text-2xl font-bold text-slate-900">
                Video Walkthrough: How to Convert Image to PNG
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Watch this interactive 12-second demonstration to see how our <strong className="font-semibold text-slate-800">image converter to png</strong> transforms pictures into lossless files.
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <ImageToPngVideoWalkthrough />
            </div>
          </div>

          {/* WebP Workflow Architecture Diagram */}
          <div className="pt-8 border-t border-slate-200">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-base sm:text-xl font-bold text-slate-900 mb-2">
                Image to PNG Converter Workflow &amp; Architecture
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-4">
                See how our <strong className="font-semibold text-slate-800">image to png converter</strong> transforms raw pictures into high-definition PNG files directly in your browser.
              </p>
              <img
                src="/image-to-png.webp"
                alt="Image to PNG converter workflow showing browser decoding, alpha transparency extraction, and DEFLATE compression"
                width={800}
                height={450}
                loading="lazy"
                className="rounded-2xl shadow-md border border-slate-200 w-full object-cover"
              />
            </div>
          </div>

          {/* Deep Architectural Breakdown */}
          <div className="pt-8 border-t border-slate-200 prose prose-slate max-w-none text-xs sm:text-sm text-slate-600 space-y-4 leading-relaxed">
            <h3 className="text-base sm:text-xl font-bold text-slate-900">
              Why In-Browser Conversion Outperforms Traditional Server Converters
            </h3>
            <p>
              Traditional online file conversion websites require you to upload your confidential files to a remote server. This approach introduces significant security liabilities, server queuing delays, network bandwidth bottlenecks, and file size restrictions. In contrast, our modern <strong className="font-bold text-slate-900">image to png converter free</strong> web app runs entirely inside your client browser using HTML5 Canvas API and WebAssembly binaries.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose my-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  Absolute Data Privacy
                </div>
                <p className="text-xs text-slate-600">
                  Your photos, corporate invoices, medical documents, and IDs never leave your computer or smartphone.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
                  <Zap className="w-4 h-4 text-amber-600" />
                  Zero Bandwidth Lag
                </div>
                <p className="text-xs text-slate-600">
                  Because files are processed directly in local RAM, large multi-gigabyte photo batches convert instantly without uploading.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                  Cross-Platform Compatibility
                </div>
                <p className="text-xs text-slate-600">
                  Works seamlessly on iOS Safari, Android Chrome, Windows Edge, macOS Safari, and Linux Firefox with no plugins required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        QUARTER 3 (50% - 75%): TRANSPARENCY, DEFLATE VS LOSSY & FORMAT MATRIX
        ========================================================================
      */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-10">
          {/* Transparency Section */}
          <div>
            <div className="max-w-3xl mx-auto text-center mb-6">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                True Alpha Transparency
              </span>
              <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2.5">
                Convert Image to Transparent PNG with Zero Feathering Artifacts
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                When you <strong className="font-bold text-slate-800">convert image to transparent png</strong>, your logos, icons, vector graphics, and digital signatures blend smoothly onto any dark, light, or multicolored website background.
              </p>
            </div>

            {/* Transparency Diagram in WebP Format */}
            <div className="mb-8 max-w-3xl mx-auto">
              <img
                src="/image-to-png-alpha-transparency-guide.webp"
                alt="Image to PNG alpha transparency guide illustrating 8-bit alpha channel vs 1-bit GIF transparency"
                width={800}
                height={400}
                loading="lazy"
                className="rounded-2xl shadow-md border border-slate-200 w-full object-cover"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  256 Levels of Opacity
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Unlike outdated GIF formats that only offer binary on/off transparency, our <strong className="font-semibold text-slate-800">image to transparent png</strong> engine supports full 8-bit alpha depth for soft shadows and smooth anti-aliased outlines.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Logo &amp; Brand Integration
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Easily <strong className="font-semibold text-slate-800">convert image to png transparent</strong> format so your company badges, watermarks, and product cutouts look sharp across web stores and marketing decks.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Built-In Palette Extraction
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Extract dominant brand hex color codes directly from your converted PNG images in one click to maintain visual consistency across your design system.
                </p>
              </div>
            </div>
          </div>

          {/* Lossless DEFLATE vs Lossy Compression Guide */}
          <div className="pt-8 border-t border-slate-200">
            <div className="max-w-3xl mx-auto text-center mb-6">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                Technical Deep Dive
              </span>
              <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-2.5">
                Understanding Lossless DEFLATE vs Lossy Compression
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                Why professionals choose to <strong className="font-semibold text-slate-800">convert image to png format</strong> instead of keeping lossy JPG or WebP containers.
              </p>
            </div>

            {/* Compression Diagram in WebP Format */}
            <div className="mb-6 max-w-3xl mx-auto">
              <img
                src="/image-to-png-lossless-compression-diagram.webp"
                alt="Image to PNG lossless DEFLATE compression diagram comparing 2-stage filtering with lossy discrete cosine transform"
                width={800}
                height={400}
                loading="lazy"
                className="rounded-2xl shadow-md border border-slate-200 w-full object-cover"
              />
            </div>

            <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-600 space-y-3 leading-relaxed">
              <p>
                When you <strong className="font-bold text-slate-900">convert jpg to png image</strong> files, you are moving your pixels from a lossy compression paradigm (which permanently discards high-frequency chromatic data) into a lossless container powered by the <strong>DEFLATE algorithm</strong> (combining LZ77 string matching and Huffman coding).
              </p>
              <p>
                PNG employs a clever 2-stage compression pipeline:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600">
                <li>
                  <strong className="text-slate-800">Adaptive Row Filtering:</strong> Prior to compression, PNG applies one of five predictive filter types (None, Sub, Up, Average, or Paeth) to every scanline. This transforms raw pixel values into small difference values that compress far more efficiently.
                </li>
                <li>
                  <strong className="text-slate-800">LZ77 Pattern Matching:</strong> The encoder searches for repeating byte sequences across a sliding 32KB window, replacing duplicates with compact length-distance pointers.
                </li>
                <li>
                  <strong className="text-slate-800">Huffman Entropy Encoding:</strong> Frequent pointer symbols are mapped to shorter variable-length bit codes, achieving significant file size reduction without sacrificing a single pixel of graphical fidelity.
                </li>
              </ul>
            </div>
          </div>

          {/* Master Format Compatibility Matrix (12 Format Guide) */}
          <div className="pt-8 border-t border-slate-200">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 text-center">
              Comprehensive Format Conversion Matrix
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 text-center max-w-2xl mx-auto mb-6">
              Compare how our <strong className="font-semibold text-slate-800">image converter to png</strong> handles diverse image codecs and file structures.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded-2xl overflow-hidden">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Source Format</th>
                    <th className="p-3.5">Output Format</th>
                    <th className="p-3.5">Transparency</th>
                    <th className="p-3.5">Compression</th>
                    <th className="p-3.5">Primary Best Use Case</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-600">
                  <tr className="hover:bg-slate-50/80">
                    <td className="p-3.5 font-bold text-slate-900">JPG / JPEG</td>
                    <td className="p-3.5 font-semibold text-blue-600">PNG (24-bit)</td>
                    <td className="p-3.5 text-slate-500">Solid Backdrop</td>
                    <td className="p-3.5">Lossless DEFLATE</td>
                    <td className="p-3.5">Graphic design, screenshots, and web publishing</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80">
                    <td className="p-3.5 font-bold text-slate-900">WEBP</td>
                    <td className="p-3.5 font-semibold text-blue-600">PNG (32-bit)</td>
                    <td className="p-3.5 text-emerald-600 font-bold">Preserved Alpha</td>
                    <td className="p-3.5">Lossless DEFLATE</td>
                    <td className="p-3.5">Legacy software editing and desktop compatibility</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80">
                    <td className="p-3.5 font-bold text-slate-900">HEIC / HEIF</td>
                    <td className="p-3.5 font-semibold text-blue-600">PNG (24-bit)</td>
                    <td className="p-3.5 text-slate-500">Solid Backdrop</td>
                    <td className="p-3.5">Lossless DEFLATE</td>
                    <td className="p-3.5">Apple iPhone photo sharing on Windows &amp; Linux</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80">
                    <td className="p-3.5 font-bold text-slate-900">SVG (Vector)</td>
                    <td className="p-3.5 font-semibold text-blue-600">PNG (32-bit)</td>
                    <td className="p-3.5 text-emerald-600 font-bold">Full Alpha</td>
                    <td className="p-3.5">Lossless Raster</td>
                    <td className="p-3.5">Rasterizing vector icons for raster-only applications</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80">
                    <td className="p-3.5 font-bold text-slate-900">GIF</td>
                    <td className="p-3.5 font-semibold text-blue-600">PNG (32-bit)</td>
                    <td className="p-3.5 text-emerald-600 font-bold">Smooth Alpha</td>
                    <td className="p-3.5">Lossless DEFLATE</td>
                    <td className="p-3.5">Upgrading 256-color paletted art to Truecolor</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80">
                    <td className="p-3.5 font-bold text-slate-900">PSD / RAW</td>
                    <td className="p-3.5 font-semibold text-blue-600">PNG (32-bit)</td>
                    <td className="p-3.5 text-emerald-600 font-bold">Layered Alpha</td>
                    <td className="p-3.5">Lossless DEFLATE</td>
                    <td className="p-3.5">Exporting Photoshop drafts for instant client preview</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80">
                    <td className="p-3.5 font-bold text-slate-900">AVIF</td>
                    <td className="p-3.5 font-semibold text-blue-600">PNG (32-bit)</td>
                    <td className="p-3.5 text-emerald-600 font-bold">Full Alpha</td>
                    <td className="p-3.5">Lossless DEFLATE</td>
                    <td className="p-3.5">Converting next-gen AVIF photos for universal editing tools</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80">
                    <td className="p-3.5 font-bold text-slate-900">BMP / TIFF</td>
                    <td className="p-3.5 font-semibold text-blue-600">PNG (24/32-bit)</td>
                    <td className="p-3.5 text-emerald-600 font-bold">Supported</td>
                    <td className="p-3.5">High Compression</td>
                    <td className="p-3.5">Compressing uncompressed raw bitmaps by up to 80%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Middle Advertisement Slot */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdPlaceholder slotId="mid-content" />
      </section>

      {/* 
        ========================================================================
        QUARTER 4 (75% - 100%): PRO TOOLS, FAQS, SAMPLES, DEVELOPER GUIDE & FOOTER
        ========================================================================
      */}
      {/* Free PNG Sample Assets Gallery */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <FreePngSamples />
      </section>

      {/* Pro Features & Quality Control Showcase */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProFeatureShowcase />
      </section>

      {/* Technical FAQ Section (Accordion) */}
      <section id="faq" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Knowledge Base
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2.5">
              Frequently Asked Questions About Image to PNG Conversion
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Have questions about <strong className="font-semibold text-slate-800">how to convert image to png</strong> or preserving alpha transparency? Find clear answers below.
            </p>
          </div>

          <div className="space-y-3.5 max-w-3xl mx-auto">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-slate-50/50 hover:bg-slate-50"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-800 hover:text-blue-600 transition-colors cursor-pointer"
                  aria-expanded={openFaq === idx}
                >
                  <span className="leading-snug">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                      openFaq === idx ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer API & Client-Side Code Snippets */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                Developer Documentation
              </span>
              <h3 className="text-lg sm:text-2xl font-bold mt-1 text-white">
                How to Programmatically Convert Image to PNG in JavaScript
              </h3>
            </div>
            <span className="self-start md:self-auto px-3 py-1 rounded-full text-xs font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30">
              HTML5 Canvas API
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
            Need to integrate an <strong className="text-white">image to png converter</strong> pipeline into your web application? Here is the canonical, battle-tested JavaScript snippet to decode any input file and export a lossless PNG Blob in the browser:
          </p>

          <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 font-mono text-xs overflow-x-auto text-blue-200 leading-relaxed">
            <pre>{`// In-browser client-side Image to PNG converter pipeline
async function convertImageToPng(imageFile) {
  // 1. Create high-performance Bitmap representation
  const bitmap = await createImageBitmap(imageFile);
  
  // 2. Instantiate offscreen Canvas with matching pixel dimensions
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  
  // 3. Render bitmap onto Canvas context with alpha support
  const ctx = canvas.getContext('2d', { alpha: true });
  ctx.drawImage(bitmap, 0, 0);
  
  // 4. Export as lossless 32-bit PNG Blob
  return new Promise((resolve, reject) => {
    canvas.toBlob((pngBlob) => {
      if (pngBlob) {
        resolve(pngBlob);
      } else {
        reject(new Error('Failed to encode PNG'));
      }
    }, 'image/png', 1.0); // 1.0 indicates maximum lossless quality
  });
}`}</pre>
          </div>
        </div>
      </section>

      {/* Bottom Conversion Call to Action */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl">
          <h2 className="text-xl sm:text-3xl font-bold">
            Ready to Convert Your Images to PNG?
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 mt-2.5 max-w-xl mx-auto leading-relaxed">
            Experience ultra-fast, 100% private, in-browser <strong className="text-white font-bold">Image to PNG</strong> conversion with zero file size limits, batch downloads, and crisp alpha transparency.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-5 px-8 py-3 rounded-2xl bg-white text-blue-600 font-extrabold text-xs sm:text-sm hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all cursor-pointer active:scale-95 inline-flex items-center gap-2"
          >
            <span>Start Free Image to PNG Conversion</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
