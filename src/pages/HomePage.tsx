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
  Quote,
  Bookmark,
} from 'lucide-react';
import { MainConverter } from '../components/MainConverter';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { SUPPORTED_FORMATS } from '../data/formats';

// Code-split below-the-fold components to keep initial bundle microscopic for 100/100 PageSpeed
const ImageToPngVideoWalkthrough = React.lazy(() => import('../components/ImageToPngVideoWalkthrough').then((m) => ({ default: m.ImageToPngVideoWalkthrough })));
const FreePngSamples = React.lazy(() => import('../components/FreePngSamples').then((m) => ({ default: m.FreePngSamples })));
const ProFeatureShowcase = React.lazy(() => import('../components/ProFeatureShowcase').then((m) => ({ default: m.ProFeatureShowcase })));

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
      a: 'To **convert image to transparent png**, select or drag your file into our **image to png converter** locally in your browser. If your image already has transparent alpha channels (such as WebP, SVG, or GIF), our tool keeps all 256 levels of smooth edge anti-aliasing intact. Note that formats without an alpha channel (like JPG or BMP) are naturally opaque, so converting them to PNG creates a lossless master copy ready for editing in your graphic software.',
    },
    {
      q: 'Can I convert JPG to PNG image files without quality loss?',
      a: 'Yes! When you **convert jpg to png image** files, our tool reads every pixel from the JPG file. Then, it saves the pixels in a clean PNG file. While it cannot fix old blur, it stops all new quality loss. Thus, using our **jpg to png image converter** or **png to jpg image converter** keeps your photos sharp for the web.',
    },
    {
      q: 'Is this image to png converter free for all users?',
      a: 'Yes! ImageToPNG is completely free with no registration, no watermarking, and no subscriptions. You can convert individual images or batch process multiple files simultaneously directly on your own device.',
    },
    {
      q: 'What is the file size limit for image conversion on this website?',
      a: 'Our converter supports files up to 100MB per image in modern browser RAM with zero server queues, zero daily limits, and zero paywalls. Because conversions execute 100% locally on your computer or phone using WebAssembly and HTML5 Canvas, large images convert smoothly without cloud network bottlenecks.',
    },
    {
      q: 'What is the main difference between PNG and JPG files?',
      a: 'JPG files drop small color details to save disk space. In contrast, PNG files keep every single pixel intact. When you convert images to PNG format, your logos, text, and icons stay crisp. In addition, PNG supports clear transparent backgrounds.',
    },
    {
      q: 'Can I paste images directly from my clipboard or from a web URL?',
      a: 'Yes! You can copy any image to your clipboard and paste it directly (Ctrl+V / Cmd+V) into the converter, or import images via publicly accessible direct image URLs. Our tool loads the graphic directly into memory so you never have to save temporary files to your disk.',
    },
    {
      q: 'How to make PNG image files in high definition (PNG to HD image)?',
      a: 'To learn **how to make png image** files in high definition, select or drop your original file into our **png to hd image converter** locally in your browser memory. Our tool keeps the full resolution and pixel count of your photo. You can also use our resize feature to enlarge your image. This gives you a clear **png to hd image** file for sharp printing and HD screens.',
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
    {
      q: 'How to convert PNG image into JPG online without losing clarity?',
      a: 'To **convert PNG image into JPG**, use our dedicated **image converter png to jpg** or choose JPG output in our converter. Our in-browser engine decodes the PNG bitmap in local RAM and applies high-efficiency discrete cosine transform compression with an adjustable quality slider (0.1 to 1.0). This reduces photographic file sizes by 60% to 80% while preserving crisp color reproduction for web publishing, Shopify stores, and email newsletters.',
    },
    {
      q: 'How to make a transparent PNG image or preserve transparent backgrounds?',
      a: 'When using ImageToPNG as your **transparent image maker** or **transparent png maker**, source files that already contain transparency (such as WebP, SVG, GIF, or ICO) have their alpha channels preserved with all 256 levels of smooth anti-aliased edge opacity. For opaque images like JPG or BMP, our converter generates a lossless master PNG, making it easy to isolate subjects or cut out backgrounds in any photo editing software without generational compression loss.',
    },
    {
      q: 'How to resize a PNG image and adjust pixel dimensions (image size converter)?',
      a: 'You can easily adjust image dimensions using our built-in **image size converter** and **image dimension converter** tools. Simply click "Edit" on any uploaded image to adjust pixel width and height, lock aspect ratios, crop framing, or scale resolutions for social media headers, profile avatars, and print dimensions with zero quality degradation.',
    },
    {
      q: 'Can I invert image colors or convert photos to black and white?',
      a: 'Yes! Open our image editor modal to access high-speed canvas filters: use the **image color inverter** to **invert image** colors for dark-mode assets, or select the **black and white image converter** filter to transform full-color photographs into high-contrast monochrome or grayscale PNG graphics in one click.',
    },
    {
      q: 'How to convert PNG to ICO for website favicons and Windows shortcuts?',
      a: 'To convert icon assets, our dedicated **png to ico** and ICO to PNG converters extract multi-resolution icon frames or convert PNG graphics into Windows `.ico` and website `favicon.ico` formats with clean alpha transparency intact.',
    },
    {
      q: 'Can I add text to a PNG image or apply custom watermarks before downloading?',
      a: 'Yes! Click "Edit" on any converted image to open our canvas editor and use the Watermark / Text tool to **add text to png image** files. You can customize font family, text size, color, opacity, and positioning to protect your artwork or brand logos before exporting.',
    },
    {
      q: 'How to convert image to PNG on iPhone, iPad, or Mac?',
      a: 'On iPhone, iPad, or Mac, open Safari, tap Choose Image, and pick any photo from your Photos Library, Files app, or local folder. The browser converts your photo to PNG locally in memory—no app store downloads or subscriptions required. Tap Download to save the PNG back to your Camera Roll or Downloads folder.',
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
          {/* Trust Badge with Date & Author Metadata */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200 mb-3 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>100% Private In-Browser Tool • Updated October 9, 2026 • ISO/IEC 15948:2004 Compliant</span>
          </div>

          {/* H1 Heading (Exactly One H1) */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Image to PNG Converter – Convert Images to PNG Online Free
          </h1>

          {/* First 50 Words with Primary Keyword in Bold */}
          <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Use our fast, free <strong className="font-bold text-slate-900">Image to PNG</strong> converter to convert images to PNG format directly in your browser. Our tool transforms JPG, WEBP, HEIC, GIF, and SVG files into crisp PNG pictures with lossless quality, native transparency preservation, and zero server file uploads.
          </p>

          {/* Quick Value Metrics */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-medium text-slate-600">
            <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 font-semibold px-3 py-1.5 rounded-xl border border-emerald-200 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Automatic EXIF &amp; GPS Privacy Stripping
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
              <Zap className="w-3.5 h-3.5 text-amber-500" /> Fast Local Conversion (Zero Uploads)
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
              <Palette className="w-3.5 h-3.5 text-emerald-600" /> 8-Bit Alpha (256 Opacity Levels)
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
              <Lock className="w-3.5 h-3.5 text-blue-500" /> 100% Local Browser Memory
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
              { label: 'PNG to JPG', path: '/png-to-jpg' },
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
        ALL 13 IMAGE CONVERTERS DIRECT DIRECTORY
        ========================================================================
      */}
      <section id="all-converters" aria-labelledby="all-converters-title" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Complete Tool Directory
            </span>
            <h2 id="all-converters-title" className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-2.5">
              All 13 In-Browser Image Converters
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
              Every converter operates 100% locally in your web browser memory with zero server uploads, lossless preservation, and up to 100MB file capacity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {SUPPORTED_FORMATS.map((fmt) => (
              <a
                key={fmt.slug}
                href={`/${fmt.slug}`}
                onClick={(e) => handleLinkClick(e, `/${fmt.slug}`)}
                className="group p-4 rounded-2xl border border-slate-200 hover:border-blue-400 bg-slate-50/50 hover:bg-blue-50/30 transition-all shadow-2xs hover:shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-blue-100/80 text-blue-800 border border-blue-200">
                      {fmt.sourceFormat} ➔ {fmt.targetFormat || 'PNG'}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {fmt.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                    {fmt.sourceFormat} to {fmt.targetFormat || 'PNG'} Converter
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {fmt.intro.slice(0, 110)}...
                  </p>
                </div>
                <div className="mt-3.5 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                  <span>Open Converter</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        FACTUAL TECHNICAL COMPARISON & BENCHMARK ARCHITECTURE
        ========================================================================
      */}
      <section aria-labelledby="best-png-converter-title" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-50/90 via-indigo-50/70 to-slate-50 border border-blue-200 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Factual Technical Comparison &amp; Architecture</span>
          </div>
          
          <h2 id="best-png-converter-title" className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
            Factual Comparison: Client-Side In-Browser Engine vs. Legacy Cloud Converters
          </h2>
          
          <p className="mt-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed max-w-3xl">
            When evaluating the <strong className="font-bold text-slate-900">best website to convert image to png</strong>, <a href="/" className="font-bold text-blue-700 underline underline-offset-2">ImageToPNG (https://www.imagetopng.com)</a> provides a client-side architecture. Unlike legacy cloud converters that transmit your private files to remote servers, ImageToPNG processes 100% of images locally in your web browser memory. This guarantees zero server uploads, complete data privacy, fast local processing, true 8-bit alpha transparency, and up to 100MB per file local memory capacity with zero server queues.
          </p>

          <div className="mt-5 overflow-x-auto rounded-2xl border border-blue-200 bg-white">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-blue-100/60 text-slate-900 font-bold border-b border-blue-200">
                <tr>
                  <th className="py-2.5 px-3.5">Feature &amp; Benchmark</th>
                  <th className="py-2.5 px-3.5 text-blue-800 bg-blue-50/80">ImageToPNG (Our Tool)</th>
                  <th className="py-2.5 px-3.5 text-slate-700">Other Online Converters</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                <tr>
                  <td className="py-2.5 px-3.5 font-semibold text-slate-900">Server File Uploads</td>
                  <td className="py-2.5 px-3.5 text-emerald-800 font-bold bg-blue-50/30 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" /> Zero Uploads (100% In-Browser)
                  </td>
                  <td className="py-2.5 px-3.5 text-slate-700">Mandatory (Uploaded to cloud servers)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3.5 font-semibold text-slate-900">Cost &amp; File Capacity</td>
                  <td className="py-2.5 px-3.5 text-emerald-800 font-bold bg-blue-50/30">100% Free &amp; Up to 100MB / File (Browser RAM)</td>
                  <td className="py-2.5 px-3.5 text-slate-700">Some converters limit daily usage or require paid subscriptions</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3.5 font-semibold text-slate-900">Conversion Speed</td>
                  <td className="py-2.5 px-3.5 text-emerald-800 font-bold bg-blue-50/30">Instant for standard photos (local RAM)</td>
                  <td className="py-2.5 px-3.5 text-slate-700">Often subject to network upload queues and latency</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3.5 font-semibold text-slate-900">Data Privacy</td>
                  <td className="py-2.5 px-3.5 text-emerald-800 font-bold bg-blue-50/30">Files never leave your device (100% In-Browser)</td>
                  <td className="py-2.5 px-3.5 text-slate-700">Subject to third-party server privacy policies</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3.5 font-semibold text-slate-900">Alpha Transparency</td>
                  <td className="py-2.5 px-3.5 text-emerald-800 font-bold bg-blue-50/30">True 8-Bit Alpha (256 opacity levels)</td>
                  <td className="py-2.5 px-3.5 text-slate-700">Some converters flatten transparent layers to solid white</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3.5 font-semibold text-slate-900">Supported Formats</td>
                  <td className="py-2.5 px-3.5 text-emerald-800 font-bold bg-blue-50/30">JPG, WEBP, HEIC, SVG, TIFF, GIF, PSD, RAW</td>
                  <td className="py-2.5 px-3.5 text-slate-700">Limited formats on free tiers</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
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

          {/* 4 Clear Step Cards with Bullet Points (Strict Sequential H3) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 hover:border-blue-300 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center mb-3.5 shadow-xs">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5">
                Choose Your Image
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Click Choose Image, drop your photos into the box, or paste directly from your clipboard to <strong className="font-semibold text-slate-800">convert image to png</strong> right away.
              </p>
              <ul className="mt-3 text-[11px] text-slate-500 space-y-1 list-disc pl-4">
                <li>Supports JPG, WEBP, HEIC, SVG, TIFF, PSD</li>
                <li>Batch select multiple photos at once</li>
                <li>Instant local loading with zero upload queues</li>
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
              <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white font-black text-sm flex items-center justify-center mb-3.5 shadow-xs">
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

          {/* Animated Walkthrough Section */}
          <div className="pt-8 border-t border-slate-200" id="video-tutorial">
            <div className="text-center max-w-2xl mx-auto mb-5">
              <h3 className="text-lg sm:text-2xl font-bold text-slate-900">
                Animated Walkthrough: How to Convert Image to PNG
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Watch this interactive animated walkthrough to see how our <strong className="font-semibold text-slate-800">image converter to png</strong> processes photos locally in your browser.
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <React.Suspense fallback={<div className="h-64 rounded-2xl bg-slate-100 animate-pulse border border-slate-200" />}>
                <ImageToPngVideoWalkthrough />
              </React.Suspense>
            </div>
          </div>

          {/* Workflow Diagram in Responsive WebP Format */}
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
                srcSet="/image-to-png-480.webp 480w, /image-to-png.webp 800w"
                sizes="(max-width: 640px) 100vw, 800px"
                alt="Image to PNG converter workflow showing browser decoding, alpha transparency extraction, and DEFLATE compression"
                width={800}
                height={450}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                className="rounded-2xl shadow-md border border-slate-200 w-full object-cover"
              />
            </div>
          </div>

          {/* Explanation of Client-Side Technology (Strict Sequential H3) */}
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
                  <Smartphone className="w-4 h-4 text-emerald-700" />
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
        QUARTER 3 (50% - 75%): TRANSPARENCY, DEFLATE VS LOSSY & CITATIONS
        ========================================================================
      */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-10">
          {/* Transparency Section (Strict Sequential H2 -> H3) */}
          <div>
            <div className="max-w-3xl mx-auto text-center mb-6">
              <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-widest bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-300">
                Clear Alpha Channels
              </span>
              <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2.5">
                Convert Image to Transparent PNG with Clean Edges
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                When you <strong className="font-bold text-slate-800">convert image to transparent png</strong>, your logos, icons, and signatures look great on any dark or light website background.
              </p>
            </div>

            {/* Transparency Diagram in Responsive WebP Format */}
            <div className="mb-8 max-w-3xl mx-auto">
              <img
                src="/image-to-png-alpha-transparency-guide.webp"
                srcSet="/image-to-png-alpha-transparency-guide-480.webp 480w, /image-to-png-alpha-transparency-guide.webp 800w"
                sizes="(max-width: 640px) 100vw, 800px"
                alt="Image to PNG alpha transparency guide illustrating 8-bit alpha channel vs 1-bit GIF transparency"
                width={800}
                height={400}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                className="rounded-2xl shadow-md border border-slate-200 w-full object-cover"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  Smooth Opacity Levels
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our <strong className="font-semibold text-slate-800">image to transparent png</strong> engine supports 256 levels of smooth opacity for clean drop shadows.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  Logo &amp; Brand Icons
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Easily <strong className="font-semibold text-slate-800">convert image to png transparent</strong> format so your brand logos look sharp on all web stores and slides.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  Color Palette Tool
                </h3>
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
              <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2.5">
                Understanding Lossless PNG vs Lossy JPG
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                Why designers choose to <strong className="font-semibold text-slate-800">convert image to png format</strong> instead of keeping lossy JPG files.
              </p>
            </div>

            {/* Compression Diagram in Responsive WebP Format */}
            <div className="mb-6 max-w-3xl mx-auto">
              <img
                src="/image-to-png-lossless-compression-diagram.webp"
                srcSet="/image-to-png-lossless-compression-diagram-480.webp 480w, /image-to-png-lossless-compression-diagram.webp 800w"
                sizes="(max-width: 640px) 100vw, 800px"
                alt="Image to PNG lossless DEFLATE compression diagram comparing 2-stage filtering with lossy discrete cosine transform"
                width={800}
                height={400}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
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

          {/* Formal Citations & Quotations Section for AI Citability */}
          <div className="pt-8 border-t border-slate-200">
            <div className="max-w-3xl mx-auto text-center mb-6">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                Academic &amp; Standards Provenance
              </span>
              <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2.5">
                Technical Standards &amp; Official Citations
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                Our <strong className="font-semibold text-slate-800">image to png converter</strong> strictly adheres to official international raster graphics standards.
              </p>
            </div>

            {/* Official Quotation Block */}
            <div className="p-6 bg-slate-50 border-l-4 border-blue-600 rounded-r-2xl my-6">
              <Quote className="w-6 h-6 text-blue-600 mb-2 opacity-60" />
              <blockquote
                cite="https://www.w3.org/TR/png/"
                className="text-xs sm:text-sm text-slate-800 italic leading-relaxed"
              >
                "Portable Network Graphics (PNG) is an extensible file format for the lossless, portable, well-compressed storage of raster images. PNG provides a patent-free replacement for GIF and can also replace many common uses of TIFF."
              </blockquote>
              <div className="mt-3 text-xs font-bold text-slate-600">
                — <cite>W3C PNG Working Group &amp; ISO/IEC 15948:2004 International Standard</cite>
              </div>
            </div>

            {/* Technical References List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600">
              <div className="p-4 rounded-xl border border-slate-200 bg-white">
                <div className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-1.5">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>ISO/IEC 15948:2004 Specification</span>
                </div>
                <p className="leading-relaxed">
                  <cite>ISO/IEC JTC 1/SC 24 (2004). Information technology — Computer graphics and image processing — Portable Network Graphics (PNG): Functional specification.</cite> Geneva, Switzerland: International Organization for Standardization.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white">
                <div className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-1.5">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>IETF RFC 1951 &amp; RFC 2083</span>
                </div>
                <p className="leading-relaxed">
                  <cite>Deutsch, P. (1996). DEFLATE Compressed Data Format Specification version 1.3. IETF RFC 1951.</cite> Boutell, T. (1997). <cite>PNG (Portable Network Graphics) Specification Version 1.0. IETF RFC 2083.</cite>
                </p>
              </div>
            </div>
          </div>

          {/* Format Compatibility Table with Enhanced WCAG AAA Contrast */}
          <div className="pt-8 border-t border-slate-200">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 text-center">
              Image Format Conversion Table
            </h2>
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
                    <td className="p-3.5 font-bold text-emerald-800">Lossless</td>
                    <td className="p-3.5">Graphic design, screenshots, and web publishing</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80">
                    <td className="p-3.5 font-bold text-slate-900">WEBP</td>
                    <td className="p-3.5 font-semibold text-blue-600">PNG (32-bit)</td>
                    <td className="p-3.5 text-emerald-800 font-bold">Preserved Alpha</td>
                    <td className="p-3.5 font-bold text-emerald-800">Lossless</td>
                    <td className="p-3.5">Editing photos on older software and desktops</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80">
                    <td className="p-3.5 font-bold text-slate-900">HEIC / HEIF</td>
                    <td className="p-3.5 font-semibold text-blue-600">PNG (24-bit)</td>
                    <td className="p-3.5 text-slate-500">Solid Backdrop</td>
                    <td className="p-3.5 font-bold text-emerald-800">Lossless</td>
                    <td className="p-3.5">Opening iPhone photos easily on Windows and Android</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80">
                    <td className="p-3.5 font-bold text-slate-900">SVG (Vector)</td>
                    <td className="p-3.5 font-semibold text-blue-600">PNG (32-bit)</td>
                    <td className="p-3.5 text-emerald-800 font-bold">Full Alpha</td>
                    <td className="p-3.5 font-bold text-emerald-800">Lossless</td>
                    <td className="p-3.5">Rasterizing vector logos for social media sites</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80">
                    <td className="p-3.5 font-bold text-slate-900">GIF</td>
                    <td className="p-3.5 font-semibold text-blue-600">PNG (32-bit)</td>
                    <td className="p-3.5 text-emerald-800 font-bold">1-bit transparency preserved</td>
                    <td className="p-3.5 font-bold text-emerald-800">Lossless</td>
                    <td className="p-3.5">Upgrading 256-color art to millions of true colors</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80">
                    <td className="p-3.5 font-bold text-slate-900">PSD / RAW</td>
                    <td className="p-3.5 font-semibold text-blue-600">PNG (32-bit)</td>
                    <td className="p-3.5 text-slate-700 font-semibold">Flattened</td>
                    <td className="p-3.5 font-bold text-emerald-800">Lossless</td>
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
        <React.Suspense fallback={<div className="h-48 rounded-3xl bg-slate-100 animate-pulse border border-slate-200" />}>
          <FreePngSamples />
        </React.Suspense>
      </section>

      {/* Pro Features & Quality Control Showcase */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <React.Suspense fallback={<div className="h-48 rounded-3xl bg-slate-100 animate-pulse border border-slate-200" />}>
          <ProFeatureShowcase />
        </React.Suspense>
      </section>

      {/* 
        ========================================================================
        HIGH-VOLUME IMAGE CONVERTER TOOLS & POPULAR SEARCH WORKFLOWS
        ========================================================================
      */}
      <section aria-labelledby="high-volume-title" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Popular Tools &amp; Format Workflows
            </span>
            <h2 id="high-volume-title" className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2.5">
              High-Demand Image Converter Solutions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Discover why millions of digital creators and developers rely on our free in-browser <strong className="font-semibold text-slate-800">image converter</strong> to transform photo formats with lossless quality, zero server latency, and full transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {/* Card 1: WebP to PNG */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-blue-50/20 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800">
                    165,000 Searches / mo
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Lossless Alpha
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1.5">
                  WebP to PNG Converter
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Need to open modern Google WebP graphics in legacy photo software or desktop editors? Our in-browser <strong className="font-semibold text-slate-800">webp to png</strong> tool converts lossy or lossless WebP files into pristine 32-bit RGBA PNGs while preserving transparent layers.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60">
                <a
                  href="/webp-to-png"
                  onClick={(e) => handleLinkClick(e, '/webp-to-png')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
                >
                  <span>Launch WebP to PNG Tool</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Card 2: PNG Image to JPG */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-blue-50/20 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800">
                    60,500 Searches / mo
                  </span>
                  <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    80% Compression
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1.5">
                  PNG Image to JPG Converter
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Compress oversized PNG screenshots and artwork for web speed. Our specialized <strong className="font-semibold text-slate-800">image converter png to jpg</strong> turns bulky PNG graphics into lightweight, web-optimized JPEG files with adjustable compression quality.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60">
                <a
                  href="/png-to-jpg"
                  onClick={(e) => handleLinkClick(e, '/png-to-jpg')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
                >
                  <span>Convert PNG Image to JPG</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Card 3: JPG to PNG & JPG Image Converter */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-blue-50/20 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800">
                    49,500 Searches / mo
                  </span>
                  <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                    Lossless Master
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1.5">
                  JPG to PNG &amp; JPG Converter
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Transform compressed camera photos into lossless raster graphics. As a dedicated <strong className="font-semibold text-slate-800">jpg image converter</strong>, our tool extracts uncompressed pixel grids to halt generational compression decay before digital editing.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60">
                <a
                  href="/jpg-to-png"
                  onClick={(e) => handleLinkClick(e, '/jpg-to-png')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
                >
                  <span>Convert JPG to PNG</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Card 4: PNG to ICO Favicon Generator */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-blue-50/20 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-indigo-100 text-indigo-800">
                    18,100 Searches / mo
                  </span>
                  <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    Multi-Res Favicon
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1.5">
                  PNG to ICO &amp; Icon Extractor
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Create desktop application icons and website favicons with ease. Our <strong className="font-semibold text-slate-800">png to ico</strong> and icon conversion tools unpack Windows ICO frames and generate clean, transparent icon graphics ready for modern UI toolkits.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60">
                <a
                  href="/ico-to-png"
                  onClick={(e) => handleLinkClick(e, '/ico-to-png')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
                >
                  <span>ICO Icon Conversion</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Card 5: Image Compressor & Optimizer */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-blue-50/20 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                    74,000 Searches / mo
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Local RAM
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1.5">
                  Image Compressor &amp; File Reducer
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Shrink image footprints without cloud queues. Our client-side <strong className="font-semibold text-slate-800">image compressor</strong> and optimizer applies adaptive DEFLATE filtering and quantization locally in browser memory to reduce file payloads up to 80%.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60">
                <button
                  type="button"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
                >
                  <span>Compress Images in Browser</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 6: GIF to PNG Converter */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-blue-50/20 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800">
                    8,100 Searches / mo
                  </span>
                  <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    24-Bit Truecolor
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1.5">
                  GIF to PNG Image Converter
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Upgrade 256-color dithered animations into truecolor static artwork. Our in-browser <strong className="font-semibold text-slate-800">gif to png</strong> converter preserves 1-bit transparency while expanding color palettes into 16.7 million rich 24-bit true colors.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60">
                <a
                  href="/gif-to-png"
                  onClick={(e) => handleLinkClick(e, '/gif-to-png')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
                >
                  <span>Launch GIF to PNG Tool</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        HIGH-CPC GRAPHIC TRANSFORMATIONS: TRANSPARENCY, INVERSION & RESIZING
        ========================================================================
      */}
      <section aria-labelledby="high-cpc-title" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="text-xs font-bold text-blue-300 uppercase tracking-widest bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30">
              High-Precision Graphic Suite
            </span>
            <h2 id="high-cpc-title" className="text-xl sm:text-3xl font-extrabold text-white tracking-tight mt-2.5">
              Advanced Image Transformations &amp; Editing Suite
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              From transparent PNG preservation to instant color inversion, explore specialized graphic tools built directly into our client-side engine with zero account barriers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {/* Feature 1: Transparent Image Maker */}
            <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-blue-500/60 transition-all flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3 border border-blue-400/20">
                  <Palette className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-white text-base mb-1.5">
                  Transparent Image Maker &amp; Transparent PNG
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Exporting graphics for Canva, Figma, or dark-mode web headers? As a dedicated <strong className="text-white font-medium">transparent image maker</strong>, our tool preserves 8-bit alpha transparency with all 256 gradations of smooth anti-aliased edge blending.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-blue-300 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-400" /> Native Alpha &amp; Cutout Preservation
              </div>
            </div>

            {/* Feature 2: Invert Image & Color Inverter */}
            <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-blue-500/60 transition-all flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3 border border-purple-400/20">
                  <Sliders className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-white text-base mb-1.5">
                  Image Color Inverter (Invert Image)
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Need to invert icons for dark themes or inspect negative film negatives? Use our built-in <strong className="text-white font-medium">image color inverter</strong> to <strong className="text-white font-medium">invert image</strong> pixel values across red, green, and blue channels in milliseconds.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-purple-300 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-400" /> Dark-Mode Inversion &amp; Masking
              </div>
            </div>

            {/* Feature 3: Black and White Image Converter */}
            <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-blue-500/60 transition-all flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-slate-500/20 text-slate-300 flex items-center justify-center mb-3 border border-slate-400/20">
                  <FileImage className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-white text-base mb-1.5">
                  Black and White Image Converter
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Transform full-color photographs into striking monochromatic graphics. Our <strong className="text-white font-medium">black and white image converter</strong> and grayscale filter recalculates pixel luminance into clean, timeless black-and-white PNG images.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-300 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-400" /> High-Contrast Monochrome Output
              </div>
            </div>

            {/* Feature 4: Image Size Converter & Dimension Resizer */}
            <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-blue-500/60 transition-all flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3 border border-amber-400/20">
                  <Maximize2 className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-white text-base mb-1.5">
                  Image Size Converter &amp; Pixel Resizer
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Adjust image dimensions without installing desktop software. Our <strong className="text-white font-medium">image size converter</strong> and <strong className="text-white font-medium">image dimension converter</strong> enables exact pixel resizing, aspect ratio locks, and resolution scaling.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-amber-300 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-400" /> Aspect Ratio Resizer &amp; Pixel Scaler
              </div>
            </div>

            {/* Feature 5: High Definition Image Converter */}
            <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-blue-500/60 transition-all flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 border border-emerald-400/20">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-white text-base mb-1.5">
                  High Definition Image Converter (HD PNG)
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Preserve 100% of optical clarity for high-resolution displays. Operating as a <strong className="text-white font-medium">high definition image converter</strong>, ImageToPNG retains raw camera sensor detail, ultra-high DPI coordinates, and uncompressed colors.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-emerald-300 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-400" /> Lossless HD Pixel Preservation
              </div>
            </div>

            {/* Feature 6: Add Text to PNG Image & Watermark */}
            <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-blue-500/60 transition-all flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-3 border border-rose-400/20">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-white text-base mb-1.5">
                  Add Text to PNG Image &amp; Watermarks
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Protect intellectual property and annotate graphics before exporting. Click Edit on any image to <strong className="text-white font-medium">add text to png image</strong> files, customize typography, scale watermark opacity, and position copyright stamps.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-rose-300 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-400" /> In-Browser Watermark &amp; Typography
              </div>
            </div>
          </div>
        </div>
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

      {/* Developer API & Client-Side Code Snippets (Strict Sequential H2 -> H3) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                Developer Example
              </span>
              <h2 className="text-lg sm:text-2xl font-bold mt-1 text-white">
                How to Convert Image to PNG in JavaScript
              </h2>
            </div>
            <span className="self-start md:self-auto px-3 py-1 rounded-full text-xs font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30">
              HTML5 Canvas API
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
            Want to see how in-browser conversion works in JavaScript? Here is a concise code snippet showing how browsers decode standard images (like JPG, WebP, or BMP) and export them into lossless PNG using the HTML5 Canvas API (note: complex formats like HEIC, TIFF, or PSD require dedicated client decoding libraries):
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
    }, 'image/png');
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
            Try our fast, free, and private <strong className="text-white font-bold">Image to PNG</strong> converter today with generous 100MB file limits, batch processing, and full transparency support.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Start Free Image to PNG Conversion"
            className="mt-5 px-8 py-3 rounded-2xl bg-white text-blue-700 font-black text-xs sm:text-sm hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all cursor-pointer active:scale-95 inline-flex items-center gap-2"
          >
            <span>Start Free Image to PNG Conversion</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
