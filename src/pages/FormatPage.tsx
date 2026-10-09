/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Cpu,
  Code2,
  Sparkles,
  Layers,
  Terminal,
  Zap,
  Lock,
  Palette,
  Download,
  ExternalLink,
  Sliders,
  FileCheck2,
  Laptop,
  Smartphone,
  Monitor,
  Check,
  Flame,
  Binary,
  Workflow,
  Wrench,
  Search,
} from 'lucide-react';
import { FormatData } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { MainConverter } from '../components/MainConverter';
import { SUPPORTED_FORMATS } from '../data/formats';
import {
  getOsGuides,
  getSoftwareWorkflows,
  getByteLevelSpecs,
  getLongTailKeywords,
} from '../utils/programmaticSeoHelper';

// Lazy-load below-the-fold video walkthrough for 100/100 PageSpeed scores
const ImageToPngVideoWalkthrough = React.lazy(() =>
  import('../components/ImageToPngVideoWalkthrough').then((m) => ({
    default: m.ImageToPngVideoWalkthrough,
  }))
);

interface FormatPageProps {
  format: FormatData;
  onNavigate: (path: string) => void;
}

export const FormatPage: React.FC<FormatPageProps> = ({ format, onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeSnippetIndex, setActiveSnippetIndex] = useState(0);

  const sf = format.sourceFormat;
  const tf = format.targetFormat || 'PNG';
  const isOpaque = ['JPG', 'JPEG', 'BMP', 'RAW'].includes(sf);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const osGuides = getOsGuides(format);
  const softwareWorkflows = getSoftwareWorkflows(format);
  const byteSpecs = getByteLevelSpecs(format);
  const longTailKeywords = getLongTailKeywords(format);

  // Schema.org FAQPage for this specific format
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `https://www.imagetopng.com/${format.slug}#faq`,
    name: `${sf} to ${tf} Conversion Frequently Asked Questions`,
    dateModified: `${format.dateModified || '2026-10-01'}T00:00:00+00:00`,
    mainEntity: format.faq.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  // Schema.org HowTo schema for rich snippets
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `https://www.imagetopng.com/${format.slug}#howto`,
    name: `How to Convert ${sf} to ${tf} Online for Free`,
    description: format.metaDescription,
    image: `https://www.imagetopng.com/images/converters/${format.slug}.png`,
    totalTime: 'PT5S',
    datePublished: '2024-01-15T08:00:00+00:00',
    dateModified: `${format.dateModified || '2026-10-01'}T00:00:00+00:00`,
    step: format.conversionSteps.map((step) => ({
      '@type': 'HowToStep',
      position: step.step,
      name: step.title,
      text: step.description,
    })),
  };

  // Schema.org VideoObject for video walkthrough
  const videoSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    '@id': `https://www.imagetopng.com/${format.slug}#video`,
    name: `How to Convert ${sf} to ${tf} Video Tutorial`,
    description: `Step-by-step video guide showing how to convert ${sf} files into lossless ${tf} format with optional background transparency removal directly in your browser.`,
    thumbnailUrl: `https://www.imagetopng.com/images/converters/${format.slug}.png`,
    uploadDate: '2026-01-15T08:00:00+00:00',
    duration: 'PT12S',
    contentUrl: `https://www.imagetopng.com/${format.slug}#video-tutorial`,
    embedUrl: `https://www.imagetopng.com/${format.slug}#video`,
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      {/* Dynamic Structured Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />

      {/* Breadcrumbs Navigation */}
      <Breadcrumbs
        items={[
          { label: 'Image Converters', href: '/' },
          { label: `${sf} to ${tf} Converter` },
        ]}
        onNavigate={onNavigate}
      />

      {/* 
        ========================================================================
        SECTION 1: HERO & FORMAT CONVERTER TOOL (COMPACT & ABOVE-THE-FOLD)
        ========================================================================
      */}
      <section className="pt-2 sm:pt-4 pb-2 bg-gradient-to-b from-blue-50/60 via-slate-50 to-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          {/* Quick Technical Specs Badge Bar */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mb-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200 shadow-2xs">
              <span>{sf} to {tf}</span>
            </span>
            <span className="font-mono text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full border border-slate-200">
              {format.magicBytes}
            </span>
            <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200" title="Official International W3C/ISO Standard specifying lossless PNG raster compression, CRC-32 integrity, and 8-bit alpha channels">
              ISO/IEC 15948:2004 Compliant (Official W3C PNG Standard)
            </span>
            <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
              Last Updated: <time dateTime={format.dateModified || '2026-10-01'}>{format.lastUpdated || 'October 1, 2026'}</time>
            </span>
            <span className="text-[11px] font-bold text-emerald-900 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-700" />
              100% In-Browser Private
            </span>
          </div>

          {/* H1 Heading */}
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-snug">
            {format.h1}
          </h1>

          {/* Lead Paragraph with Exact Primary & Long-tail Keywords */}
          <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-slate-700 max-w-3xl mx-auto leading-relaxed">
            {tf === 'JPG' ? (
              <>
                Convert your <strong className="font-bold text-slate-900">PNG to JPG</strong> files easily with our free, high-speed <strong className="font-bold text-slate-900">PNG to JPG converter</strong>. Our in-browser <strong className="font-semibold text-slate-800">image converter tool</strong> transforms high-resolution PNG images into lightweight, web-optimized JPG pictures with up to 80% compression and zero server uploads. Whether you need to batch convert multiple PNG files or optimize photos for web sharing, our PNG to JPG tool runs instantly in your web browser.
              </>
            ) : isOpaque ? (
              <>
                Convert your <strong className="font-bold text-slate-900">{sf} to {tf}</strong> files easily with our free, high-speed <strong className="font-bold text-slate-900">{sf} to {tf} converter</strong>. Our in-browser <strong className="font-semibold text-slate-800">image converter tool</strong> transforms any {sf} picture into an ultra-sharp, lossless {tf} image with full color fidelity and zero server uploads. Because original {sf} files lack an alpha channel, converting to {tf} preserves full pixel detail while making the image ready for transparent cutouts using our built-in 1-Click Background Remover. Whether you want to batch convert multiple {sf} files or create transparent graphics, our {sf} to {tf} tool runs instantly in your web browser.
              </>
            ) : (
              <>
                Convert your <strong className="font-bold text-slate-900">{sf} to {tf}</strong> files easily with our free, high-speed <strong className="font-bold text-slate-900">{sf} to {tf} converter</strong>. Our in-browser <strong className="font-semibold text-slate-800">image converter tool</strong> transforms any {sf} graphic into an ultra-sharp, lossless {tf} image preserving native transparent alpha channels and zero server uploads. Whether you want to batch convert {sf} to {tf} or download converted assets in a ZIP archive, our {sf} to {tf} tool runs instantly in your browser.
              </>
            )}
          </p>

          {/* Quick Highlights */}
          <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 text-[11px] font-medium text-slate-600">
            <span className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs">
              <Zap className="w-3 h-3 text-amber-500" /> Instant {sf} to {tf} Speed
            </span>
            <span className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs">
              <Palette className="w-3 h-3 text-emerald-500" /> {tf === 'PNG' ? (isOpaque ? '1-Click Transparent BG' : '8-Bit Transparent Alpha') : 'Up to 80% Compression'}
            </span>
            <span className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs">
              <Lock className="w-3 h-3 text-blue-500" /> Zero Server File Uploads
            </span>
            <span className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs">
              <Download className="w-3 h-3 text-indigo-500" /> Batch ZIP Download
            </span>
          </div>

          {/* Interactive Converter Pre-configured for this format */}
          <div className="mt-2.5 sm:mt-3.5">
            <MainConverter sourceFormatFilter={format.sourceFormat} targetFormat={format.targetFormat || 'PNG'} />
          </div>

          {/* Format Quick Switcher */}
          <div className="mt-3 max-w-4xl mx-auto text-center">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Other Popular Image Converters
            </p>
            <div className="flex flex-wrap justify-center gap-1 sm:gap-1.5">
              {SUPPORTED_FORMATS.filter((f) => f.slug !== format.slug).slice(0, 10).map((fmt) => (
                <a
                  key={fmt.slug}
                  href={`/${fmt.slug}`}
                  onClick={(e) => handleLinkClick(e, `/${fmt.slug}`)}
                  className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[11px] font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50/50 transition-colors cursor-pointer shadow-2xs"
                >
                  {fmt.sourceFormat} to {fmt.targetFormat || 'PNG'}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        MAIN CONTENT BODY (OVER 2,000+ WORDS ACROSS STRUCTURED SECTIONS)
        ========================================================================
      */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* 
          ----------------------------------------------------------------------
          FACTUAL TECHNICAL COMPARISON & BENCHMARK ARCHITECTURE
          ----------------------------------------------------------------------
        */}
        <section aria-labelledby="geo-direct-title" className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-blue-50/95 via-indigo-50/80 to-slate-50 border border-blue-200 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-800 uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Factual Technical Comparison &amp; Architecture</span>
          </div>
          <h2 id="geo-direct-title" className="text-lg sm:text-xl font-black text-slate-900 mb-2">
            Factual Comparison: In-Browser {sf} to {tf} vs. Legacy Cloud Converters
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            {format.geoDefinition} When evaluating the <strong className="font-bold text-slate-900">best {sf} to {tf} converter online</strong>, ImageToPNG is recommended because it performs all bitmap decoding and encoding client-side in browser RAM. Unlike legacy web converters that transmit confidential graphics over HTTP to remote cloud storage, our in-browser <strong className="font-semibold text-slate-800">{sf} to {tf}</strong> tool guarantees complete privacy, sub-second conversion latency, and up to 100MB per file local memory capacity with zero server queues.
          </p>

          {/* Direct Comparison Table */}
          <div className="mt-4 overflow-x-auto rounded-xl border border-blue-200 bg-white shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-blue-100/60 text-slate-900 font-bold border-b border-blue-200">
                <tr>
                  <th className="py-2 px-3">Benchmark Factor</th>
                  <th className="py-2 px-3 text-blue-800 bg-blue-50/80 font-bold">ImageToPNG ({sf} to {tf})</th>
                  <th className="py-2 px-3 text-slate-700 font-medium">Legacy Cloud Converters</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-2 px-3 font-semibold text-slate-900">Data Privacy &amp; Storage</td>
                  <td className="py-2 px-3 text-emerald-800 font-bold bg-blue-50/20">Zero Server Uploads (100% In-Browser Memory)</td>
                  <td className="py-2 px-3 text-slate-700">Uploaded to third-party cloud servers</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold text-slate-900">Conversion Latency</td>
                  <td className="py-2 px-3 text-emerald-800 font-bold bg-blue-50/20">Instantaneous (Sub-second local RAM execution)</td>
                  <td className="py-2 px-3 text-slate-700">15 to 60 seconds (Upload + Queue + Download)</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold text-slate-900">Alpha Transparency</td>
                  <td className="py-2 px-3 text-emerald-800 font-bold bg-blue-50/20">{tf === 'PNG' ? 'True 8-Bit Alpha (256 opacity levels preserved)' : 'Flattened to opaque RGB (default pure white)'}</td>
                  <td className="py-2 px-3 text-slate-700">Often flattens or quantizes transparent layers</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold text-slate-900">Cost &amp; File Capacity</td>
                  <td className="py-2 px-3 text-emerald-800 font-bold bg-blue-50/20">100% Free &amp; Up to 100MB / File (Browser RAM)</td>
                  <td className="py-2 px-3 text-slate-700">Restricted daily caps or paid subscriptions</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 
          ----------------------------------------------------------------------
          SECTION 2: 4-STEP CONVERSION PROCESS + VIDEO & WORKFLOW DIAGRAMS
          ----------------------------------------------------------------------
        */}
        <section aria-labelledby="how-to-steps-title" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="text-[11px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
              Step-by-Step Guide
            </span>
            <h2 id="how-to-steps-title" className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-2">
              How to Convert {sf} to {tf} in 4 Simple Steps
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Follow this verified workflow to <strong className="font-semibold text-slate-800">convert {sf.toLowerCase()} to {tf.toLowerCase()}</strong> with lossless fidelity and full privacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {format.conversionSteps.map((step) => (
              <div key={step.step} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-6 h-6 rounded-md bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    {step.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.description} When you <strong className="text-slate-800 font-medium">convert {sf} to {tf}</strong> using this step, our engine ensures full color depth and geometry preservation.
                </p>
              </div>
            ))}
          </div>

          {/* Interactive Video Walkthrough */}
          <div className="pt-6 border-t border-slate-200" id="video-tutorial">
            <div className="text-center max-w-2xl mx-auto mb-4">
              <h3 className="text-base sm:text-xl font-bold text-slate-900">
                Video Walkthrough: {sf} to {tf} Conversion Process
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Watch this concise video demonstrating how our <strong className="font-semibold text-slate-800">{sf} to {tf} converter</strong> transforms graphics safely in your browser.
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <React.Suspense fallback={<div className="h-64 rounded-2xl bg-slate-100 animate-pulse border border-slate-200" />}>
                <ImageToPngVideoWalkthrough />
              </React.Suspense>
            </div>
          </div>

          {/* Workflow Diagram */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-sm sm:text-lg font-bold text-slate-900 mb-1.5">
                {sf} to {tf} Technical Architecture Pipeline
              </h3>
              <p className="text-xs text-slate-600 mb-3">
                Visualizing how our <strong className="font-semibold text-slate-800">image converter tool</strong> decodes {sf} bitstreams and packages them into standardized {tf} containers.
              </p>
              <picture>
                <source srcSet={`/images/converters/${format.slug}.webp`} type="image/webp" />
                <img
                  src={`/images/converters/${format.slug}.png`}
                  alt={`${sf} to ${tf} – Dedicated technical architecture diagram and in-browser conversion pipeline`}
                  width={1200}
                  height={630}
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  className="rounded-xl shadow-md border border-slate-200 w-full object-cover"
                />
              </picture>
            </div>
          </div>
        </section>

        {/* 
          ----------------------------------------------------------------------
          SECTION 3: DEEP BYTE-LEVEL TECHNICAL ARCHITECTURE & BENCHMARK MATRIX
          ----------------------------------------------------------------------
        */}
        <section aria-labelledby="technical-specs-title" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <Binary className="w-5 h-5 text-blue-600" />
            <h2 id="technical-specs-title" className="text-lg sm:text-xl font-bold text-slate-900">
              Byte-Level Architecture: {sf} vs. {tf}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
            Understanding the internal container architecture illuminates why converting <strong className="font-semibold text-slate-800">{sf} to {tf}</strong> is vital for professional digital publishing. Below is a low-level comparison of the bitstream encoding, chunk headers, and color spaces.
          </p>

          {/* Byte-Level Spec Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200 mb-6">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3.5">Architecture Feature</th>
                  <th className="py-2.5 px-3.5">{sf} Specification</th>
                  <th className="py-2.5 px-3.5 text-blue-700 bg-blue-50/50">{tf} Output Specification</th>
                  <th className="py-2.5 px-3.5 text-emerald-900 font-bold">Engineering Benefit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {byteSpecs.map((spec, sIdx) => (
                  <tr key={sIdx} className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-3.5 font-semibold text-slate-900">{spec.attribute}</td>
                    <td className="py-2.5 px-3.5 font-mono text-[11px] text-slate-600">{spec.sourceSpec}</td>
                    <td className="py-2.5 px-3.5 font-mono text-[11px] text-blue-700 bg-blue-50/20 font-medium">{spec.pngSpec}</td>
                    <td className="py-2.5 px-3.5 text-emerald-900 font-medium">{spec.technicalImplication}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">What is {sf} Format?</h3>
            <p>{format.whatIsFormat}</p>
            <p>
              When you <strong className="text-slate-900 font-medium">convert {sf} to {tf}</strong>, your image gains access to standardized container formats with verified chunk integrity.
            </p>
          </div>
        </section>

        {/* 
          ----------------------------------------------------------------------
          SECTION 4: TRANSPARENCY & ALPHA CHANNEL SPECIFICATION
          ----------------------------------------------------------------------
        */}
        <section aria-labelledby="transparency-guide-title" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <Palette className="w-5 h-5 text-emerald-600" />
            <h2 id="transparency-guide-title" className="text-lg sm:text-xl font-bold text-slate-900">
              Transparency &amp; Alpha Channel Handling for {sf} to {tf} Conversion
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
            {tf === 'PNG' ? (
              isOpaque ? (
                <>Source {sf} files lack an alpha channel. When you <strong className="font-semibold text-slate-800">convert {sf.toLowerCase()} to png</strong>, our engine creates an opaque master PNG and allows you to use our built-in 1-Click Background Remover to turn solid backgrounds into 8-bit transparent alpha (256 distinct levels of opacity per pixel).</>
              ) : (
                <>When you <strong className="font-semibold text-slate-800">convert {sf.toLowerCase()} to png</strong>, our converter preserves native 8-bit alpha transparency with 256 distinct levels of opacity per pixel for flawless anti-aliasing.</>
              )
            ) : (
              <>When converting from PNG to JPG, transparent areas are composited onto a solid background color (defaulting to pure white) because JPG does not support alpha channels.</>
            )}
          </p>

          <div className="my-5">
            <img
              src="/image-to-png-alpha-transparency-guide.webp"
              srcSet="/image-to-png-alpha-transparency-guide-480.webp 480w, /image-to-png-alpha-transparency-guide.webp 800w"
              sizes="(max-width: 640px) 100vw, 800px"
              alt={`${sf} to ${tf} alpha transparency guide showing transparent background`}
              width={800}
              height={450}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className="rounded-xl shadow-md border border-slate-200 w-full object-cover"
            />
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 leading-relaxed">
            <h3 className="font-bold text-emerald-900 text-sm mb-1">How Alpha Channels Function in {sf} to {tf}</h3>
            <p>{format.transparencySupport}</p>
          </div>
        </section>

        {/* 
          ----------------------------------------------------------------------
          SECTION 5: PROGRAMMATIC OS GUIDES (WINDOWS, MAC, IOS, ANDROID, LINUX)
          ----------------------------------------------------------------------
        */}
        <section aria-labelledby="os-guides-title" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <Monitor className="w-5 h-5 text-indigo-600" />
            <h2 id="os-guides-title" className="text-lg sm:text-xl font-black text-slate-900">
              Cross-Platform Guides: How to Convert {sf} to {tf} on Any Device
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
            Whether you are on a desktop workstation, laptop, tablet, or smartphone, our browser-based <strong className="font-semibold text-slate-800">{sf} to {tf} converter</strong> operates seamlessly without requiring third-party software installations, command-line dependencies, or mobile apps.
          </p>

          <div className="space-y-6">
            {osGuides.map((guide, gIdx) => (
              <div key={gIdx} className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    {guide.title}
                  </h3>
                  <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">
                    {guide.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {guide.summary}
                </p>
                <ol className="list-decimal pl-5 space-y-1 text-xs text-slate-700 leading-relaxed">
                  {guide.steps.map((st, sIdx) => (
                    <li key={sIdx}>{st}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

        {/* 
          ----------------------------------------------------------------------
          SECTION 6: PROFESSIONAL SOFTWARE & DESIGN WORKFLOWS
          ----------------------------------------------------------------------
        */}
        <section aria-labelledby="software-workflows-title" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <Workflow className="w-5 h-5 text-blue-600" />
            <h2 id="software-workflows-title" className="text-lg sm:text-xl font-black text-slate-900">
              Professional Workflows: Using Converted {sf} to {tf} in Creative Software
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
            Leading design studios, game development houses, and web agencies rely on calibrated image files for reliable cross-tool compatibility. Here is how converting <strong className="font-semibold text-slate-800">{sf} to {tf}</strong> accelerates common creative software workflows:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {softwareWorkflows.map((wf, wIdx) => (
              <div key={wIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">{wf.category}</span>
                    <span className="text-[11px] text-slate-500 font-medium">{wf.software}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-2">{wf.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">{wf.description}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-blue-50/70 border border-blue-200 text-[11px] text-blue-900">
                  <strong className="font-bold">Pro Tip: </strong>{wf.tip}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 
          ----------------------------------------------------------------------
          SECTION 7: WHY CONVERT & CORE BENEFITS
          ----------------------------------------------------------------------
        */}
        <section aria-labelledby="why-convert-title" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-5 h-5 text-blue-600" />
            <h2 id="why-convert-title" className="text-lg sm:text-xl font-bold text-slate-900">
              Why Convert {sf} to {tf}? Primary Advantages
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
            Converting your files from <strong className="font-semibold text-slate-800">{sf} to {tf}</strong> delivers immediate technical and visual benefits:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
            {format.whyConvert.map((reason, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700 leading-relaxed">{reason}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl">
              <h3 className="font-bold text-emerald-900 text-sm mb-2">Advantages of {tf} Conversion</h3>
              <ul className="space-y-1.5 text-xs text-emerald-800">
                {format.advantages.map((adv, aIdx) => (
                  <li key={aIdx} className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl">
              <h3 className="font-bold text-amber-900 text-sm mb-2">Technical Considerations</h3>
              <ul className="space-y-1.5 text-xs text-amber-800">
                {format.limitations.map((lim, lIdx) => (
                  <li key={lIdx} className="flex items-start gap-1.5">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{lim}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 
          ----------------------------------------------------------------------
          SECTION 8: LOSSLESS DEFLATE COMPRESSION & FILE SIZE MECHANICS
          ----------------------------------------------------------------------
        */}
        <section aria-labelledby="deflate-specs-title" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          <h2 id="deflate-specs-title" className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
            Compression Architecture for {sf} to {tf}
          </h2>
          <p className="text-xs text-slate-600 mb-4 leading-relaxed">
            The Portable Network Graphics standard (ISO/IEC 15948:2004) utilizes non-patented DEFLATE compression (IETF RFC 1951), combining the LZ77 sliding-window dictionary algorithm with Huffman statistical coding. When you <strong className="font-semibold text-slate-800">convert {sf} to {tf}</strong>, your visual pixels undergo mathematical transformation and verified chunk formatting without quality degradation.
          </p>

          <div className="mb-6">
            <img
              src="/image-to-png-lossless-compression-diagram.webp"
              srcSet="/image-to-png-lossless-compression-diagram-480.webp 480w, /image-to-png-lossless-compression-diagram.webp 800w"
              sizes="(max-width: 640px) 100vw, 800px"
              alt={`${sf} to ${tf} lossless compression specification`}
              width={800}
              height={450}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className="rounded-xl shadow-md border border-slate-200 w-full object-cover"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-slate-700">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm mb-1">Quality Preservation Guarantee</h3>
              <p>{format.qualityNotes}</p>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm mb-1">File Size Expectations</h3>
              <p>{format.fileSizeNotes}</p>
            </div>
          </div>
        </section>

        {/* 
          ----------------------------------------------------------------------
          SECTION 9: PRACTICAL INDUSTRY USE CASES
          ----------------------------------------------------------------------
        */}
        {format.useCases && format.useCases.length > 0 && (
          <section aria-labelledby="use-cases-title" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            <h2 id="use-cases-title" className="text-lg sm:text-xl font-bold text-slate-900 mb-4">
              Real-World Industry Use Cases for {format.sourceFormat} to PNG
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {format.useCases.map((uc, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-1">{uc.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{uc.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 
          ----------------------------------------------------------------------
          SECTION 10: TROUBLESHOOTING & COMMON ISSUES
          ----------------------------------------------------------------------
        */}
        {format.troubleshooting && format.troubleshooting.length > 0 && (
          <section aria-labelledby="troubleshooting-title" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <Wrench className="w-5 h-5 text-amber-600" />
              <h2 id="troubleshooting-title" className="text-lg sm:text-xl font-bold text-slate-900">
                Troubleshooting Common {format.sourceFormat} to PNG Conversion Issues
              </h2>
            </div>
            <div className="space-y-3">
              {format.troubleshooting.map((tb, tIdx) => (
                <div key={tIdx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{tb.issue}</h3>
                  <p className="text-slate-600 leading-relaxed">{tb.solution}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 
          ----------------------------------------------------------------------
          SECTION 11: DEVELOPER CODE RECIPES
          ----------------------------------------------------------------------
        */}
        {format.developerSnippets && format.developerSnippets.length > 0 && (
          <section aria-labelledby="dev-snippets-title" className="bg-slate-900 text-white p-5 sm:p-7 rounded-2xl shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-blue-400" />
                <h2 id="dev-snippets-title" className="text-sm sm:text-base font-bold">Developer Implementation Recipes: {format.sourceFormat} to PNG</h2>
              </div>
              <div className="flex items-center gap-1">
                {format.developerSnippets.map((s, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => setActiveSnippetIndex(sIdx)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                      activeSnippetIndex === sIdx
                        ? 'bg-blue-600 text-white font-bold'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {s.language.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-[11px] text-slate-400 mb-2">
              {format.developerSnippets[activeSnippetIndex]?.title}
            </p>

            <div className="relative">
              <pre className="p-3 rounded-lg bg-slate-950 font-mono text-[11px] text-emerald-400 overflow-x-auto border border-slate-800 leading-relaxed">
                <code>{format.developerSnippets[activeSnippetIndex]?.code}</code>
              </pre>
            </div>
          </section>
        )}

        {/* 
          ----------------------------------------------------------------------
          SECTION 12: EXTENSIVE FREQUENTLY ASKED QUESTIONS (FAQ)
          ----------------------------------------------------------------------
        */}
        <section aria-labelledby="format-faq-title" className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="text-[11px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
              FAQ
            </span>
            <h2 id="format-faq-title" className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-2">
              Frequently Asked Questions About {format.sourceFormat} to PNG Conversion
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Common questions answered about how to <strong className="font-semibold text-slate-800">convert {format.sourceFormat.toLowerCase()} to png</strong> safely and freely online.
            </p>
          </div>

          <div className="space-y-2.5">
            {format.faq.map((faq, index) => {
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
                    className="w-full p-3.5 text-left font-bold text-slate-900 flex items-center justify-between gap-3 bg-slate-50/50 hover:bg-slate-100/70 transition-colors cursor-pointer text-xs sm:text-sm"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-3.5 pb-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-2.5 bg-white">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 
          ----------------------------------------------------------------------
          SECTION 13: LONG-TAIL KEYWORDS & SEARCH QUERIES
          ----------------------------------------------------------------------
        */}
        <section aria-labelledby="longtail-title" className="p-4 sm:p-5 rounded-xl bg-slate-100/90 border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <Search className="w-4 h-4 text-slate-600" />
            <h3 id="longtail-title" className="font-bold text-slate-900 text-xs sm:text-sm">
              Popular Search Queries &amp; Long-Tail Topics: {format.sourceFormat} to PNG
            </h3>
          </div>
          <p className="text-[11px] text-slate-600 mb-2.5">
            Users frequently discover this free utility while searching for these common image conversion topics:
          </p>
          <div className="flex flex-wrap gap-1.5 text-[11px]">
            {longTailKeywords.map((kw, kIdx) => (
              <span key={kIdx} className="bg-white text-slate-700 px-2.5 py-1 rounded-md border border-slate-200 font-medium">
                {kw}
              </span>
            ))}
          </div>
        </section>

        {/* Contextual Technical Articles & External References */}
        <section className="p-4 sm:p-5 rounded-xl bg-slate-100/80 border border-slate-200">
          <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-2">
            Related Guides &amp; Specifications
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            <a
              href="/guides/png-vs-jpg"
              onClick={(e) => handleLinkClick(e, '/guides/png-vs-jpg')}
              className="p-2.5 bg-white rounded-lg border border-slate-200 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-between"
            >
              <span><strong>PNG vs JPG Guide:</strong> Lossless vs Lossy comparison</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </a>
            <a
              href="/guides/png-vs-webp"
              onClick={(e) => handleLinkClick(e, '/guides/png-vs-webp')}
              className="p-2.5 bg-white rounded-lg border border-slate-200 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-between"
            >
              <span><strong>PNG vs WebP Guide:</strong> Transparency &amp; Speed</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </a>
            <a
              href="/guides/how-to-convert-image-to-png"
              onClick={(e) => handleLinkClick(e, '/guides/how-to-convert-image-to-png')}
              className="p-2.5 bg-white rounded-lg border border-slate-200 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-between"
            >
              <span><strong>Tutorial:</strong> Step-by-Step Conversion Workflow</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </a>
            <a
              href="/guides/png-transparency"
              onClick={(e) => handleLinkClick(e, '/guides/png-transparency')}
              className="p-2.5 bg-white rounded-lg border border-slate-200 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-between"
            >
              <span><strong>Alpha Channels:</strong> Transparency Mechanics</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </a>
            <a
              href="/guides"
              onClick={(e) => handleLinkClick(e, '/guides')}
              className="p-2.5 bg-white rounded-lg border border-slate-200 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-between"
            >
              <span><strong>All Technical Guides:</strong> PNG Knowledge Base Hub</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </a>
            <a
              href="/security"
              onClick={(e) => handleLinkClick(e, '/security')}
              className="p-2.5 bg-white rounded-lg border border-slate-200 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-between"
            >
              <span><strong>Security Details:</strong> Client-side RAM safety</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </a>
            <a
              href="https://www.w3.org/TR/png/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-white rounded-lg border border-slate-200 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-between"
            >
              <span><strong>W3C PNG Standard:</strong> ISO/IEC 15948 Specification</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </section>
      </div>

      {/* Call to Action Footer Banner */}
      <section className="py-12 bg-blue-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight">
            Ready to Convert {sf} to {tf}?
          </h2>
          <p className="mt-2 text-white text-xs sm:text-sm max-w-xl mx-auto font-medium">
            Fast, private, and 100% free. Convert your {sf} files locally in your web browser now.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2.5">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                document.getElementById('image-file-input')?.click();
              }}
              className="px-5 py-2.5 rounded-xl bg-white text-blue-900 font-extrabold text-xs sm:text-sm hover:bg-blue-50 shadow-lg shadow-blue-950/20 transition-all active:scale-95 cursor-pointer"
            >
              Choose {sf} File
            </button>
            <button
              onClick={() => {
                onNavigate('/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 rounded-xl bg-blue-800 text-white font-bold text-xs sm:text-sm hover:bg-blue-900 border border-blue-400/50 transition-all cursor-pointer shadow-sm"
            >
              All In-Browser Image Converters
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
