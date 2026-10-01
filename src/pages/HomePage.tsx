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
      q: 'What is an Image to PNG converter and why use it?',
      a: 'An **Image to PNG** converter is a free online tool. It helps you **convert image to png format** in your browser. Our **image to png converter** turns JPG, WEBP, and HEIC files into crisp PNG files. PNG gives you clear photos. It keeps all picture details intact. Also, our **image to png converter free** tool runs on your own device. Your files stay safe. No files go to a cloud server.',
    },
    {
      q: 'How to convert image to png step-by-step for free?',
      a: 'Learning **how to convert image to png** is simple. First, drag your photo into the box above. Next, our **image converter to png** tool reads your file in memory. Then, pick your options, like transparent background colors. Finally, click Download PNG to save your new file. You can **convert to png image** files in less than one second.',
    },
    {
      q: 'How do I convert image to transparent PNG format?',
      a: 'To **convert image to transparent png**, upload your file to our **image to png converter**. If your image has transparent parts, our tool keeps them intact. For solid backdrops, use our color picker tool. This turns any background color transparent. You get a clean **image to transparent png** or **image to png transparent** file.',
    },
    {
      q: 'Can I convert JPG to PNG image files without quality loss?',
      a: 'Yes! When you **convert jpg to png image** files, our tool reads every pixel from the JPG file. Then, it saves the pixels in a clean PNG file. While it cannot fix old blur, it stops all new quality loss. Thus, using our **jpg to png image converter** or **png to jpg image converter** keeps your photos sharp for the web.',
    },
    {
      q: 'Is this image to png converter free for all users?',
      a: 'Yes! Our **image to png converter free** tool is 100% free forever. You do not need an account. You do not need to log in. Also, you can **image convert to png free** on single photos or many photos at once. Our batch tool converts all your photos at the same time on your own computer.',
    },
    {
      q: 'What is the main difference between PNG and JPG files?',
      a: 'JPG files drop small color details to save disk space. In contrast, PNG files keep every single pixel intact. When you **convert image to png format**, your logos, text, and icons stay crisp. In addition, PNG supports clear transparent backgrounds. For this reason, a **png to image converter** or **image to transparent png** tool is best for web graphics.',
    },
    {
      q: 'Can I do web image to png conversion directly from links?',
      a: 'Yes! Our app includes a fast link tool for **web image to png** conversion. You can paste any image link from Google Drive, Dropbox, OneDrive, or web pages. Our system loads the photo directly in your browser. Therefore, you can **change image to png** without downloading the file to your disk first.',
    },
    {
      q: 'How to make PNG image files in high definition (PNG to HD image)?',
      a: 'To learn **how to make png image** files in high definition, upload your original file to our **png to hd image converter**. Our tool keeps the full resolution and pixel count of your photo. You can also use our resize feature to enlarge your image. This gives you a clear **png to hd image** file for sharp printing and HD screens.',
    },
    {
      q: 'How can I convert PNG image to PDF or convert image png to jpg?',
      a: 'Our website offers tools for all your photo needs. In addition to our **image to png converter**, we provide tools for **image png to jpg**, **png to image**, **png to image converter**, and **png image to pdf converter** tasks. You can easily switch between tools using the top navigation bar.',
    },
    {
      q: 'Are my private photos and files safe on this website?',
      a: 'Yes, your files are completely safe! Other websites upload your photos to remote servers. In contrast, our **image to png converter** works 100% inside your web browser. Your photos never leave your device. Because of this local design, your personal photos, receipts, and documents remain 100% private.',
    },
    {
      q: 'Can I convert HEIC photos from iPhone to PNG on Windows?',
      a: 'Yes! Apple iPhones often save photos in HEIC format. Windows PCs cannot open HEIC files easily. Our **image to png converter** decodes HEIC photos right in your browser. Then, it converts them into standard PNG files that open on any computer.',
    },
    {
      q: 'Why should I convert SVG vector files to PNG raster files?',
      a: 'SVG is great for vectors, but many social media sites and email apps do not support SVG. When you **convert image to png format** from SVG, you turn vector curves into high-resolution PNG pictures. These PNG files display perfectly on all social apps, websites, and phones.',
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
            <span>100% Private In-Browser Tool • No Server Uploads</span>
          </div>

          {/* H1 Heading */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Image to PNG Converter – Convert Images to PNG Online Free
          </h1>

          {/* First 50 Words with Primary Keyword in Bold */}
          <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Use our fast, free <strong className="font-bold text-slate-900">Image to PNG</strong> converter to convert image to png files in seconds. Our free <strong className="font-semibold text-slate-800">image to png converter free</strong> tool turns JPG, WEBP, HEIC, GIF, and SVG into clear PNG pictures with lossless quality and transparent background support.
          </p>

          {/* Quick Value Metrics */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-medium text-slate-600">
            <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
              <Zap className="w-3.5 h-3.5 text-amber-500" /> Fast Conversion
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
              <Palette className="w-3.5 h-3.5 text-emerald-500" /> Transparent PNG
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
              <Lock className="w-3.5 h-3.5 text-blue-500" /> 100% Private
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
              <Download className="w-3.5 h-3.5 text-indigo-500" /> Batch ZIP Download
            </span>
          </div>
        </div>

        {/* Main Interactive Converter Box */}
        <div className="mt-5 max-w-4xl mx-auto px-4 sm:px-6">
          <MainConverter />
        </div>

        {/* Format Navigation Links (16+ Structured Semantic Anchor Links) */}
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
              { label: 'Guides Hub', path: '/guides' },
              { label: 'About Tool', path: '/about' },
              { label: 'Privacy Policy', path: '/privacy' },
              { label: 'Contact Us', path: '/contact' },
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
              Easy Tutorial
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2.5">
              How to Convert Image to PNG Online in 4 Simple Steps
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Follow these simple steps to learn <strong className="font-semibold text-slate-800">how to convert image to png</strong> with our free <strong className="font-semibold text-slate-800">image converter to png</strong>.
            </p>
          </div>

          {/* 4 Clear Step Cards with Bullet Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 hover:border-blue-300 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center mb-3.5 shadow-xs">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5">
                Choose Your Image
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Click Choose Image or drop your photos into the box. You can also paste links from Google Drive, Dropbox, and web URLs to <strong className="font-semibold text-slate-800">convert image to png</strong> right away.
              </p>
              <ul className="mt-3 text-[11px] text-slate-500 space-y-1 list-disc pl-4">
                <li>Supports JPG, WEBP, HEIC, SVG, TIFF, PSD</li>
                <li>Batch select multiple photos at once</li>
                <li>Instant loading with zero waiting time</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 hover:border-blue-300 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center mb-3.5 shadow-xs">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5">
                In-Browser Processing
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our client-side <strong className="font-semibold text-slate-800">image to png converter</strong> reads your photo pixels locally in memory.
              </p>
              <ul className="mt-3 text-[11px] text-slate-500 space-y-1 list-disc pl-4">
                <li>100% private in-browser memory execution</li>
                <li>No server uploads or saved copies</li>
                <li>Fast conversion on phones and computers</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 hover:border-blue-300 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center mb-3.5 shadow-xs">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5">
                Lossless PNG Encoding
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our engine turns your pixels into a clean <strong className="font-semibold text-slate-800">Image to PNG</strong> file with transparent background support.
              </p>
              <ul className="mt-3 text-[11px] text-slate-500 space-y-1 list-disc pl-4">
                <li>Preserves 8-bit alpha transparency</li>
                <li>Optional file size compression settings</li>
                <li>Crop, rotate, and add watermarks easily</li>
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
                Save your fresh PNG files one by one, or download all converted pictures in a single ZIP archive.
              </p>
              <ul className="mt-3 text-[11px] text-slate-500 space-y-1 list-disc pl-4">
                <li>One-click high-speed PNG file export</li>
                <li>Batch ZIP archive download option</li>
                <li>Ready for websites, apps, and print use</li>
              </ul>
            </div>
          </div>

          {/* Video Walkthrough Section */}
          <div className="pt-8 border-t border-slate-200" id="video-tutorial">
            <div className="text-center max-w-2xl mx-auto mb-5">
              <h3 className="text-lg sm:text-2xl font-bold text-slate-900">
                Video Tutorial: How to Convert Image to PNG
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Watch this short video guide to see how our <strong className="font-semibold text-slate-800">image converter to png</strong> transforms photos into clear PNG files.
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <ImageToPngVideoWalkthrough />
            </div>
          </div>

          {/* Workflow Diagram in WebP Format with Alt Tag Keyword */}
          <div className="pt-8 border-t border-slate-200">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-base sm:text-xl font-bold text-slate-900 mb-2">
                Image to PNG Converter Workflow &amp; Steps
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-4">
                See how our <strong className="font-semibold text-slate-800">image to png converter</strong> processes your pictures locally on your device.
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

          {/* Simple Explanation of Client-Side Technology */}
          <div className="pt-8 border-t border-slate-200 text-xs sm:text-sm text-slate-600 space-y-4 leading-relaxed">
            <h3 className="text-base sm:text-xl font-bold text-slate-900">
              Why Browser Conversion Is Fast and Safe
            </h3>
            <p>
              Old file conversion tools make you upload photos to their cloud servers. This can be slow, and it puts your privacy at risk. In contrast, our modern <strong className="font-bold text-slate-900">image to png converter free</strong> app runs right inside your web browser.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose my-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  Full Data Privacy
                </div>
                <p className="text-xs text-slate-600">
                  Your private photos and documents never leave your phone or computer.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
                  <Zap className="w-4 h-4 text-amber-600" />
                  Super Fast Speed
                </div>
                <p className="text-xs text-slate-600">
                  Because files process in local memory, your photos convert in less than a second.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                  Works Everywhere
                </div>
                <p className="text-xs text-slate-600">
                  Runs smoothly on iPhone, Android, Windows, Mac, and Linux with no extra software.
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
                Clear Alpha Channels
              </span>
              <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2.5">
                Convert Image to Transparent PNG with Clean Edges
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                When you <strong className="font-bold text-slate-800">convert image to transparent png</strong>, your logos, icons, and signatures look great on any dark or light website background.
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
                  Smooth Opacity Levels
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our <strong className="font-semibold text-slate-800">image to transparent png</strong> engine supports 256 levels of smooth opacity for clean drop shadows.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Logo &amp; Brand Icons
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Easily <strong className="font-semibold text-slate-800">convert image to png transparent</strong> format so your brand logos look sharp on all web stores and slides.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Color Palette Tool
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Find the main color hex codes from your photos in one click to help you match your brand colors.
                </p>
              </div>
            </div>
          </div>

          {/* Lossless DEFLATE vs Lossy Compression Guide */}
          <div className="pt-8 border-t border-slate-200">
            <div className="max-w-3xl mx-auto text-center mb-6">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                Format Comparison
              </span>
              <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-2.5">
                Understanding Lossless PNG vs Lossy JPG
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                Why designers choose to <strong className="font-semibold text-slate-800">convert image to png format</strong> instead of keeping lossy JPG files.
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

            <div className="text-xs sm:text-sm text-slate-600 space-y-3 leading-relaxed">
              <p>
                When you <strong className="font-bold text-slate-900">convert jpg to png image</strong> files, you move your photos into a lossless format. This format keeps every single pixel intact.
              </p>
              <p>
                PNG uses a simple two-step compression method:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600">
                <li>
                  <strong className="text-slate-800">Line Filtering:</strong> First, the tool predicts pixel differences across rows. This makes the image data much easier to compress.
                </li>
                <li>
                  <strong className="text-slate-800">Pattern Matching:</strong> Next, repeating color patterns are packed tightly into smaller data blocks.
                </li>
                <li>
                  <strong className="text-slate-800">Lossless Saving:</strong> Finally, the file saves in smaller size without losing any picture details.
                </li>
              </ul>
            </div>
          </div>

          {/* Format Compatibility Table */}
          <div className="pt-8 border-t border-slate-200">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 text-center">
              Image Format Conversion Table
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 text-center max-w-2xl mx-auto mb-6">
              Compare how our <strong className="font-semibold text-slate-800">image converter to png</strong> converts various photo formats.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded-2xl overflow-hidden">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Source Format</th>
                    <th className="p-3.5">Output Format</th>
                    <th className="p-3.5">Transparency</th>
                    <th className="p-3.5">Quality</th>
                    <th className="p-3.5">Best Use Case</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-600">
                  <tr className="hover:bg-slate-50/80">
                    <td className="p-3.5 font-bold text-slate-900">JPG / JPEG</td>
                    <td className="p-3.5 font-semibold text-blue-600">PNG (24-bit)</td>
                    <td className="p-3.5 text-slate-500">Solid Backdrop</td>
                    <td className="p-3.5 font-semibold text-emerald-600">Lossless</td>
                    <td className="p-3.5">Graphic design, screenshots, and web publishing</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80">
                    <td className="p-3.5 font-bold text-slate-900">WEBP</td>
                    <td className="p-3.5 font-semibold text-blue-600">PNG (32-bit)</td>
                    <td className="p-3.5 text-emerald-600 font-bold">Preserved Alpha</td>
                    <td className="p-3.5 font-semibold text-emerald-600">Lossless</td>
                    <td className="p-3.5">Editing photos on older software and desktops</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80">
                    <td className="p-3.5 font-bold text-slate-900">HEIC / HEIF</td>
                    <td className="p-3.5 font-semibold text-blue-600">PNG (24-bit)</td>
                    <td className="p-3.5 text-slate-500">Solid Backdrop</td>
                    <td className="p-3.5 font-semibold text-emerald-600">Lossless</td>
                    <td className="p-3.5">Opening iPhone photos easily on Windows and Android</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80">
                    <td className="p-3.5 font-bold text-slate-900">SVG (Vector)</td>
                    <td className="p-3.5 font-semibold text-blue-600">PNG (32-bit)</td>
                    <td className="p-3.5 text-emerald-600 font-bold">Full Alpha</td>
                    <td className="p-3.5 font-semibold text-emerald-600">Lossless</td>
                    <td className="p-3.5">Rasterizing vector logos for social media sites</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80">
                    <td className="p-3.5 font-bold text-slate-900">GIF</td>
                    <td className="p-3.5 font-semibold text-blue-600">PNG (32-bit)</td>
                    <td className="p-3.5 text-emerald-600 font-bold">Smooth Alpha</td>
                    <td className="p-3.5 font-semibold text-emerald-600">Lossless</td>
                    <td className="p-3.5">Upgrading 256-color art to millions of true colors</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80">
                    <td className="p-3.5 font-bold text-slate-900">PSD / RAW</td>
                    <td className="p-3.5 font-semibold text-blue-600">PNG (32-bit)</td>
                    <td className="p-3.5 text-emerald-600 font-bold">Layered Alpha</td>
                    <td className="p-3.5 font-semibold text-emerald-600">Lossless</td>
                    <td className="p-3.5">Exporting Photoshop drafts for quick client preview</td>
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
              Helpful Answers
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2.5">
              Frequently Asked Questions About Image to PNG Conversion
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Have questions about <strong className="font-semibold text-slate-800">how to convert image to png</strong> or keeping transparent backgrounds? Find simple answers below.
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
                Developer Example
              </span>
              <h3 className="text-lg sm:text-2xl font-bold mt-1 text-white">
                How to Convert Image to PNG in JavaScript
              </h3>
            </div>
            <span className="self-start md:self-auto px-3 py-1 rounded-full text-xs font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30">
              HTML5 Canvas API
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
            Want to build your own <strong className="text-white">image to png converter</strong> tool? Here is a simple JavaScript code snippet to convert any photo into a lossless PNG in the browser:
          </p>

          <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 font-mono text-xs overflow-x-auto text-blue-200 leading-relaxed">
            <pre>{`// Simple in-browser Image to PNG conversion function
async function convertImageToPng(imageFile) {
  // Step 1: Read the image file into a bitmap
  const bitmap = await createImageBitmap(imageFile);
  
  // Step 2: Create a canvas with the same width and height
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  
  // Step 3: Draw the bitmap on the canvas
  const ctx = canvas.getContext('2d', { alpha: true });
  ctx.drawImage(bitmap, 0, 0);
  
  // Step 4: Export the image as a lossless PNG file
  return new Promise((resolve, reject) => {
    canvas.toBlob((pngBlob) => {
      if (pngBlob) {
        resolve(pngBlob);
      } else {
        reject(new Error('Conversion failed'));
      }
    }, 'image/png', 1.0);
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
            Try our fast, free, and private <strong className="text-white font-bold">Image to PNG</strong> converter today with no limits and full transparency support.
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
