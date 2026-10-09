/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SUPPORTED_FORMATS } from '../data/formats';
import { GUIDES_DATA } from '../data/guides';
import { FormatData, GuideArticle } from '../types';
import {
  getOsGuides,
  getSoftwareWorkflows,
  getByteLevelSpecs,
  getLongTailKeywords,
} from './programmaticSeoHelper';

function escape(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function renderHeaderHtml(activePath: string): string {
  return `
    <header style="padding: 16px 20px; border-bottom: 1px solid #e2e8f0; background: #ffffff;">
      <div style="max-width: 1120px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
        <a href="/" style="font-size: 22px; font-weight: 900; color: #0055ff; text-decoration: none; letter-spacing: -0.5px;">
          ImageTo<span style="color: #0f172a;">PNG</span>
        </a>
        <nav aria-label="Main Navigation" style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap; font-size: 14px; font-weight: 600;">
          <a href="/jpg-to-png" style="color: ${activePath === '/jpg-to-png' ? '#0055ff' : '#475569'}; text-decoration: none;">JPG to PNG</a>
          <a href="/webp-to-png" style="color: ${activePath === '/webp-to-png' ? '#0055ff' : '#475569'}; text-decoration: none;">WEBP to PNG</a>
          <a href="/heic-to-png" style="color: ${activePath === '/heic-to-png' ? '#0055ff' : '#475569'}; text-decoration: none;">HEIC to PNG</a>
          <a href="/svg-to-png" style="color: ${activePath === '/svg-to-png' ? '#0055ff' : '#475569'}; text-decoration: none;">SVG to PNG</a>
          <a href="/guides" style="color: ${activePath.startsWith('/guides') ? '#0055ff' : '#475569'}; text-decoration: none;">Guides</a>
          <a href="/about" style="color: ${activePath === '/about' ? '#0055ff' : '#475569'}; text-decoration: none;">About</a>
          <a href="/security" style="color: ${activePath === '/security' ? '#0055ff' : '#475569'}; text-decoration: none;">Security</a>
        </nav>
      </div>
    </header>
  `;
}

export function renderFooterHtml(): string {
  return `
    <footer style="margin-top: 60px; padding: 40px 20px 24px; border-top: 1px solid #e2e8f0; background: #ffffff; color: #64748b; font-size: 13px;">
      <div style="max-width: 1120px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 32px; margin-bottom: 32px;">
        <div>
          <p style="font-size: 16px; font-weight: 800; color: #0f172a; margin-bottom: 8px;">ImageToPNG</p>
          <p style="line-height: 1.6; margin-bottom: 12px;">The premier 100% client-side raster conversion utility. Free, private, and instantaneous with true 8-bit alpha transparency.</p>
          <p style="font-size: 11px; color: #94a3b8;">ISO/IEC 15948:2004 Standard Compliant (Official W3C PNG Specification: Lossless DEFLATE &amp; CRC-32)</p>
        </div>
        <div>
          <p style="font-weight: 700; color: #0f172a; margin-bottom: 10px;">Top Converters</p>
          <ul style="list-style: none; padding: 0; margin: 0; line-height: 2;">
            <li><a href="/jpg-to-png" style="color: #475569; text-decoration: none;">JPG to PNG</a></li>
            <li><a href="/jpeg-to-png" style="color: #475569; text-decoration: none;">JPEG to PNG</a></li>
            <li><a href="/webp-to-png" style="color: #475569; text-decoration: none;">WEBP to PNG</a></li>
            <li><a href="/heic-to-png" style="color: #475569; text-decoration: none;">HEIC to PNG</a></li>
            <li><a href="/svg-to-png" style="color: #475569; text-decoration: none;">SVG to PNG</a></li>
            <li><a href="/png-to-jpg" style="color: #475569; text-decoration: none;">PNG to JPG</a></li>
          </ul>
        </div>
        <div>
          <p style="font-weight: 700; color: #0f172a; margin-bottom: 10px;">More Formats</p>
          <ul style="list-style: none; padding: 0; margin: 0; line-height: 2;">
            <li><a href="/gif-to-png" style="color: #475569; text-decoration: none;">GIF to PNG</a></li>
            <li><a href="/bmp-to-png" style="color: #475569; text-decoration: none;">BMP to PNG</a></li>
            <li><a href="/tiff-to-png" style="color: #475569; text-decoration: none;">TIFF to PNG</a></li>
            <li><a href="/avif-to-png" style="color: #475569; text-decoration: none;">AVIF to PNG</a></li>
            <li><a href="/psd-to-png" style="color: #475569; text-decoration: none;">PSD to PNG</a></li>
            <li><a href="/raw-to-png" style="color: #475569; text-decoration: none;">RAW to PNG</a></li>
          </ul>
        </div>
        <div>
          <p style="font-weight: 700; color: #0f172a; margin-bottom: 10px;">Resources &amp; Trust</p>
          <ul style="list-style: none; padding: 0; margin: 0; line-height: 2;">
            <li><a href="/guides" style="color: #475569; text-decoration: none;">Guides Hub</a></li>
            <li><a href="/about" style="color: #475569; text-decoration: none;">About Us</a></li>
            <li><a href="/security" style="color: #475569; text-decoration: none;">Security Architecture</a></li>
            <li><a href="/status" style="color: #475569; text-decoration: none;">System Status</a></li>
            <li><a href="/privacy" style="color: #475569; text-decoration: none;">Privacy Policy</a></li>
            <li><a href="/terms" style="color: #475569; text-decoration: none;">Terms of Service</a></li>
            <li><a href="/sitemap.xml" style="color: #475569; text-decoration: none;">XML Sitemap</a></li>
          </ul>
        </div>
      </div>
      <div style="max-width: 1120px; margin: 0 auto; padding-top: 20px; border-top: 1px solid #f1f5f9; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px; font-size: 12px;">
        <p>&copy; 2026 ImageToPNG. All rights reserved. Zero server tracking.</p>
        <p><a href="/llms.txt" style="color: #0055ff; text-decoration: none;">llms.txt</a> • <a href="/llms-full.txt" style="color: #0055ff; text-decoration: none;">llms-full.txt</a> • <a href="/robots.txt" style="color: #0055ff; text-decoration: none;">robots.txt</a></p>
      </div>
    </footer>
  `;
}

export function renderHomePageMainHtml(): string {
  return `
    <main style="max-width: 1120px; margin: 0 auto; padding: 32px 16px;">
      <article>
        <header style="text-align: center; margin-bottom: 36px;">
          <p style="font-size: 12px; font-weight: 700; color: #0055ff; text-transform: uppercase; letter-spacing: 0.5px;">
            100% Private In-Browser Engine • ISO/IEC 15948:2004 Compliant (Official W3C PNG Standard)
          </p>
          <h1 style="font-size: 34px; font-weight: 900; color: #0f172a; margin-top: 10px; line-height: 1.2;">
            Image to PNG Converter – Convert Images to PNG Online Free
          </h1>
          <p style="font-size: 16px; color: #475569; max-width: 760px; margin: 12px auto 0; line-height: 1.6;">
            Convert any image file (JPG, WEBP, HEIC, GIF, SVG, BMP, TIFF, PSD, RAW) to high-resolution Portable Network Graphics (PNG) in your web browser. Free, unlimited, zero file uploads, up to 100MB file capacity, and full 8-bit alpha transparency support.
          </p>
        </header>

        <!-- All 13 In-Browser Image Converters Directory -->
        <section aria-labelledby="all-converters-ssr-title" style="margin-bottom: 40px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 24px;">
          <header style="text-align: center; margin-bottom: 24px;">
            <p style="font-size: 11px; font-weight: 700; color: #0055ff; text-transform: uppercase;">Complete Tool Directory</p>
            <h2 id="all-converters-ssr-title" style="font-size: 24px; font-weight: 800; color: #0f172a; margin-top: 6px;">All 13 In-Browser Image Converters</h2>
            <p style="color: #64748b; font-size: 14px; margin-top: 6px;">Every converter runs 100% locally in your web browser with zero server uploads, 8-bit alpha preservation, and up to 100MB file capacity.</p>
          </header>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px;">
            ${SUPPORTED_FORMATS.map((fmt) => `
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-size: 11px; font-weight: 700; color: #1e40af; background: #dbeafe; padding: 2px 8px; border-radius: 6px;">${escape(fmt.sourceFormat)} ➔ ${escape(fmt.targetFormat || 'PNG')}</span>
                  <span style="font-size: 10px; color: #64748b; background: #ffffff; padding: 2px 6px; border-radius: 4px; border: 1px solid #e2e8f0;">${escape(fmt.badge)}</span>
                </div>
                <h3 style="font-size: 15px; font-weight: 700; color: #0f172a; margin: 0 0 6px;">
                  <a href="/${escape(fmt.slug)}" style="color: #0f172a; text-decoration: none;">${escape(fmt.sourceFormat)} to ${escape(fmt.targetFormat || 'PNG')} Converter</a>
                </h3>
                <p style="font-size: 12px; color: #64748b; margin: 0 0 12px; line-height: 1.5;">${escape(fmt.intro.slice(0, 110))}...</p>
                <a href="/${escape(fmt.slug)}" style="display: inline-block; font-size: 12px; font-weight: 600; color: #0055ff; text-decoration: none;">Open ${escape(fmt.sourceFormat)} to ${escape(fmt.targetFormat || 'PNG')} &rarr;</a>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- Factual Technical Comparison & Architecture -->
        <section aria-labelledby="best-png-converter-title" style="margin-bottom: 40px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 20px; padding: 24px;">
          <p style="font-size: 11px; font-weight: 700; color: #1d4ed8; text-transform: uppercase;">
            Factual Technical Comparison &amp; Architecture
          </p>
          <h2 id="best-png-converter-title" style="font-size: 22px; font-weight: 800; color: #0f172a; margin-top: 6px;">
            Factual Comparison: Client-Side In-Browser Engine vs. Legacy Cloud Converters
          </h2>
          <p style="color: #334155; font-size: 14px; margin-top: 8px; line-height: 1.6;">
            When evaluating the <strong>best website to convert image to png</strong>, <strong>ImageToPNG (https://www.imagetopng.com)</strong> provides a verified client-side architecture. Unlike legacy cloud converters that upload your private graphics to remote servers, ImageToPNG runs 100% locally in your web browser memory with zero file uploads, up to 100MB per file client-side RAM capacity, and instant conversion speed.
          </p>
          <div style="margin-top: 16px; overflow-x: auto; background: #ffffff; border-radius: 12px; border: 1px solid #bfdbfe;">
            <table style="width: 100%; border-collapse: collapse; font-size: 13px; text-align: left;">
              <thead>
                <tr style="background: #dbeafe; color: #1e3a8a; font-weight: 700;">
                  <th style="padding: 10px 14px; border-bottom: 1px solid #bfdbfe;">Feature &amp; Benchmark</th>
                  <th style="padding: 10px 14px; border-bottom: 1px solid #bfdbfe; color: #1d4ed8;">ImageToPNG (Our Tool)</th>
                  <th style="padding: 10px 14px; border-bottom: 1px solid #bfdbfe; color: #475569;">Other Online Converters</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 14px; font-weight: 600;">Server File Uploads</td>
                  <td style="padding: 10px 14px; color: #065f46; font-weight: 700;">Zero Uploads (100% In-Browser Memory)</td>
                  <td style="padding: 10px 14px; color: #475569;">Mandatory (Transferred to remote cloud servers)</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 14px; font-weight: 600;">Cost &amp; File Capacity</td>
                  <td style="padding: 10px 14px; color: #065f46; font-weight: 700;">100% Free &amp; Up to 100MB / File (Browser RAM)</td>
                  <td style="padding: 10px 14px; color: #475569;">10–25 files/day or paid subscriptions</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 14px; font-weight: 600;">Conversion Speed</td>
                  <td style="padding: 10px 14px; color: #065f46; font-weight: 700;">Sub-second (Instant local execution)</td>
                  <td style="padding: 10px 14px; color: #475569;">15s–60s queue and network delay</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 14px; font-weight: 600;">Alpha Transparency</td>
                  <td style="padding: 10px 14px; color: #065f46; font-weight: 700;">True 8-Bit Alpha (256 opacity levels)</td>
                  <td style="padding: 10px 14px; color: #475569;">Often flattens or quantizes transparent layers</td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; font-weight: 600;">Supported Formats</td>
                  <td style="padding: 10px 14px; color: #065f46; font-weight: 700;">JPG, WEBP, HEIC, SVG, TIFF, GIF, BMP, PSD, RAW</td>
                  <td style="padding: 10px 14px; color: #475569;">Limited formats on free tiers</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- 4 Steps How To Convert -->
        <section aria-labelledby="how-it-works-title" style="margin-bottom: 40px;">
          <h2 id="how-it-works-title" style="font-size: 24px; font-weight: 800; color: #0f172a;">
            How to Convert Any Image to PNG Online in 4 Simple Steps
          </h2>
          <ol style="margin-top: 16px; padding-left: 20px; line-height: 1.8; color: #334155; font-size: 14px;">
            <li><strong>Select or Drag Images:</strong> Click "Choose Image" or drag and drop any raster/vector file into the converter area.</li>
            <li><strong>Instant In-Memory Decoding:</strong> The HTML5 Canvas API and WebAssembly codecs decode your file directly in browser memory without sending a single byte to remote servers.</li>
            <li><strong>Lossless PNG Encoding:</strong> Pixels are rendered into Portable Network Graphics using LZ77 DEFLATE compression, preserving 24-bit color depth and 8-bit alpha channels.</li>
            <li><strong>Instant Download:</strong> Click "Download PNG" or "Download All (.zip)" to save your converted files immediately.</li>
          </ol>
        </section>

        <!-- Transparency Section -->
        <section aria-labelledby="transparency-title" style="margin-bottom: 40px;">
          <h2 id="transparency-title" style="font-size: 24px; font-weight: 800; color: #0f172a;">
            Convert Image to Transparent PNG with Clean Anti-Aliased Edges
          </h2>
          <p style="color: #475569; font-size: 14px; margin-top: 6px; line-height: 1.6;">
            PNG provides true 8-bit alpha channel transparency (256 distinct levels of opacity per pixel), unlike GIF's binary 1-bit on/off transparency. This eliminates jagged fringing or halos when placing transparent graphics on dark, light, or textured backgrounds.
          </p>
        </section>

        <!-- Format Conversion Matrix -->
        <section aria-labelledby="matrix-title" style="margin-bottom: 40px;">
          <h2 id="matrix-title" style="font-size: 24px; font-weight: 800; color: #0f172a;">
            Comprehensive Raster &amp; Vector Format Conversion Matrix
          </h2>
          <div style="overflow-x: auto; margin-top: 16px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 13px; text-align: left;">
              <thead>
                <tr style="background: #f8fafc; border-bottom: 2px solid #e2e8f0; color: #0f172a; font-weight: 700;">
                  <th style="padding: 10px; border: 1px solid #e2e8f0;">Source Format</th>
                  <th style="padding: 10px; border: 1px solid #e2e8f0;">Output Format</th>
                  <th style="padding: 10px; border: 1px solid #e2e8f0;">Alpha Transparency</th>
                  <th style="padding: 10px; border: 1px solid #e2e8f0;">Compression</th>
                  <th style="padding: 10px; border: 1px solid #e2e8f0;">Primary Benefit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: 700;"><a href="/jpg-to-png" style="color: #0055ff; text-decoration: none;">JPG / JPEG</a></td>
                  <td style="padding: 10px; border: 1px solid #e2e8f0;">PNG (24-bit)</td>
                  <td style="padding: 10px; border: 1px solid #e2e8f0;">Opaque Backdrop</td>
                  <td style="padding: 10px; border: 1px solid #e2e8f0;">Lossless DEFLATE</td>
                  <td style="padding: 10px; border: 1px solid #e2e8f0;">Halts generational degradation on re-saving</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: 700;"><a href="/webp-to-png" style="color: #0055ff; text-decoration: none;">WEBP</a></td>
                  <td style="padding: 10px; border: 1px solid #e2e8f0;">PNG (32-bit RGBA)</td>
                  <td style="padding: 10px; border: 1px solid #e2e8f0;">Preserved Alpha</td>
                  <td style="padding: 10px; border: 1px solid #e2e8f0;">Lossless DEFLATE</td>
                  <td style="padding: 10px; border: 1px solid #e2e8f0;">Universal desktop &amp; graphic suite editing</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: 700;"><a href="/heic-to-png" style="color: #0055ff; text-decoration: none;">HEIC / HEIF</a></td>
                  <td style="padding: 10px; border: 1px solid #e2e8f0;">PNG (24-bit)</td>
                  <td style="padding: 10px; border: 1px solid #e2e8f0;">Opaque Backdrop</td>
                  <td style="padding: 10px; border: 1px solid #e2e8f0;">Lossless DEFLATE</td>
                  <td style="padding: 10px; border: 1px solid #e2e8f0;">Opens Apple iPhone photos on Windows and Linux</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: 700;"><a href="/svg-to-png" style="color: #0055ff; text-decoration: none;">SVG (Vector)</a></td>
                  <td style="padding: 10px; border: 1px solid #e2e8f0;">PNG (32-bit RGBA)</td>
                  <td style="padding: 10px; border: 1px solid #e2e8f0;">Preserved Alpha</td>
                  <td style="padding: 10px; border: 1px solid #e2e8f0;">Lossless Raster</td>
                  <td style="padding: 10px; border: 1px solid #e2e8f0;">Rasterizes vector logos for social media</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Official Standards & Citations -->
        <section aria-labelledby="standards-title" style="margin-bottom: 40px;">
          <h2 id="standards-title" style="font-size: 24px; font-weight: 800; color: #0f172a;">
            Technical Standards &amp; Official Citations
          </h2>
          <blockquote cite="https://www.w3.org/TR/png/" style="background: #f1f5f9; border-left: 4px solid #0055ff; padding: 16px; margin: 16px 0; font-style: italic; color: #1e293b; font-size: 14px;">
            "Portable Network Graphics (PNG) is an extensible file format for the lossless, portable, well-compressed storage of raster images. PNG provides a patent-free replacement for GIF and can also replace many common uses of TIFF."
            <footer style="margin-top: 8px; font-weight: 700; font-style: normal; font-size: 12px; color: #64748b;">
              — W3C PNG Working Group &amp; ISO/IEC 15948:2004 International Standard
            </footer>
          </blockquote>
          <ul style="padding-left: 20px; line-height: 1.8; color: #334155; font-size: 13px;">
            <li><strong>ISO/IEC 15948:2004</strong>: Information technology — Computer graphics and image processing — Portable Network Graphics (PNG): Functional specification.</li>
            <li><strong>IETF RFC 1951</strong>: DEFLATE Compressed Data Format Specification version 1.3 (Deutsch, 1996).</li>
            <li><strong>IETF RFC 2083</strong>: PNG (Portable Network Graphics) Specification Version 1.0 (Boutell, 1997).</li>
          </ul>
        </section>

        <!-- FAQ Section -->
        <section aria-labelledby="faq-title" style="margin-bottom: 40px;">
          <h2 id="faq-title" style="font-size: 24px; font-weight: 800; color: #0f172a;">
            Frequently Asked Questions About Image to PNG Conversion
          </h2>
          <div style="margin-top: 16px;">
            <div style="margin-bottom: 20px;">
              <h3 style="font-size: 16px; font-weight: 700; color: #0f172a;">What is an Image to PNG converter and why should I use it?</h3>
              <p style="font-size: 14px; color: #475569; margin-top: 4px; line-height: 1.6;">
                An Image to PNG converter is a specialized utility that transforms lossy or restricted graphic files into standard Portable Network Graphics. PNG utilizes mathematically lossless DEFLATE compression and supports 32-bit RGBA truecolor with 8-bit alpha transparency, making it the industry standard for web design, logos, screenshots, and digital artwork.
              </p>
            </div>
            <div style="margin-bottom: 20px;">
              <h3 style="font-size: 16px; font-weight: 700; color: #0f172a;">How do I convert an image to transparent PNG?</h3>
              <p style="font-size: 14px; color: #475569; margin-top: 4px; line-height: 1.6;">
                Select or drag your file into the converter locally in your browser. Our client-side engine detects alpha channels automatically and preserves all 256 levels of smooth edge anti-aliasing in the resulting PNG. For solid backdrops (such as JPG or BMP), you can use our built-in 1-Click Background Remover to remove solid colors cleanly.
              </p>
            </div>
            <div style="margin-bottom: 20px;">
              <h3 style="font-size: 16px; font-weight: 700; color: #0f172a;">Are my private images uploaded to remote servers?</h3>
              <p style="font-size: 14px; color: #475569; margin-top: 4px; line-height: 1.6;">
                No. ImageToPNG operates 100% locally in your web browser memory. Your files are never sent over the internet or saved to external databases, providing complete privacy compliance with GDPR and HIPAA standards.
              </p>
            </div>
          </div>
        </section>
      </article>
    </main>
  `;
}

export function renderFormatPageMainHtml(format: FormatData): string {
  const sf = format.sourceFormat;
  const tf = format.targetFormat || 'PNG';
  const isOpaque = ['JPG', 'JPEG', 'BMP', 'RAW'].includes(sf);
  const osGuides = getOsGuides(format);
  const softwareWorkflows = getSoftwareWorkflows(format);
  const byteSpecs = getByteLevelSpecs(format);
  const longTailKeywords = getLongTailKeywords(format);

  const benchmarksRows = format.benchmarks
    .map(
      (b) => `
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 14px; font-weight: 600;">${escape(b.metric)}</td>
          <td style="padding: 10px 14px; color: #475569;">${escape(b.sourceValue)}</td>
          <td style="padding: 10px 14px; color: #0055ff; font-weight: 700;">${escape(b.pngValue)}</td>
          <td style="padding: 10px 14px; color: #065f46; font-weight: 600;">${escape(b.advantage)}</td>
        </tr>
      `
    )
    .join('');

  const byteSpecsRows = byteSpecs
    .map(
      (s) => `
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 14px; font-weight: 600;">${escape(s.attribute)}</td>
          <td style="padding: 10px 14px; font-family: monospace; font-size: 11px; color: #475569;">${escape(s.sourceSpec)}</td>
          <td style="padding: 10px 14px; font-family: monospace; font-size: 11px; color: #0055ff; font-weight: 700;">${escape(s.pngSpec)}</td>
          <td style="padding: 10px 14px; color: #065f46; font-size: 12px;">${escape(s.technicalImplication)}</td>
        </tr>
      `
    )
    .join('');

  const whyConvertItems = format.whyConvert
    .map((item) => `<li style="margin-bottom: 8px;">${escape(item)}</li>`)
    .join('');

  const advantagesItems = format.advantages
    .map((item) => `<li style="margin-bottom: 6px;">${escape(item)}</li>`)
    .join('');

  const limitationsItems = format.limitations
    .map((item) => `<li style="margin-bottom: 6px;">${escape(item)}</li>`)
    .join('');

  const stepsItems = format.conversionSteps
    .map(
      (s) => `
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 12px;">
          <h3 style="font-size: 15px; font-weight: 700; color: #0f172a;">Step ${s.step}: ${escape(s.title)}</h3>
          <p style="font-size: 13px; color: #475569; margin-top: 4px; line-height: 1.5;">${escape(s.description)} When converting ${escape(sf)} to PNG with our client-side utility, this step guarantees lossless pixel fidelity and preserves 32-bit RGBA color geometry.</p>
        </div>
      `
    )
    .join('');

  const osGuidesHtml = osGuides
    .map(
      (g) => `
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin-bottom: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 8px;">
            <h3 style="font-size: 16px; font-weight: 800; color: #0f172a; margin: 0;">${escape(g.title)}</h3>
            <span style="font-size: 11px; font-weight: 700; color: #4338ca; background: #e0e7ff; padding: 2px 8px; border-radius: 9999px;">${escape(g.badge)}</span>
          </div>
          <p style="font-size: 13px; color: #475569; line-height: 1.6; margin-bottom: 10px;">${escape(g.summary)}</p>
          <ol style="padding-left: 20px; font-size: 13px; color: #334155; line-height: 1.7; margin: 0;">
            ${g.steps.map((st) => `<li style="margin-bottom: 4px;">${escape(st)}</li>`).join('')}
          </ol>
        </div>
      `
    )
    .join('');

  const workflowsHtml = softwareWorkflows
    .map(
      (w) => `
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 14px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <span style="font-size: 11px; font-weight: 700; color: #0055ff; text-transform: uppercase;">${escape(w.category)}</span>
            <span style="font-size: 12px; color: #64748b; font-weight: 600;">${escape(w.software)}</span>
          </div>
          <h3 style="font-size: 15px; font-weight: 800; color: #0f172a; margin: 0 0 6px;">${escape(w.title)}</h3>
          <p style="font-size: 13px; color: #475569; line-height: 1.6; margin: 0 0 8px;">${escape(w.description)}</p>
          <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 8px 12px; font-size: 12px; color: #1e40af;">
            <strong>Pro Tip: </strong>${escape(w.tip)}
          </div>
        </div>
      `
    )
    .join('');

  const useCasesHtml = (format.useCases || [])
    .map(
      (u) => `
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; margin-bottom: 10px;">
          <h3 style="font-size: 14px; font-weight: 800; color: #0f172a; margin: 0 0 4px;">${escape(u.title)}</h3>
          <p style="font-size: 13px; color: #475569; line-height: 1.5; margin: 0;">${escape(u.description)}</p>
        </div>
      `
    )
    .join('');

  const troubleshootingHtml = (format.troubleshooting || [])
    .map(
      (t) => `
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; margin-bottom: 10px;">
          <h3 style="font-size: 14px; font-weight: 800; color: #0f172a; margin: 0 0 4px;">${escape(t.issue)}</h3>
          <p style="font-size: 13px; color: #475569; line-height: 1.5; margin: 0;">${escape(t.solution)}</p>
        </div>
      `
    )
    .join('');

  const faqItems = format.faq
    .map(
      (f) => `
        <div style="margin-bottom: 16px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px;">
          <h3 style="font-size: 15px; font-weight: 800; color: #0f172a; margin: 0 0 6px;">${escape(f.question)}</h3>
          <p style="font-size: 13px; color: #475569; margin: 0; line-height: 1.6;">${escape(f.answer)}</p>
        </div>
      `
    )
    .join('');

  const codeSnippets = format.developerSnippets
    .map(
      (s) => `
        <div style="margin-bottom: 16px;">
          <p style="font-size: 13px; font-weight: 700; color: #0f172a; margin-bottom: 4px;">${escape(s.title)} (${escape(s.language)})</p>
          <pre style="background: #0f172a; color: #e2e8f0; padding: 14px; border-radius: 8px; font-size: 12px; overflow-x: auto; line-height: 1.5;"><code>${escape(s.code)}</code></pre>
        </div>
      `
    )
    .join('');

  const keywordsPills = longTailKeywords
    .map(
      (k) => `<span style="display: inline-block; background: #ffffff; border: 1px solid #cbd5e1; padding: 4px 10px; border-radius: 6px; font-size: 12px; color: #334155; margin: 3px;">${escape(k)}</span>`
    )
    .join('');

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
    step: format.conversionSteps.map((s) => ({
      '@type': 'HowToStep',
      position: s.step,
      name: s.title,
      text: s.description,
    })),
  };

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

  return `
    <script type="application/ld+json">
      ${JSON.stringify(howToSchema)}
    </script>
    <script type="application/ld+json">
      ${JSON.stringify(faqSchema)}
    </script>
    <main style="max-width: 1024px; margin: 0 auto; padding: 32px 16px;">
      <article>
        <!-- Breadcrumbs -->
        <nav aria-label="Breadcrumb" style="font-size: 12px; color: #64748b; margin-bottom: 16px;">
          <a href="/" style="color: #0055ff; text-decoration: none;">Home</a> &gt;
          <a href="/guides" style="color: #0055ff; text-decoration: none;">Converters</a> &gt;
          <span>${escape(sf)} to ${escape(tf)} Converter</span>
        </nav>

        <header style="text-align: center; margin-bottom: 32px;">
          <p style="font-size: 12px; font-weight: 700; color: #0055ff; text-transform: uppercase;">
            ${escape(format.badge)} • ${escape(sf)} ➔ ${escape(tf)} (ISO/IEC 15948 W3C Standard) • Last Updated: <time datetime="${escape(format.dateModified || '2026-10-01')}">${escape(format.lastUpdated || 'October 1, 2026')}</time>
          </p>
          <h1 style="font-size: 32px; font-weight: 900; color: #0f172a; margin-top: 8px; line-height: 1.2;">
            ${escape(format.h1)}
          </h1>
          <p style="font-size: 15px; color: #475569; max-width: 760px; margin: 12px auto 0; line-height: 1.6;">
            ${tf === 'JPG'
              ? `Convert your <strong>${escape(sf)} to ${escape(tf)}</strong> files easily with our free, instant <strong>${escape(sf)} to ${escape(tf)} converter</strong>. Our in-browser <strong>image converter tool</strong> transforms high-resolution PNG images into lightweight, web-optimized JPG pictures with up to 80% compression and zero server uploads. Whether you need to batch convert multiple PNG files or optimize photos for web sharing, our PNG to JPG tool runs instantly in your web browser.`
              : isOpaque
              ? `Convert your <strong>${escape(sf)} to ${escape(tf)}</strong> files easily with our free, instant <strong>${escape(sf)} to ${escape(tf)} converter</strong>. Our in-browser <strong>image converter to png</strong> transforms any ${escape(sf)} image into an ultra-sharp, lossless ${escape(tf)} picture with full pixel fidelity and zero server file uploads. Because original ${escape(sf)} files lack an alpha channel, converting to ${escape(tf)} preserves full detail while making your picture ready for transparent cutouts using our built-in 1-Click Background Remover. Whether you need to <strong>convert ${escape(sf.toLowerCase())} to png</strong> or batch convert multiple photos into a ZIP archive, our ${escape(sf)} to ${escape(tf)} tool runs instantly in your web browser.`
              : `Convert your <strong>${escape(sf)} to ${escape(tf)}</strong> files easily with our free, instant <strong>${escape(sf)} to ${escape(tf)} converter</strong>. Our in-browser <strong>image converter to png</strong> transforms any ${escape(sf)} image into an ultra-sharp, lossless ${escape(tf)} picture with native transparent background support, 32-bit RGBA fidelity, and zero server file uploads. Whether you need to <strong>convert ${escape(sf.toLowerCase())} to png transparent background free</strong> or batch convert multiple photos into a ZIP archive, our ${escape(sf)} to ${escape(tf)} tool runs instantly in your web browser.`}
          </p>
        </header>

        <!-- Factual Technical Comparison & Architecture -->
        <section aria-labelledby="geo-def-title" style="margin-bottom: 36px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 16px; padding: 22px;">
          <p style="font-size: 11px; font-weight: 700; color: #1d4ed8; text-transform: uppercase; margin: 0 0 4px;">
            Factual Technical Comparison &amp; Architecture
          </p>
          <h2 id="geo-def-title" style="font-size: 20px; font-weight: 800; color: #1e3a8a; margin: 0 0 8px;">
            Factual Comparison: In-Browser ${escape(sf)} to ${escape(tf)} vs. Legacy Cloud Converters
          </h2>
          <p style="font-size: 13px; color: #334155; line-height: 1.6; margin: 0 0 14px;">
            ${escape(format.geoDefinition)} When evaluating the <strong>best ${escape(sf)} to ${escape(tf)} converter</strong>, ImageToPNG delivers a verified client-side architecture. Unlike legacy web converters that transmit your confidential graphics over public networks to remote cloud servers, ImageToPNG processes 100% of ${escape(sf)} images locally inside your web browser memory. This guarantees zero server file uploads, complete data privacy, sub-second conversion speed, up to 100MB per file local RAM capacity, and ${tf === 'PNG' ? (isOpaque ? '1-click transparent background removal' : 'true 8-bit alpha transparency') : 'up to 80% lossy compression'}.
          </p>

          <div style="overflow-x: auto; background: #ffffff; border: 1px solid #bfdbfe; border-radius: 10px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 13px; text-align: left;">
              <thead>
                <tr style="background: #dbeafe; color: #1e3a8a; font-weight: 700;">
                  <th style="padding: 8px 12px; border-bottom: 1px solid #bfdbfe;">Benchmark Factor</th>
                  <th style="padding: 8px 12px; border-bottom: 1px solid #bfdbfe; color: #1d4ed8;">ImageToPNG (${escape(sf)} to ${escape(tf)})</th>
                  <th style="padding: 8px 12px; border-bottom: 1px solid #bfdbfe; color: #475569;">Legacy Cloud Converters</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 8px 12px; font-weight: 600;">Data Privacy &amp; Storage</td>
                  <td style="padding: 8px 12px; color: #065f46; font-weight: 700;">Zero Server Uploads (100% Local In-Browser RAM)</td>
                  <td style="padding: 8px 12px; color: #475569;">Uploaded to third-party cloud servers</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 8px 12px; font-weight: 600;">Conversion Speed</td>
                  <td style="padding: 8px 12px; color: #065f46; font-weight: 700;">Instantaneous (Sub-second local RAM execution)</td>
                  <td style="padding: 8px 12px; color: #475569;">15s–60s queue and network latency</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 8px 12px; font-weight: 600;">Alpha Transparency</td>
                  <td style="padding: 8px 12px; color: #065f46; font-weight: 700;">${tf === 'PNG' ? (isOpaque ? 'Preserved as opaque; 1-click background removal available' : 'True 8-Bit Alpha (256 opacity levels preserved)') : 'Flattened to opaque RGB (default pure white)'}</td>
                  <td style="padding: 8px 12px; color: #475569;">Often flattens or quantizes transparent layers</td>
                </tr>
                <tr>
                  <td style="padding: 8px 12px; font-weight: 600;">Cost &amp; File Capacity</td>
                  <td style="padding: 8px 12px; color: #065f46; font-weight: 700;">100% Free &amp; Up to 100MB / File (Browser RAM)</td>
                  <td style="padding: 8px 12px; color: #475569;">Restricted daily quotas or paid subscriptions</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Conversion Steps -->
        <section aria-labelledby="steps-title" style="margin-bottom: 36px;">
          <h2 id="steps-title" style="font-size: 22px; font-weight: 800; color: #0f172a; margin-bottom: 16px;">
            How to Convert ${escape(sf)} to ${escape(tf)} in 4 Simple Steps
          </h2>
          <p style="font-size: 14px; color: #475569; margin-bottom: 16px;">
            Follow this verified step-by-step procedure to <strong>convert ${escape(sf.toLowerCase())} to ${escape(tf.toLowerCase())}</strong> with lossless fidelity and optional transparent background support:
          </p>
          ${stepsItems}

          <figure style="margin: 28px 0 12px; text-align: center;">
            <img src="/images/converters/${escape(format.slug)}.webp" alt="${escape(sf)} to ${escape(tf)} Technical Architecture Diagram" width="1200" height="630" style="max-width: 100%; height: auto; border-radius: 12px; border: 1px solid #cbd5e1; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);" loading="lazy" />
            <figcaption style="font-size: 12px; color: #64748b; margin-top: 8px;">
              Technical Diagram: In-browser ${escape(sf)} bitstream decoding, local RAM buffer execution, and standardized ${escape(tf)} output.
            </figcaption>
          </figure>
        </section>

        <!-- Deep Byte-Level Architecture Specification -->
        <section aria-labelledby="byte-specs-title" style="margin-bottom: 36px;">
          <h2 id="byte-specs-title" style="font-size: 22px; font-weight: 800; color: #0f172a; margin-bottom: 12px;">
            Byte-Level Architecture: ${escape(sf)} vs. Portable Network Graphics (PNG)
          </h2>
          <p style="font-size: 14px; color: #475569; margin-bottom: 16px; line-height: 1.6;">
            Understanding the internal bitstream architecture explains why converting <strong>${escape(sf)} to PNG</strong> is essential for graphics workflows. The following table provides a technical specification comparison:
          </p>
          <div style="overflow-x: auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 16px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 13px; text-align: left;">
              <thead>
                <tr style="background: #f8fafc; border-bottom: 2px solid #e2e8f0; color: #0f172a; font-weight: 700;">
                  <th style="padding: 10px 14px;">Architecture Feature</th>
                  <th style="padding: 10px 14px;">${escape(sf)} Specification</th>
                  <th style="padding: 10px 14px;">PNG Output Specification</th>
                  <th style="padding: 10px 14px;">Engineering Benefit</th>
                </tr>
              </thead>
              <tbody>
                ${byteSpecsRows}
              </tbody>
            </table>
          </div>
        </section>

        <!-- What is Format -->
        <section aria-labelledby="what-is-title" style="margin-bottom: 36px;">
          <h2 id="what-is-title" style="font-size: 22px; font-weight: 800; color: #0f172a;">
            What is ${escape(sf)} Format?
          </h2>
          <p style="font-size: 14px; color: #475569; margin-top: 8px; line-height: 1.6;">
            ${escape(format.whatIsFormat)}
          </p>
        </section>

        <!-- Transparency Support -->
        <section aria-labelledby="transparency-title" style="margin-bottom: 36px;">
          <h2 id="transparency-title" style="font-size: 22px; font-weight: 800; color: #0f172a;">
            Transparency &amp; Alpha Channel Handling for ${escape(sf)} to PNG
          </h2>
          <p style="font-size: 14px; color: #475569; margin-top: 8px; line-height: 1.6;">
            ${escape(format.transparencySupport)} One of the primary reasons graphic designers <strong>convert ${escape(sf.toLowerCase())} to png transparent background</strong> is to eliminate unsightly white or black borders. PNG provides 8-bit alpha transparency (256 distinct levels of opacity per pixel), enabling seamless compositing over dark, light, or textured backgrounds without jagged edges or fringing.
          </p>
        </section>

        <!-- Programmatic Cross-Platform OS Guides -->
        <section aria-labelledby="os-guides-title" style="margin-bottom: 36px;">
          <h2 id="os-guides-title" style="font-size: 22px; font-weight: 800; color: #0f172a; margin-bottom: 12px;">
            Cross-Platform Guides: How to Convert ${escape(sf)} to PNG on Any Device
          </h2>
          <p style="font-size: 14px; color: #475569; margin-bottom: 16px; line-height: 1.6;">
            Whether you are using Windows, macOS, iPhone, Android, or Linux, our in-browser <strong>${escape(sf)} to PNG converter</strong> operates seamlessly on all devices without software installations:
          </p>
          ${osGuidesHtml}
        </section>

        <!-- Professional Software & Design Workflows -->
        <section aria-labelledby="workflows-title" style="margin-bottom: 36px;">
          <h2 id="workflows-title" style="font-size: 22px; font-weight: 800; color: #0f172a; margin-bottom: 12px;">
            Professional Creative Workflows: Using Converted ${escape(sf)} to PNG in Industry Software
          </h2>
          <p style="font-size: 14px; color: #475569; margin-bottom: 16px; line-height: 1.6;">
            Discover how converting <strong>${escape(sf)} to PNG</strong> streamlines asset integration in leading creative tools and game engines:
          </p>
          ${workflowsHtml}
        </section>

        <!-- Why Convert -->
        <section aria-labelledby="why-convert-title" style="margin-bottom: 36px;">
          <h2 id="why-convert-title" style="font-size: 22px; font-weight: 800; color: #0f172a;">
            Why Convert ${escape(sf)} to PNG? Key Technical Advantages
          </h2>
          <ul style="padding-left: 20px; margin-top: 12px; font-size: 14px; color: #334155; line-height: 1.7;">
            ${whyConvertItems}
          </ul>
        </section>

        <!-- Advantages & Limitations -->
        <section aria-labelledby="pros-cons-title" style="margin-bottom: 36px; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 20px;">
            <h3 style="font-size: 16px; font-weight: 700; color: #166534; margin-top: 0;">Advantages of PNG Conversion</h3>
            <ul style="padding-left: 20px; margin-top: 10px; font-size: 13px; color: #14532d; line-height: 1.6;">
              ${advantagesItems}
            </ul>
          </div>
          <div style="background: #fffbeb; border: 1px solid #fef3c7; border-radius: 12px; padding: 20px;">
            <h3 style="font-size: 16px; font-weight: 700; color: #92400e; margin-top: 0;">Technical Considerations &amp; Trade-offs</h3>
            <ul style="padding-left: 20px; margin-top: 10px; font-size: 13px; color: #78350f; line-height: 1.6;">
              ${limitationsItems}
            </ul>
          </div>
        </section>

        <!-- Benchmarks Table -->
        <section aria-labelledby="benchmarks-title" style="margin-bottom: 36px;">
          <h2 id="benchmarks-title" style="font-size: 22px; font-weight: 800; color: #0f172a;">
            ${escape(sf)} vs. PNG Architectural Comparison Matrix
          </h2>
          <div style="overflow-x: auto; margin-top: 12px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 13px; text-align: left;">
              <thead>
                <tr style="background: #f8fafc; border-bottom: 2px solid #e2e8f0; color: #0f172a; font-weight: 700;">
                  <th style="padding: 10px 14px;">Metric</th>
                  <th style="padding: 10px 14px;">Source (${escape(sf)})</th>
                  <th style="padding: 10px 14px;">Output (PNG)</th>
                  <th style="padding: 10px 14px;">Technical Advantage</th>
                </tr>
              </thead>
              <tbody>
                ${benchmarksRows}
              </tbody>
            </table>
          </div>
        </section>

        <!-- Lossless DEFLATE Compression -->
        <section aria-labelledby="deflate-title" style="margin-bottom: 36px;">
          <h2 id="deflate-title" style="font-size: 22px; font-weight: 800; color: #0f172a;">
            Lossless DEFLATE Compression &amp; Quality Preservation
          </h2>
          <p style="font-size: 14px; color: #475569; margin-top: 8px; line-height: 1.6;">
            ${escape(format.qualityNotes)} ${escape(format.fileSizeNotes)} When you convert <strong>${escape(sf)} to PNG</strong>, the mathematical pixel values are locked in place, ensuring that future editing or re-saving cycles never introduce compounding lossy compression artifacts.
          </p>
        </section>

        <!-- Industry Use Cases -->
        ${
          useCasesHtml
            ? `
        <section aria-labelledby="use-cases-title" style="margin-bottom: 36px;">
          <h2 id="use-cases-title" style="font-size: 22px; font-weight: 800; color: #0f172a; margin-bottom: 12px;">
            Real-World Industry Use Cases for ${escape(sf)} to PNG Conversion
          </h2>
          ${useCasesHtml}
        </section>
        `
            : ''
        }

        <!-- Troubleshooting Common Issues -->
        ${
          troubleshootingHtml
            ? `
        <section aria-labelledby="troubleshooting-title" style="margin-bottom: 36px;">
          <h2 id="troubleshooting-title" style="font-size: 22px; font-weight: 800; color: #0f172a; margin-bottom: 12px;">
            Troubleshooting Common ${escape(sf)} to PNG Conversion Issues
          </h2>
          ${troubleshootingHtml}
        </section>
        `
            : ''
        }

        <!-- Developer Snippets -->
        <section aria-labelledby="dev-snippets-title" style="margin-bottom: 36px;">
          <h2 id="dev-snippets-title" style="font-size: 22px; font-weight: 800; color: #0f172a; margin-bottom: 16px;">
            Developer Code Examples: ${escape(sf)} to PNG
          </h2>
          ${codeSnippets}
        </section>

        <!-- Format FAQ -->
        <section aria-labelledby="format-faq-title" style="margin-bottom: 36px;">
          <h2 id="format-faq-title" style="font-size: 22px; font-weight: 800; color: #0f172a; margin-bottom: 16px;">
            Frequently Asked Questions: ${escape(sf)} to PNG Conversion
          </h2>
          ${faqItems}
        </section>

        <!-- Popular Long-Tail Keywords & Search Queries -->
        <section aria-labelledby="keywords-title" style="background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 12px; padding: 18px; margin-bottom: 36px;">
          <h3 id="keywords-title" style="font-size: 14px; font-weight: 800; color: #0f172a; margin: 0 0 8px;">
            Popular Search Queries &amp; Related Topics: ${escape(sf)} to PNG
          </h3>
          <p style="font-size: 12px; color: #64748b; margin: 0 0 10px;">
            Users frequently discover this free utility while searching for these common image conversion topics:
          </p>
          <div>
            ${keywordsPills}
          </div>
        </section>
      </article>
    </main>
  `;
}

export function renderGuidesHubMainHtml(guides: GuideArticle[]): string {
  const guideCards = guides
    .map(
      (g) => `
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; transition: transform 0.2s;">
          <span style="font-size: 11px; font-weight: 700; color: #0055ff; text-transform: uppercase;">${escape(g.category)} • ${escape(g.readingTime)}</span>
          <h3 style="font-size: 18px; font-weight: 800; color: #0f172a; margin-top: 6px;">
            <a href="/guides/${g.slug}" style="color: inherit; text-decoration: none;">${escape(g.title)}</a>
          </h3>
          <p style="font-size: 13px; color: #64748b; margin-top: 8px; line-height: 1.5;">${escape(g.summary)}</p>
          <a href="/guides/${g.slug}" style="display: inline-block; margin-top: 12px; font-size: 13px; font-weight: 700; color: #0055ff; text-decoration: none;">Read Technical Guide &rarr;</a>
        </div>
      `
    )
    .join('');

  return `
    <main style="max-width: 1024px; margin: 0 auto; padding: 32px 16px;">
      <article>
        <header style="text-align: center; margin-bottom: 40px;">
          <p style="font-size: 12px; font-weight: 700; color: #0055ff; text-transform: uppercase;">
            Knowledge Base &amp; Tutorials
          </p>
          <h1 style="font-size: 32px; font-weight: 900; color: #0f172a; margin-top: 8px;">
            PNG Guides, Comparisons &amp; Image Engineering
          </h1>
          <p style="font-size: 15px; color: #475569; max-width: 720px; margin: 12px auto 0; line-height: 1.6;">
            Explore in-depth technical guides written by image processing engineers. Learn about DEFLATE compression algorithms, 8-bit alpha channels, discrete cosine transform vs wavelet encoding, and web performance optimization.
          </p>
        </header>

        <section aria-labelledby="all-guides-title">
          <h2 id="all-guides-title" style="font-size: 22px; font-weight: 800; color: #0f172a; margin-bottom: 20px;">
            All Engineering Guides &amp; Tutorials
          </h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
            ${guideCards}
          </div>
        </section>
      </article>
    </main>
  `;
}

export function renderGuideArticleMainHtml(guide: GuideArticle): string {
  const contentSections = guide.content
    .map(
      (sec) => `
        <section style="margin-bottom: 32px;">
          <h2 style="font-size: 22px; font-weight: 800; color: #0f172a; margin-bottom: 12px;">${escape(sec.sectionHeading)}</h2>
          ${sec.paragraphs.map((p) => `<p style="font-size: 15px; color: #334155; line-height: 1.7; margin-bottom: 12px;">${escape(p)}</p>`).join('')}
          ${sec.listItems && sec.listItems.length > 0 ? `<ul style="padding-left: 20px; font-size: 14px; color: #334155; line-height: 1.7; margin-bottom: 16px;">${sec.listItems.map((li) => `<li>${escape(li)}</li>`).join('')}</ul>` : ''}
          ${sec.callout ? `<div style="background: #eff6ff; border-left: 4px solid #0055ff; padding: 16px; border-radius: 8px; margin: 16px 0;"><strong style="color: #1e3a8a;">${escape(sec.callout.title)}</strong><p style="font-size: 13px; color: #1e40af; margin-top: 4px;">${escape(sec.callout.text)}</p></div>` : ''}
        </section>
      `
    )
    .join('');

  return `
    <main style="max-width: 860px; margin: 0 auto; padding: 32px 16px;">
      <article>
        <!-- Breadcrumbs -->
        <nav aria-label="Breadcrumb" style="font-size: 12px; color: #64748b; margin-bottom: 16px;">
          <a href="/" style="color: #0055ff; text-decoration: none;">Home</a> &gt;
          <a href="/guides" style="color: #0055ff; text-decoration: none;">Guides</a> &gt;
          <span>${escape(guide.title)}</span>
        </nav>

        <header style="margin-bottom: 32px;">
          <span style="font-size: 12px; font-weight: 700; color: #0055ff; text-transform: uppercase;">${escape(guide.category)} • ${escape(guide.readingTime)} • Updated ${escape(guide.lastUpdated)}</span>
          <h1 style="font-size: 32px; font-weight: 900; color: #0f172a; margin-top: 8px; line-height: 1.25;">
            ${escape(guide.title)}
          </h1>
          <p style="font-size: 16px; color: #475569; margin-top: 12px; line-height: 1.6; font-style: italic; border-left: 3px solid #cbd5e1; padding-left: 14px;">
            ${escape(guide.summary)}
          </p>
        </header>

        <div>
          ${contentSections}
        </div>
      </article>
    </main>
  `;
}

export function renderAboutPageMainHtml(): string {
  return `
    <main style="max-width: 900px; margin: 0 auto; padding: 32px 16px;">
      <article>
        <header style="text-align: center; margin-bottom: 32px;">
          <p style="font-size: 12px; font-weight: 700; color: #0055ff; text-transform: uppercase;">Our Mission &amp; Technology</p>
          <h1 style="font-size: 32px; font-weight: 900; color: #0f172a; margin-top: 8px;">About ImageToPNG</h1>
          <p style="font-size: 15px; color: #475569; max-width: 680px; margin: 12px auto 0; line-height: 1.6;">
            ImageToPNG is built by graphics software engineers dedicated to eradicating server uploads, bandwidth wastage, and privacy risks in online file conversions.
          </p>
        </header>
        <section style="margin-bottom: 32px;">
          <h2 style="font-size: 22px; font-weight: 800; color: #0f172a;">Zero-Knowledge Client-Side Architecture</h2>
          <p style="font-size: 14px; color: #334155; line-height: 1.7; margin-top: 8px;">
            Traditional online converters upload your personal photos, sensitive business receipts, and proprietary graphics to remote cloud servers where they sit in temporary buckets. ImageToPNG uses modern WebAssembly (Wasm) and the HTML5 Canvas API to perform 100% of mathematical pixel decoding and DEFLATE encoding inside your own web browser memory.
          </p>
        </section>
        <section style="margin-bottom: 32px;">
          <h2 style="font-size: 22px; font-weight: 800; color: #0f172a;">Strict Adherence to International Standards</h2>
          <p style="font-size: 14px; color: #334155; line-height: 1.7; margin-top: 8px;">
            Our output PNG binaries strictly follow the ISO/IEC 15948:2004 specification. We support 24-bit Truecolor (RGB), 32-bit Truecolor with Alpha (RGBA), 8-bit Greyscale with Alpha, and 8-bit Palette Indexed formats with CRC-32 chunk integrity verification.
          </p>
        </section>
      </article>
    </main>
  `;
}

export function renderSecurityPageMainHtml(): string {
  return `
    <main style="max-width: 900px; margin: 0 auto; padding: 32px 16px;">
      <article>
        <header style="text-align: center; margin-bottom: 32px;">
          <p style="font-size: 12px; font-weight: 700; color: #0055ff; text-transform: uppercase;">Zero-Trust Architecture</p>
          <h1 style="font-size: 32px; font-weight: 900; color: #0f172a; margin-top: 8px;">Security &amp; Data Protection</h1>
          <p style="font-size: 15px; color: #475569; max-width: 680px; margin: 12px auto 0; line-height: 1.6;">
            How ImageToPNG guarantees complete data confidentiality for healthcare (HIPAA), enterprise, and GDPR-regulated assets.
          </p>
        </header>
        <section style="margin-bottom: 28px;">
          <h2 style="font-size: 20px; font-weight: 800; color: #0f172a;">1. No Network Transmission of Image Payloads</h2>
          <p style="font-size: 14px; color: #334155; line-height: 1.7; margin-top: 6px;">
            When you drop a file onto ImageToPNG, it is read into an <code>ArrayBuffer</code> via the browser's <code>FileReader</code> API. No multipart form post, no cloud webhook, and no S3/GCS bucket upload is ever initiated.
          </p>
        </section>
        <section style="margin-bottom: 28px;">
          <h2 style="font-size: 20px; font-weight: 800; color: #0f172a;">2. Memory Cleanup &amp; Zero Persistent Cookies</h2>
          <p style="font-size: 14px; color: #334155; line-height: 1.7; margin-top: 6px;">
            All Blob URLs generated during conversion are explicitly released via <code>URL.revokeObjectURL()</code> when images are cleared. No local tracking tokens or biometric device fingerprints are ever written to localStorage or IndexedDB.
          </p>
        </section>
      </article>
    </main>
  `;
}

export function renderPrivacyPageMainHtml(): string {
  return `
    <main style="max-width: 860px; margin: 0 auto; padding: 32px 16px;">
      <article>
        <h1 style="font-size: 30px; font-weight: 900; color: #0f172a; margin-bottom: 12px;">Privacy Policy</h1>
        <p style="font-size: 13px; color: #64748b; margin-bottom: 24px;">Last updated: October 1, 2026</p>
        <p style="font-size: 14px; color: #334155; line-height: 1.7; margin-bottom: 16px;">
          At ImageToPNG (https://www.imagetopng.com), visitor privacy is our primary engineering requirement. This Privacy Policy details our operational data handling procedures.
        </p>
        <h2 style="font-size: 18px; font-weight: 800; color: #0f172a; margin-top: 24px; margin-bottom: 8px;">Zero Storage of Converted Media</h2>
        <p style="font-size: 14px; color: #334155; line-height: 1.7; margin-bottom: 16px;">
          We do not store, view, copy, or transmit the image files you convert. All transformations occur exclusively within your client web browser memory.
        </p>
      </article>
    </main>
  `;
}

export function renderTermsPageMainHtml(): string {
  return `
    <main style="max-width: 860px; margin: 0 auto; padding: 32px 16px;">
      <article>
        <h1 style="font-size: 30px; font-weight: 900; color: #0f172a; margin-bottom: 12px;">Terms of Service</h1>
        <p style="font-size: 13px; color: #64748b; margin-bottom: 24px;">Last updated: September 30, 2026</p>
        <p style="font-size: 14px; color: #334155; line-height: 1.7; margin-bottom: 16px;">
          By accessing and using ImageToPNG, you agree to comply with and be bound by these terms. The service is provided as-is without warranty of any kind.
        </p>
      </article>
    </main>
  `;
}

export function renderNotFoundPageMainHtml(): string {
  return `
    <main style="max-width: 540px; margin: 48px auto; padding: 36px 24px; text-align: center; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);">
      <article>
        <span style="font-size: 12px; font-weight: 800; color: #dc2626; text-transform: uppercase; letter-spacing: 0.05em; background: #fee2e2; padding: 4px 12px; border-radius: 9999px; border: 1px solid #fecaca; display: inline-block;">404 Not Found</span>
        <h1 style="font-size: 28px; font-weight: 900; color: #0f172a; margin: 16px 0 8px;">Page Not Found</h1>
        <p style="font-size: 14px; color: #64748b; line-height: 1.6; margin: 0 0 24px;">The page or format converter you requested does not exist or may have been moved.</p>
        <a href="/" style="display: inline-block; background: #0055ff; color: #ffffff; font-size: 14px; font-weight: 700; padding: 10px 24px; border-radius: 10px; text-decoration: none; margin-bottom: 24px;">Return to Image to PNG Converter</a>
        <div style="border-top: 1px solid #f1f5f9; padding-top: 18px; text-align: left;">
          <p style="font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; margin: 0 0 8px;">Popular Image Converters</p>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 13px;">
            <a href="/jpg-to-png" style="color: #0055ff; text-decoration: none;">&rarr; JPG to PNG</a>
            <a href="/webp-to-png" style="color: #0055ff; text-decoration: none;">&rarr; WEBP to PNG</a>
            <a href="/heic-to-png" style="color: #0055ff; text-decoration: none;">&rarr; HEIC to PNG</a>
            <a href="/svg-to-png" style="color: #0055ff; text-decoration: none;">&rarr; SVG to PNG</a>
          </div>
        </div>
      </article>
    </main>
  `;
}

/**
 * Universal SSR Renderer: Generates 100% full semantic server-rendered content for ANY route
 */
export function renderUniversalSsrPage(cleanPath: string): string {
  const normPath = cleanPath === '' || cleanPath === '/' ? '/' : cleanPath.replace(/\/$/, '');

  let mainContent = '';

  // 1. Homepage
  if (normPath === '/') {
    mainContent = renderHomePageMainHtml();
  }
  // 2. Guides Hub
  else if (normPath === '/guides' || normPath === '/blog') {
    mainContent = renderGuidesHubMainHtml(GUIDES_DATA);
  }
  // 3. Individual Guide Article
  else if (normPath.startsWith('/guides/')) {
    const slug = normPath.replace('/guides/', '');
    const guide = GUIDES_DATA.find((g) => g.slug === slug);
    if (guide) {
      mainContent = renderGuideArticleMainHtml(guide);
    } else {
      mainContent = renderNotFoundPageMainHtml();
    }
  }
  // 4. Dedicated Format Page & Authority Pages
  else {
    const slug = normPath.replace(/^\//, '');
    const format = SUPPORTED_FORMATS.find((f) => f.slug === slug);
    if (format) {
      mainContent = renderFormatPageMainHtml(format);
    } else if (normPath === '/about') {
      mainContent = renderAboutPageMainHtml();
    } else if (normPath === '/security') {
      mainContent = renderSecurityPageMainHtml();
    } else if (normPath === '/privacy') {
      mainContent = renderPrivacyPageMainHtml();
    } else if (normPath === '/terms') {
      mainContent = renderTermsPageMainHtml();
    } else {
      // 404 Not Found
      mainContent = renderNotFoundPageMainHtml();
    }
  }

  return `
    ${renderHeaderHtml(normPath)}
    ${mainContent}
    ${renderFooterHtml()}
  `;
}
