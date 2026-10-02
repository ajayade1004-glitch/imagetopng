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
} from 'lucide-react';
import { FormatData } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { MainConverter } from '../components/MainConverter';
import { SUPPORTED_FORMATS } from '../data/formats';

// Lazy-load below-the-fold video walkthrough for 100/100 PageSpeed scores
const ImageToPngVideoWalkthrough = React.lazy(() => import('../components/ImageToPngVideoWalkthrough').then((m) => ({ default: m.ImageToPngVideoWalkthrough })));

interface FormatPageProps {
  format: FormatData;
  onNavigate: (path: string) => void;
}

export const FormatPage: React.FC<FormatPageProps> = ({ format, onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeSnippetIndex, setActiveSnippetIndex] = useState(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Schema.org FAQPage for this specific format
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
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
    name: `How to Convert ${format.sourceFormat} to PNG Online`,
    description: format.metaDescription,
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
    name: `How to Convert ${format.sourceFormat} to PNG Video Tutorial`,
    description: `Step-by-step video guide showing how to convert ${format.sourceFormat} files into lossless PNG format with transparent alpha support directly in your browser.`,
    thumbnailUrl: 'https://www.imagetopng.com/image-to-png.webp',
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
          { label: 'Image to PNG Converters', href: '/' },
          { label: `${format.sourceFormat} to PNG` },
        ]}
        onNavigate={onNavigate}
      />

      {/* 
        ========================================================================
        QUARTER 1: HERO & FORMAT CONVERTER TOOL (COMPACT & ABOVE-THE-FOLD)
        ========================================================================
      */}
      <section className="pt-2 sm:pt-4 pb-2 bg-gradient-to-b from-blue-50/60 via-slate-50 to-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          {/* Quick Technical Specs Badge Bar */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mb-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200 shadow-2xs">
              <span>{format.sourceFormat} to PNG</span>
            </span>
            <span className="font-mono text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full border border-slate-200">
              {format.magicBytes}
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

          {/* First 50 Words Opening Lead with Exact Keywords */}
          <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-normal">
            Convert your <strong className="font-bold text-slate-900">{format.sourceFormat} to PNG</strong> files easily with our free <strong className="font-bold text-slate-900">Image to PNG</strong> converter. Our in-browser <strong className="font-semibold text-slate-800">image converter to png</strong> transforms any {format.sourceFormat} picture into a lossless PNG image with transparent alpha support and zero file uploads.
          </p>

          {/* Quick Highlights */}
          <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 text-[11px] font-medium text-slate-600">
            <span className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs">
              <Zap className="w-3 h-3 text-amber-500" /> Instant Speed
            </span>
            <span className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs">
              <Palette className="w-3 h-3 text-emerald-500" /> Transparent Alpha
            </span>
            <span className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs">
              <Lock className="w-3 h-3 text-blue-500" /> 100% Private
            </span>
            <span className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs">
              <Download className="w-3 h-3 text-indigo-500" /> Batch ZIP Download
            </span>
          </div>

          {/* Interactive Converter Pre-configured for this format */}
          <div className="mt-2.5 sm:mt-3.5">
            <MainConverter sourceFormatFilter={format.sourceFormat} />
          </div>

          {/* Format Quick Switcher */}
          <div className="mt-3 max-w-4xl mx-auto text-center">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Other Popular Image to PNG Converters
            </p>
            <div className="flex flex-wrap justify-center gap-1 sm:gap-1.5">
              {SUPPORTED_FORMATS.filter((f) => f.slug !== format.slug).slice(0, 8).map((fmt) => (
                <a
                  key={fmt.slug}
                  href={`/${fmt.slug}`}
                  onClick={(e) => handleLinkClick(e, `/${fmt.slug}`)}
                  className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[11px] font-medium text-slate-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50/50 transition-colors cursor-pointer shadow-2xs"
                >
                  {fmt.sourceFormat} to PNG
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        QUARTER 2: HOW TO CONVERT + VIDEO WALKTHROUGH & WORKFLOW DIAGRAM
        ========================================================================
      */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Step-by-Step Conversion Process */}
        <section className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="text-[11px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
              Simple Steps
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-2">
              How to Convert {format.sourceFormat} to PNG in 4 Steps
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Follow these simple steps to <strong className="font-semibold text-slate-800">convert image to png format</strong> directly in your browser.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {format.conversionSteps.map((step) => (
              <div key={step.step} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-6 h-6 rounded-md bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">{step.title}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Interactive Video Walkthrough */}
          <div className="pt-6 border-t border-slate-200" id="video-tutorial">
            <div className="text-center max-w-2xl mx-auto mb-4">
              <h3 className="text-base sm:text-xl font-bold text-slate-900">
                Video Walkthrough: {format.sourceFormat} to PNG Conversion
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Watch this 12-second walkthrough showing how our <strong className="font-semibold text-slate-800">Image to PNG</strong> converter processes files safely in browser memory.
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <React.Suspense fallback={<div className="h-64 rounded-2xl bg-slate-100 animate-pulse border border-slate-200" />}>
                <ImageToPngVideoWalkthrough />
              </React.Suspense>
            </div>
          </div>

          {/* WebP Workflow Diagram */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-sm sm:text-lg font-bold text-slate-900 mb-1.5">
                {format.sourceFormat} to PNG Architecture Workflow
              </h3>
              <p className="text-xs text-slate-600 mb-3">
                See how our <strong className="font-semibold text-slate-800">image converter to png</strong> translates {format.sourceFormat} binary streams into standardized PNG containers.
              </p>
              <img
                src="/image-to-png.webp"
                srcSet="/image-to-png-480.webp 480w, /image-to-png.webp 800w"
                sizes="(max-width: 640px) 100vw, 800px"
                alt={`${format.sourceFormat} to PNG – Image to PNG converter workflow and technical pipeline`}
                width={800}
                height={450}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                className="rounded-xl shadow-md border border-slate-200 w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* 
          ========================================================================
          QUARTER 3: TECHNICAL ARCHITECTURE, TRANSPARENCY & COMPARISON
          ========================================================================
        */}
        {/* GEO Summary Answer Box */}
        <section className="p-5 sm:p-7 rounded-2xl bg-gradient-to-br from-blue-50/90 to-indigo-50/80 border border-blue-200 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-800 uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Definition &amp; Architectural Summary</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
            What is {format.sourceFormat} to PNG Conversion?
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            {format.geoDefinition}
          </p>
        </section>

        {/* Technical Architecture Deep Dive */}
        <section className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-600" />
            <span>Technical Architecture of {format.sourceFormat} Format</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
            {format.whatIsFormat}
          </p>

          {/* WebP Transparency Guide Diagram */}
          <div className="my-6">
            <img
              src="/image-to-png-alpha-transparency-guide.webp"
              srcSet="/image-to-png-alpha-transparency-guide-480.webp 480w, /image-to-png-alpha-transparency-guide.webp 800w"
              sizes="(max-width: 640px) 100vw, 800px"
              alt={`${format.sourceFormat} to PNG alpha transparency guide showing transparent background`}
              width={800}
              height={450}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className="rounded-xl shadow-md border border-slate-200 w-full object-cover"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
            <h3 className="font-bold text-slate-900 text-sm mb-1">Alpha Channel Transparency Handling</h3>
            <p>{format.transparencySupport}</p>
          </div>
        </section>

        {/* Benchmark Comparison Table */}
        {format.benchmarks && format.benchmarks.length > 0 && (
          <section className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-1.5">
              {format.sourceFormat} vs. PNG: Technical Benchmarks
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Side-by-side performance, compression fidelity, and software compatibility metrics.
            </p>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3.5">Metric</th>
                    <th className="py-2.5 px-3.5">{format.sourceFormat} Source</th>
                    <th className="py-2.5 px-3.5 text-blue-700 bg-blue-50/50">PNG Output</th>
                    <th className="py-2.5 px-3.5 text-emerald-900 font-bold">Advantage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {format.benchmarks.map((b, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-3.5 font-semibold text-slate-900">{b.metric}</td>
                      <td className="py-2.5 px-3.5 text-slate-600">{b.sourceValue}</td>
                      <td className="py-2.5 px-3.5 text-blue-700 bg-blue-50/20 font-medium">{b.pngValue}</td>
                      <td className="py-2.5 px-3.5 text-emerald-900 font-bold">{b.advantage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Why Convert to PNG? */}
        <section className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" />
            <span>Why Convert {format.sourceFormat} to PNG?</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {format.whyConvert.map((reason, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700 leading-relaxed">{reason}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 
          ========================================================================
          QUARTER 4: DEFLATE SPECS, CODE RECIPES, USE CASES & FAQS
          ========================================================================
        */}
        {/* Lossless DEFLATE Technical Diagram */}
        <section className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
            Lossless DEFLATE Compression for {format.sourceFormat}
          </h2>
          <p className="text-xs text-slate-600 mb-4">
            Learn how the Portable Network Graphics standard ensures mathematical pixel preservation when you <strong className="font-semibold text-slate-800">convert to png image</strong>.
          </p>

          <div className="mb-6">
            <img
              src="/image-to-png-lossless-compression-diagram.webp"
              srcSet="/image-to-png-lossless-compression-diagram-480.webp 480w, /image-to-png-lossless-compression-diagram.webp 800w"
              sizes="(max-width: 640px) 100vw, 800px"
              alt={`${format.sourceFormat} to PNG lossless DEFLATE compression specification`}
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
              <h3 className="font-bold text-slate-900 text-sm mb-1">Quality Preservation</h3>
              <p>{format.qualityNotes}</p>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm mb-1">File Size Expectations</h3>
              <p>{format.fileSizeNotes}</p>
            </div>
          </div>
        </section>

        {/* Practical Industry Use Cases */}
        {format.useCases && format.useCases.length > 0 && (
          <section className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">
              Practical Industry Use Cases for {format.sourceFormat} to PNG
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

        {/* Developer Code Snippets */}
        {format.developerSnippets && format.developerSnippets.length > 0 && (
          <section className="bg-slate-900 text-white p-5 sm:p-7 rounded-2xl shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-blue-400" />
                <h2 className="text-sm sm:text-base font-bold">Developer Implementation Recipes</h2>
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

        {/* Frequently Asked Questions */}
        <section className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="text-[11px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
              FAQ
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-2">
              Frequently Asked Questions About {format.sourceFormat} to PNG
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Common questions about converting {format.sourceFormat} to lossless PNG format.
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
            Ready to Convert {format.sourceFormat} to PNG?
          </h2>
          <p className="mt-2 text-white text-xs sm:text-sm max-w-xl mx-auto font-medium">
            Fast, private, and 100% free. Convert your {format.sourceFormat} files locally in your web browser now.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2.5">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                document.getElementById('image-file-input')?.click();
              }}
              className="px-5 py-2.5 rounded-xl bg-white text-blue-900 font-extrabold text-xs sm:text-sm hover:bg-blue-50 shadow-lg shadow-blue-950/20 transition-all active:scale-95 cursor-pointer"
            >
              Choose {format.sourceFormat} File
            </button>
            <button
              onClick={() => {
                onNavigate('/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 rounded-xl bg-blue-800 text-white font-bold text-xs sm:text-sm hover:bg-blue-900 border border-blue-400/50 transition-all cursor-pointer shadow-sm"
            >
              All Image to PNG Converters
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
