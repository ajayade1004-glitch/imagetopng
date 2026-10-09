/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import fs from 'fs';
import path from 'path';
import { SUPPORTED_FORMATS } from '../data/formats';
import { GUIDES_DATA } from '../data/guides';

export interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
  images?: Array<{
    loc: string;
    title?: string;
    caption?: string;
  }>;
}

/**
 * Escapes characters for strict XML conformance
 */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Dynamically constructs all sitemap URLs based on application data sources
 */
export function getDynamicSitemapEntries(baseUrl = 'https://www.imagetopng.com'): SitemapEntry[] {
  const normalizedBase = baseUrl.replace(/\/$/, '');

  const entries: SitemapEntry[] = [];

  // 1. Primary Homepage & Universal Tool (Updated: October 1, 2026)
  entries.push({
    loc: `${normalizedBase}/`,
    lastmod: '2026-10-01',
    changefreq: 'daily',
    priority: '1.0',
    images: [
      {
        loc: `${normalizedBase}/image-to-png.webp`,
        title: 'Image to PNG Converter Workflow',
        caption: '100% In-Browser Image to PNG conversion diagram illustrating local decoding, alpha transparency extraction, and DEFLATE compression.',
      },
      {
        loc: `${normalizedBase}/image-to-png-alpha-transparency-guide.webp`,
        title: 'PNG Alpha Transparency Guide',
        caption: 'Alpha channel opacity mechanics comparing 8-bit truecolor transparency with 1-bit GIF binary transparency.',
      },
      {
        loc: `${normalizedBase}/image-to-png-lossless-compression-diagram.webp`,
        title: 'Lossless DEFLATE vs Lossy DCT Compression',
        caption: 'Technical comparison between PNG two-stage filter compression and lossy JPEG quantization.',
      },
    ],
  });

  // 2. All 13 Dedicated Format Converter Pages with Unique Image & Matching Lastmod
  for (const fmt of SUPPORTED_FORMATS) {
    const isHighDemand = fmt.badge === 'High Demand' || ['jpg-to-png', 'webp-to-png', 'heic-to-png', 'svg-to-png'].includes(fmt.slug);
    const targetFormat = fmt.targetFormat || 'PNG';
    const lastmodDate = fmt.dateModified || '2026-10-01';

    entries.push({
      loc: `${normalizedBase}/${fmt.slug}`,
      lastmod: lastmodDate,
      changefreq: 'weekly',
      priority: isHighDemand ? '0.9' : '0.85',
      images: [
        {
          loc: `${normalizedBase}/images/converters/${fmt.slug}.png`,
          title: `${fmt.sourceFormat} to ${targetFormat} Converter Technical Diagram`,
          caption: `Official conversion diagram and byte architecture specification for converting ${fmt.sourceFormat} to ${targetFormat} locally in your web browser.`,
        },
        {
          loc: `${normalizedBase}/image-to-png-alpha-transparency-guide.webp`,
          title: `${fmt.sourceFormat} Transparency & Alpha Channel Preservation`,
          caption: `How transparency and alpha opacity levels are preserved when converting ${fmt.sourceFormat} to PNG.`,
        },
      ],
    });
  }

  // 3. Technical Knowledge Base & Educational Guides Hub (Updated: September 30, 2026)
  entries.push({
    loc: `${normalizedBase}/guides`,
    lastmod: '2026-09-30',
    changefreq: 'weekly',
    priority: '0.8',
  });

  // 4. Individual In-Depth Guides Articles (Updated: September 30, 2026)
  for (const guide of GUIDES_DATA) {
    entries.push({
      loc: `${normalizedBase}/guides/${guide.slug}`,
      lastmod: '2026-09-30',
      changefreq: 'monthly',
      priority: '0.75',
      images: [
        {
          loc: `${normalizedBase}/image-to-png-lossless-compression-diagram.webp`,
          title: guide.title,
          caption: guide.summary,
        },
      ],
    });
  }

  // 5. Utility, Authority & Legal Trust Pages with Exact Document Modification Dates
  const trustPages: Array<{ path: string; lastmod: string; changefreq: SitemapEntry['changefreq']; priority: string }> = [
    { path: '/about', lastmod: '2026-09-30', changefreq: 'monthly', priority: '0.6' },
    { path: '/security', lastmod: '2026-09-30', changefreq: 'monthly', priority: '0.6' },
    { path: '/status', lastmod: '2026-10-01', changefreq: 'weekly', priority: '0.5' },
    { path: '/contact', lastmod: '2026-09-30', changefreq: 'monthly', priority: '0.5' },
    { path: '/report-bug', lastmod: '2026-09-30', changefreq: 'monthly', priority: '0.4' },
    { path: '/privacy', lastmod: '2026-09-30', changefreq: 'monthly', priority: '0.4' },
    { path: '/terms', lastmod: '2026-09-30', changefreq: 'monthly', priority: '0.4' },
    { path: '/cookie-policy', lastmod: '2026-09-30', changefreq: 'monthly', priority: '0.3' },
    { path: '/imprint', lastmod: '2026-09-30', changefreq: 'monthly', priority: '0.3' },
  ];

  for (const page of trustPages) {
    entries.push({
      loc: `${normalizedBase}${page.path}`,
      lastmod: page.lastmod,
      changefreq: page.changefreq,
      priority: page.priority,
    });
  }

  return entries;
}

/**
 * Generates standards-compliant XML sitemap string with Google Image extensions
 */
export function generateDynamicSitemapXml(baseUrl = 'https://www.imagetopng.com'): string {
  const entries = getDynamicSitemapEntries(baseUrl);

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n`;
  xml += `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  for (const entry of entries) {
    xml += `  <url>\n`;
    xml += `    <loc>${escapeXml(entry.loc)}</loc>\n`;
    xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
    xml += `    <priority>${entry.priority}</priority>\n`;

    if (entry.images && entry.images.length > 0) {
      for (const img of entry.images) {
        xml += `    <image:image>\n`;
        xml += `      <image:loc>${escapeXml(img.loc)}</image:loc>\n`;
        if (img.title) {
          xml += `      <image:title>${escapeXml(img.title)}</image:title>\n`;
        }
        if (img.caption) {
          xml += `      <image:caption>${escapeXml(img.caption)}</image:caption>\n`;
        }
        xml += `    </image:image>\n`;
      }
    }

    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;

  return xml;
}

/**
 * Writes or updates the static sitemap fallback file on disk
 */
export async function saveStaticSitemapFile(
  targetFilePath?: string,
  baseUrl = 'https://www.imagetopng.com'
): Promise<string> {
  const resolvedPath = targetFilePath || path.resolve(process.cwd(), 'public', 'sitemap.xml');
  const xml = generateDynamicSitemapXml(baseUrl);

  const dir = path.dirname(resolvedPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(resolvedPath, xml, 'utf-8');
  return resolvedPath;
}
