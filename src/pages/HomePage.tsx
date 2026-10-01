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
      q: 'What is an Image to PNG converter?',
      a: 'An image to png converter is a free online tool. It lets you convert image to png format directly in your web browser. You can convert to png image files without losing clarity or sharpness.',
    },
    {
      q: 'How do I convert image to png on this website?',
      a: 'To convert image to png, drag your picture into the drop zone or click Choose Image. Our image converter to png processes your file instantly. Then click Download PNG to save your new file.',
    },
    {
      q: 'Is this image to png converter free to use?',
      a: 'Yes! Our image to png converter free service is 100% free with no account sign-up and no daily conversion limits. You can image convert to png as many pictures as you need.',
    },
    {
      q: 'How can I convert image to transparent PNG?',
      a: 'Upload your file into our tool to turn your image to transparent png. If your source graphic has transparent layers, our image to png converter preserves the full 8-bit alpha channel.',
    },
    {
      q: 'How do I convert JPG to PNG image?',
      a: 'To convert jpg to png image files, simply drop your JPEG or JPG photo into the box. Our image to png converter transforms every pixel into a lossless PNG container instantly.',
    },
    {
      q: 'Why should I image convert to png instead of keeping JPG?',
      a: 'When you convert image to png, your graphics avoid future compression loss during editing. Converting an image to png format also allows you to add transparent backgrounds.',
    },
    {
      q: 'Can I batch convert to png image files together?',
      a: 'Yes. You can select multiple pictures at once in our image to png converter. Download each file individually or bundle all files into a single ZIP download.',
    },
    {
      q: 'Can I convert image to png format on mobile phones?',
      a: 'Yes. Our image to png converter free app runs smoothly on iPhone, iPad, and Android. You can choose photos straight from your camera roll to convert image to png.',
    },
  ];

  return (
    <div className="space-y-8 sm:space-y-12 pb-12">
      {/* 
        ========================================================================
        QUARTER 1: HERO SECTION & IMAGE TO PNG CONVERTER (COMPACT VIEWPORT HEIGHT)
        ========================================================================
      */}
      <section className="relative pt-2 sm:pt-4 pb-1 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          {/* Compact Trust Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-800 border border-blue-200 mb-1.5 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>100% Private In-Browser Conversion • No Server Uploads</span>
          </div>

          {/* Compact H1 */}
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
            Image to PNG Converter – Convert Images to PNG Free
          </h1>

          {/* Compact Subtitle (Target Keywords preserved in first 50 words) */}
          <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-slate-600 leading-normal max-w-2xl mx-auto">
            Use our fast, free <strong className="font-bold text-slate-900">Image to PNG</strong> converter to convert image to png files in seconds. Our browser-based <strong className="font-semibold text-slate-800">image to png converter free</strong> tool turns JPG, WEBP, HEIC, GIF, and SVG pictures into crisp PNG images with zero quality loss.
          </p>

          {/* Compact Feature Pills Row */}
          <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 text-[11px] font-medium text-slate-600">
            <span className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs">
              <Zap className="w-3 h-3 text-amber-500" /> Fast Speed
            </span>
            <span className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs">
              <Palette className="w-3 h-3 text-emerald-500" /> Transparent PNG
            </span>
            <span className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs">
              <Lock className="w-3 h-3 text-blue-500" /> 100% Private
            </span>
            <span className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs">
              <Download className="w-3 h-3 text-indigo-500" /> Batch ZIP
            </span>
          </div>
        </div>

        {/* Main Interactive Converter Box - Placed Immediately Above the Fold */}
        <div className="mt-2.5 sm:mt-3.5 max-w-4xl mx-auto px-4 sm:px-6">
          <MainConverter />
        </div>

        {/* Fast Format Navigation Links */}
        <div className="mt-3.5 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Popular Image Converter to PNG Tools
          </p>
          <div className="flex flex-wrap justify-center gap-1 sm:gap-1.5">
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
            ].map((fmt) => (
              <a
                key={fmt.path}
                href={fmt.path}
                onClick={(e) => handleLinkClick(e, fmt.path)}
                className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[11px] font-medium text-slate-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50/50 transition-colors cursor-pointer shadow-2xs"
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
        QUARTER 2: HOW TO CONVERT IMAGE TO PNG + VIDEO & WORKFLOW
        ========================================================================
      */}
      <section id="how-it-works" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 shadow-xs">
          <div className="text-center max-w-3xl mx-auto mb-6">
            <span className="text-[11px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
              Quick Guide
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              How to Convert Image to PNG Online
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
              Follow these simple steps to <strong className="font-semibold text-slate-800">convert image to png format</strong> in seconds with our free <strong className="font-semibold text-slate-800">image converter to png</strong>.
            </p>
          </div>

          {/* 4 Clear Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center mb-2.5 shadow-xs">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">Pick Your Image</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Click Choose Image or drop files to <strong className="font-semibold text-slate-800">convert image to png</strong> right away.
              </p>
              <ul className="mt-2 text-[11px] text-slate-500 space-y-0.5 list-disc pl-3.5">
                <li>Supports JPG, WEBP, SVG, HEIC</li>
                <li>Batch image convert to png</li>
                <li>Zero upload wait time</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center mb-2.5 shadow-xs">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">In-Browser Decoding</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our <strong className="font-semibold text-slate-800">image to png converter</strong> processes your pictures locally in memory.
              </p>
              <ul className="mt-2 text-[11px] text-slate-500 space-y-0.5 list-disc pl-3.5">
                <li>Keeps 100% full clarity</li>
                <li>Private Image to PNG conversion</li>
                <li>Safe for sensitive graphics</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center mb-2.5 shadow-xs">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">Lossless PNG Output</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Easily <strong className="font-semibold text-slate-800">convert to png image</strong> files with lossless DEFLATE compression.
              </p>
              <ul className="mt-2 text-[11px] text-slate-500 space-y-0.5 list-disc pl-3.5">
                <li>Image to transparent png support</li>
                <li>Compress to 50kb or 200kb</li>
                <li>Built-in crop and rotation</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center mb-2.5 shadow-xs">
                4
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">Download PNG File</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Download your new file from our <strong className="font-semibold text-slate-800">image to png converter free</strong> tool instantly.
              </p>
              <ul className="mt-2 text-[11px] text-slate-500 space-y-0.5 list-disc pl-3.5">
                <li>Single click PNG download</li>
                <li>One-click batch ZIP download</li>
                <li>Ready for web and design use</li>
              </ul>
            </div>
          </div>

          {/* Interactive Video Walkthrough */}
          <div className="mt-6 pt-6 border-t border-slate-200" id="video-tutorial">
            <div className="text-center max-w-2xl mx-auto mb-4">
              <h3 className="text-base sm:text-xl font-bold text-slate-900">
                Video Tutorial: How to Convert Image to PNG
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Watch this 12-second guide to see how our <strong className="font-semibold text-slate-800">image converter to png</strong> transforms pictures into lossless files.
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <ImageToPngVideoWalkthrough />
            </div>
          </div>

          {/* WebP Workflow Diagram */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-sm sm:text-lg font-bold text-slate-900 mb-1.5">
                Image to PNG Converter Workflow
              </h3>
              <p className="text-xs text-slate-600 mb-3">
                See how our <strong className="font-semibold text-slate-800">image to png converter</strong> transforms raw pictures into high-definition PNG files directly in your browser.
              </p>
              <img
                src="/image-to-png.webp"
                alt="Image to PNG browser conversion workflow and DEFLATE compression pipeline"
                width={800}
                height={450}
                loading="lazy"
                className="rounded-xl shadow-md border border-slate-200 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        QUARTER 3: TRANSPARENCY, FORMATS & CONVERT TO PNG IMAGE
        ========================================================================
      */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 shadow-xs">
          <div className="max-w-3xl mx-auto text-center mb-6">
            <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
              Clear Alpha Channels
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Convert Image to Transparent PNG with Crisp Edges
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
              When you <strong className="font-bold text-slate-800">convert image to transparent png</strong>, your logos, icons, and signatures blend seamlessly onto any dark or colorful website background.
            </p>
          </div>

          {/* WebP Transparency Guide Diagram */}
          <div className="mb-8 max-w-3xl mx-auto">
            <img
              src="/image-to-png-alpha-transparency-guide.webp"
              alt="Image to PNG alpha transparency comparison showing transparent background"
              width={800}
              height={450}
              loading="lazy"
              className="rounded-xl shadow-md border border-slate-200 w-full object-cover"
            />
          </div>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-2.5">
                <Palette className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">Image to Transparent PNG</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our tool makes it easy to turn any <strong className="font-semibold text-slate-800">image to transparent png</strong> with smooth 8-bit alpha shading.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold mb-2.5">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">Convert Image to PNG Format</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                When you <strong className="font-semibold text-slate-800">convert image to png format</strong>, curves stay razor-sharp and text stays readable at every zoom level.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold mb-2.5">
                <Sliders className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">Convert to PNG Image Suite</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Crop margins, rotate angles, and resize pixels whenever you need to <strong className="font-semibold text-slate-800">convert to png image</strong> files.
              </p>
            </div>
          </div>

          {/* Supported Format Grid */}
          <div className="pt-6 border-t border-slate-200">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 text-center mb-4">
              Supported Image Converter to PNG Formats
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {SUPPORTED_FORMATS.map((fmt) => (
                <a
                  key={fmt.slug}
                  href={`/${fmt.slug}`}
                  onClick={(e) => handleLinkClick(e, `/${fmt.slug}`)}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 transition-all text-center group cursor-pointer"
                >
                  <span className="block font-black text-slate-900 group-hover:text-blue-600 text-xs sm:text-sm">
                    {fmt.sourceFormat} to PNG
                  </span>
                  <span className="block text-[10px] text-slate-500 mt-0.5">
                    {fmt.badge}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Free PNG Sample Assets Showcase */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <FreePngSamples />
      </section>

      {/* Pro Features Showcase */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProFeatureShowcase />
      </section>

      {/* 
        ========================================================================
        QUARTER 4: LOSSLESS SPECS, CONVERT JPG TO PNG IMAGE & EXTENDED FAQS
        ========================================================================
      */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 shadow-xs">
          <div className="max-w-3xl mx-auto text-center mb-6">
            <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
              Lossless Quality
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Why Convert JPG to PNG Image Files?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
              Discover why designers choose our <strong className="font-semibold text-slate-800">image to png converter</strong> to <strong className="font-semibold text-slate-800">convert jpg to png image</strong> files for web and print graphics.
            </p>
          </div>

          {/* WebP Technical Specification Diagram */}
          <div className="mb-8 max-w-3xl mx-auto">
            <img
              src="/image-to-png-lossless-compression-diagram.webp"
              alt="Image to PNG lossless quality preservation and technical specifications"
              width={800}
              height={450}
              loading="lazy"
              className="rounded-xl shadow-md border border-slate-200 w-full object-cover"
            />
          </div>

          {/* Format Comparison Table */}
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200 bg-slate-50">
                  <th className="py-2.5 px-3.5 font-bold text-slate-900">Format Feature</th>
                  <th className="py-2.5 px-3.5 font-bold text-blue-700 bg-blue-50/50">PNG Format</th>
                  <th className="py-2.5 px-3.5 font-bold text-slate-700">JPG / JPEG</th>
                  <th className="py-2.5 px-3.5 font-bold text-slate-700">WEBP Format</th>
                  <th className="py-2.5 px-3.5 font-bold text-slate-700">GIF Format</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-2.5 px-3.5 font-semibold text-slate-900">Quality Type</td>
                  <td className="py-2.5 px-3.5 text-blue-800 bg-blue-50/30 font-bold">100% Lossless</td>
                  <td className="py-2.5 px-3.5 text-slate-700">Lossy (Drops detail)</td>
                  <td className="py-2.5 px-3.5 text-slate-700">Lossy or Lossless</td>
                  <td className="py-2.5 px-3.5 text-slate-700">Lossless (256 colors)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3.5 font-semibold text-slate-900">Transparent Background</td>
                  <td className="py-2.5 px-3.5 text-blue-800 bg-blue-50/30 font-bold">Full 8-bit Alpha</td>
                  <td className="py-2.5 px-3.5 text-red-900 font-bold">No (Opaque only)</td>
                  <td className="py-2.5 px-3.5 text-slate-700">Full 8-bit Alpha</td>
                  <td className="py-2.5 px-3.5 text-slate-700">1-bit Binary</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3.5 font-semibold text-slate-900">Best Picture Type</td>
                  <td className="py-2.5 px-3.5 text-blue-800 bg-blue-50/30 font-bold">Logos, UI, Screenshots</td>
                  <td className="py-2.5 px-3.5 text-slate-700">Camera Photos</td>
                  <td className="py-2.5 px-3.5 text-slate-700">Web Delivery</td>
                  <td className="py-2.5 px-3.5 text-slate-700">Simple Animations</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3.5 font-semibold text-slate-900">Device Compatibility</td>
                  <td className="py-2.5 px-3.5 text-blue-800 bg-blue-50/30 font-bold">100% Universal</td>
                  <td className="py-2.5 px-3.5 text-emerald-900 font-bold">100% Universal</td>
                  <td className="py-2.5 px-3.5 text-amber-900 font-bold">Modern Apps Only</td>
                  <td className="py-2.5 px-3.5 text-emerald-900 font-bold">100% Universal</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Helpful Guides and Links */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-2">
              Helpful Guides and Resources
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <a
                href="/guides/png-vs-jpg"
                onClick={(e) => handleLinkClick(e, '/guides/png-vs-jpg')}
                className="p-2.5 bg-white rounded-lg border border-slate-200 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-between"
              >
                <span><strong>PNG vs JPG Guide:</strong> When to image convert to png</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </a>
              <a
                href="/guides/png-vs-webp"
                onClick={(e) => handleLinkClick(e, '/guides/png-vs-webp')}
                className="p-2.5 bg-white rounded-lg border border-slate-200 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-between"
              >
                <span><strong>PNG vs WebP Guide:</strong> Transparency and speed</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </a>
              <a
                href="/security"
                onClick={(e) => handleLinkClick(e, '/security')}
                className="p-2.5 bg-white rounded-lg border border-slate-200 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-between"
              >
                <span><strong>Security Details:</strong> How browser conversion keeps you safe</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </a>
              <a
                href="https://www.w3.org/TR/png/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-white rounded-lg border border-slate-200 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-between"
              >
                <span><strong>W3C PNG Standard:</strong> Official PNG technical rules</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="text-[11px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
              Got Questions?
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-2">
              Frequently Asked Questions About Image to PNG Conversion
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Everything you need to know to <strong className="font-semibold text-slate-800">convert image to png</strong> and get clean PNG files.
            </p>
          </div>

          <div className="space-y-2.5">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    className="w-full p-3.5 sm:p-4 text-left font-bold text-slate-900 flex items-center justify-between gap-3 bg-slate-50/50 hover:bg-slate-100/70 transition-colors cursor-pointer text-xs sm:text-sm"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-3.5 pb-3.5 sm:px-4 sm:pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-2.5 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action Footer Banner */}
      <section className="py-12 bg-blue-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight">
            Ready to Convert Image to PNG?
          </h2>
          <p className="mt-2 text-white text-xs sm:text-sm max-w-xl mx-auto font-medium">
            Fast, private, and free. Use our image to png converter right in your web browser now.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2.5">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                document.getElementById('image-file-input')?.click();
              }}
              className="px-5 py-2.5 rounded-xl bg-white text-blue-900 font-extrabold text-xs sm:text-sm hover:bg-blue-50 shadow-lg shadow-blue-950/20 transition-all active:scale-95 cursor-pointer"
            >
              Choose Image to Convert
            </button>
            <button
              onClick={() => {
                onNavigate('/guides');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 rounded-xl bg-blue-800 text-white font-bold text-xs sm:text-sm hover:bg-blue-900 border border-blue-400/50 transition-all cursor-pointer shadow-sm"
            >
              Explore PNG Guides
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
