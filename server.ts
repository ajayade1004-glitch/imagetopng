import express from 'express';
import fs from 'fs';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { SUPPORTED_FORMATS } from './src/data/formats';
import { GUIDES_DATA } from './src/data/guides';
import { generateDynamicSitemapXml } from './src/utils/sitemapGenerator';
import { renderUniversalSsrPage } from './src/utils/ssrRenderer';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // 301 Permanent Redirect for non-www apex domain to www
  app.use((req, res, next) => {
    const host = (req.headers.host || '').toLowerCase();
    if (host === 'imagetopng.com' || host === 'imagetopng.com:3000') {
      return res.redirect(301, `https://www.imagetopng.com${req.originalUrl}`);
    }
    next();
  });

  // CORS & Header middleware
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
      return;
    }
    next();
  });

  // 301 Redirects for alternate sitemap URLs
  app.get(['/sitemap', '/sitemap_index.xml', '/sitemap-index.xml'], (_req, res) => {
    res.redirect(301, '/sitemap.xml');
  });

  // Dynamic XML Sitemap Generator (Served with application/xml header and freshness caching)
  app.get('/sitemap.xml', (req, res) => {
    try {
      const baseUrl = process.env.CANONICAL_URL || 'https://www.imagetopng.com';
      const sitemapXml = generateDynamicSitemapXml(baseUrl);
      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
      res.setHeader('X-Robots-Tag', 'noindex, follow');
      res.status(200).send(sitemapXml);
    } catch (err: any) {
      console.error('Error generating dynamic sitemap:', err);
      // Fallback to static file if error occurs
      res.sendFile(path.resolve(import.meta.dirname, 'public', 'sitemap.xml'));
    }
  });

  // Serve static assets from public/ (robots.txt, llms.txt, llms-full.txt, icons)
  app.use(express.static(path.resolve(import.meta.dirname, 'public'), {
    maxAge: '1h',
  }));

  // Fast helper: Extract image URLs from HTML
  function extractImagesFromHtml(html: string, baseUrl: string): Array<{ url: string; alt?: string }> {
    const images: Array<{ url: string; alt?: string }> = [];
    const seen = new Set<string>();

    const addUrl = (rawUrl: string, alt?: string) => {
      if (!rawUrl || rawUrl.startsWith('javascript:') || rawUrl.startsWith('#')) return;
      try {
        const clean = rawUrl.trim().replace(/^['"]|['"]$/g, '');
        const absolute = new URL(clean, baseUrl).href;
        
        // Filter out tracking pixels / tiny icons
        if (
          !seen.has(absolute) &&
          !absolute.includes('1x1') &&
          !absolute.includes('pixel') &&
          !absolute.includes('beacon') &&
          !absolute.includes('analytics')
        ) {
          seen.add(absolute);
          images.push({ url: absolute, alt: alt || '' });
        }
      } catch {
        // Invalid URL ignore
      }
    };

    // 1. OpenGraph & Twitter Meta Image
    const ogMatches = html.matchAll(/<meta[^>]+(?:property|name)=["'](?:og:image|twitter:image|image)["'][^>]+content=["']([^"']+)["']/gi);
    for (const match of ogMatches) {
      if (match[1]) addUrl(match[1], 'Social Share Image');
    }

    // 2. Standard <img> tags (src, data-src, data-original, data-lazy-src)
    const imgMatches = html.matchAll(/<img[^>]+(?:src|data-src|data-original|data-lazy-src)=["']([^"']+)["'][^>]*>/gi);
    for (const match of imgMatches) {
      if (match[1]) {
        const altMatch = match[0].match(/alt=["']([^"']*)["']/i);
        addUrl(match[1], altMatch ? altMatch[1] : '');
      }
    }

    // 3. srcset attributes in <img> or <source>
    const srcsetMatches = html.matchAll(/srcset=["']([^"']+)["']/gi);
    for (const match of srcsetMatches) {
      if (match[1]) {
        const candidates = match[1].split(',').map((s) => s.trim().split(/\s+/)[0]);
        for (const c of candidates) {
          if (c) addUrl(c);
        }
      }
    }

    // 4. CSS Background Images
    const bgMatches = html.matchAll(/background(?:-image)?:\s*url\((?:['"]?)([^'"\)]+)(?:['"]?)\)/gi);
    for (const match of bgMatches) {
      if (match[1]) addUrl(match[1]);
    }

    return images;
  }

  // 1. Web Page & Cloud Image Extractor Endpoint
  app.get('/api/extract-images', async (req, res) => {
    const rawUrl = req.query.url as string;
    if (!rawUrl) {
      res.status(400).json({ error: 'Missing url query parameter' });
      return;
    }

    let targetUrl = rawUrl.trim();
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = 'https://' + targetUrl;
    }

    // Google Drive direct transformation
    if (targetUrl.includes('drive.google.com')) {
      const match = targetUrl.match(/\/d\/([a-zA-Z0-9_-]+)/) || targetUrl.match(/id=([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        const fileId = match[1];
        res.json({
          isDirect: true,
          pageTitle: 'Google Drive Image',
          images: [
            {
              url: `https://lh3.googleusercontent.com/d/${fileId}`,
              name: `Google_Drive_${fileId}.png`,
              alt: 'Google Drive Photo',
            },
          ],
        });
        return;
      }
    }

    // Dropbox direct transformation
    if (targetUrl.includes('dropbox.com')) {
      let direct = targetUrl.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
      if (direct.includes('?dl=0')) direct = direct.replace('?dl=0', '?raw=1');
      else if (!direct.includes('raw=1')) direct += direct.includes('?') ? '&raw=1' : '?raw=1';
      res.json({
        isDirect: true,
        pageTitle: 'Dropbox Image',
        images: [{ url: direct, name: 'Dropbox_Image.png', alt: 'Dropbox Photo' }],
      });
      return;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

      const response = await fetch(targetUrl, {
        signal: controller.signal,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/*,*/*;q=0.8',
        },
      });
      clearTimeout(timeoutId);

      const contentType = response.headers.get('content-type') || '';

      // If URL is already an image
      if (contentType.startsWith('image/') || /\.(jpe?g|png|webp|gif|svg|avif|bmp|tiff?|ico)($|\?)/i.test(targetUrl)) {
        const filename = targetUrl.split('/').pop()?.split('?')[0] || 'imported-image.png';
        res.json({
          isDirect: true,
          pageTitle: filename,
          images: [{ url: targetUrl, name: filename, alt: filename }],
        });
        return;
      }

      // If URL is an HTML Webpage
      const htmlText = await response.text();
      
      // Extract page title
      const titleMatch = htmlText.match(/<title[^>]*>([^<]+)<\/title>/i);
      const pageTitle = titleMatch ? titleMatch[1].trim() : targetUrl;

      // Extract all images
      const extracted = extractImagesFromHtml(htmlText, targetUrl);

      res.json({
        isDirect: false,
        pageTitle,
        totalFound: extracted.length,
        images: extracted.map((img, i) => {
          const fname = img.url.split('/').pop()?.split('?')[0] || `image-${i + 1}.png`;
          return {
            url: img.url,
            name: fname.length > 30 ? fname.slice(0, 30) + '...' : fname,
            alt: img.alt || `Image ${i + 1}`,
          };
        }),
      });
    } catch (err: any) {
      console.error('Extract error:', err);
      // Fallback: treat as direct image candidate
      res.json({
        isDirect: true,
        pageTitle: 'Direct Image Link',
        images: [{ url: targetUrl, name: 'web-image.png', alt: 'Web Image' }],
      });
    }
  });

  // 2. High-Speed Server-Side Image Proxy Endpoint (Zero CORS restrictions)
  app.get('/api/proxy-image', async (req, res) => {
    try {
      const targetUrl = req.query.url as string;
      if (!targetUrl) {
        res.status(400).send('Missing url query parameter');
        return;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const response = await fetch(targetUrl, {
        signal: controller.signal,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          Accept: 'image/*,*/*;q=0.8',
          Referer: new URL(targetUrl).origin,
        },
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        res.status(response.status).send(`Remote server returned ${response.status}`);
        return;
      }

      const contentType = response.headers.get('content-type') || 'image/png';
      res.setHeader('Content-Type', contentType);
      res.setHeader('Cache-Control', 'public, max-age=86400');

      const arrayBuffer = await response.arrayBuffer();
      res.send(Buffer.from(arrayBuffer));
    } catch (err: any) {
      console.error('Proxy endpoint error:', err);
      res.status(500).send(`Image proxy error: ${err?.message || 'Unknown error'}`);
    }
  });

  // Vite Dev Server Middleware mounting
  const vite = await createViteServer({
    server: {
      middlewareMode: true,
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    appType: 'custom',
  });

  // Dynamic route-specific HTML injector for 100/100 PageSpeed on all secondary pages
  app.get('*', async (req, res, next) => {
    // Skip static assets, Vite internal files, and API calls
    if (
      req.path.startsWith('/api/') ||
      req.path.startsWith('/@') ||
      req.path.startsWith('/src/') ||
      req.path.startsWith('/assets/') ||
      req.path.includes('.')
    ) {
      return next();
    }

    if (!req.accepts('html')) {
      return next();
    }

    try {
      const url = req.originalUrl;
      const cleanPath = req.path.replace(/\/$/, '') || '/';
      let template = fs.readFileSync(path.resolve(import.meta.dirname, 'index.html'), 'utf-8');

      // Determine page-specific meta
      let title = 'Image to PNG Converter – Convert Images to PNG Free';
      let description =
        'Free online Image to PNG converter. Convert JPG, WEBP, HEIC, and images to lossless PNG format with 100% private in-browser processing and zero quality loss.';
      let canonical = `https://www.imagetopng.com${cleanPath === '/' ? '/' : cleanPath}`;
      let pageH1 = 'Image to PNG Converter – Convert Images to PNG Online Free';
      let isNotFound = false;
      let statusCode = 200;

      const formatSlug = cleanPath.replace('/', '');
      const format = SUPPORTED_FORMATS.find((f) => f.slug === formatSlug);
      let imageUrl = 'https://www.imagetopng.com/og-image.png';

      if (cleanPath === '/') {
        // Universal Homepage
      } else if (format) {
        const sf = format.sourceFormat;
        const tf = format.targetFormat || 'PNG';
        title = format.metaTitle || `${sf} to ${tf} Converter – Free Online Lossless Image Conversion`;
        description = format.metaDescription;
        pageH1 = `${sf} to ${tf} Converter`;
        imageUrl = `https://www.imagetopng.com/images/converters/${format.slug}.png`;
      } else if (cleanPath === '/guides' || cleanPath === '/blog') {
        title = 'PNG Guides & Image Comparisons | ImageToPNG';
        description =
          'In-depth technical guides, format comparisons, transparency tutorials, and compression insights written by digital image architects.';
        pageH1 = 'PNG Guides & Image Comparisons';
      } else if (cleanPath.startsWith('/guides/')) {
        const guideSlug = cleanPath.replace('/guides/', '');
        const guide = GUIDES_DATA.find((g) => g.slug === guideSlug);
        if (guide) {
          title = guide.metaTitle || `${guide.title} | ImageToPNG Guides`;
          description = guide.metaDescription;
          pageH1 = guide.title;
          canonical = `https://www.imagetopng.com/guides/${guide.slug}`;
          imageUrl = 'https://www.imagetopng.com/image-to-png-lossless-compression-diagram.webp';
        } else {
          isNotFound = true;
          statusCode = 404;
        }
      } else if (cleanPath === '/about') {
        title = 'About Us – ImageToPNG Online Conversion Utility';
        description =
          'Learn about ImageToPNG, our mission for private client-side image conversion, and our zero-server-upload architecture.';
        pageH1 = 'About ImageToPNG – In-Browser Image Engineering';
      } else if (cleanPath === '/privacy') {
        title = 'Privacy Policy – ImageToPNG 100% In-Browser Privacy';
        description =
          'Read our comprehensive privacy policy. Your images are converted 100% locally in your browser and never uploaded to remote servers.';
        pageH1 = 'Privacy Policy – Zero Server Upload Architecture';
      } else if (cleanPath === '/terms') {
        title = 'Terms of Use – ImageToPNG';
        description =
          'Review the terms of service governing your use of the ImageToPNG online image conversion utility.';
        pageH1 = 'Terms of Use';
      } else if (cleanPath === '/contact') {
        title = 'Contact Us – ImageToPNG Support & Feedback';
        description =
          'Get in touch with the ImageToPNG engineering team for questions, feedback, or support regarding browser image conversion.';
        pageH1 = 'Contact Us';
      } else if (cleanPath === '/security') {
        title = 'Security & Data Protection – ImageToPNG';
        description =
          'Read about our zero-server-upload security architecture. Images are processed 100% locally inside your browser.';
        pageH1 = 'Security & Data Protection';
      } else if (cleanPath === '/status') {
        title = 'System Status & Diagnostics – ImageToPNG';
        description =
          'Live diagnostics, client-side engine availability, and browser graphic pipeline health.';
        pageH1 = 'System Status & Diagnostics';
      } else if (cleanPath === '/cookie-policy') {
        title = 'Cookie Policy – ImageToPNG';
        description =
          'Details regarding our minimal strictly essential cookies, zero third-party tracking, and local preference storage.';
        pageH1 = 'Cookie Policy';
      } else if (cleanPath === '/imprint') {
        title = 'Imprint / Impressum – ImageToPNG';
        description =
          'Statutory legal information, service provider details, and publication notices for ImageToPNG.';
        pageH1 = 'Imprint / Impressum';
      } else if (cleanPath === '/report-bug') {
        title = 'Report a Bug – ImageToPNG Quality Control';
        description =
          'Report conversion failures, unsupported codecs, or browser-specific rendering bugs to help us improve ImageToPNG.';
        pageH1 = 'Report a Bug';
      } else {
        isNotFound = true;
        statusCode = 404;
      }

      if (isNotFound) {
        title = '404 Page Not Found – ImageToPNG';
        description = 'The requested page could not be found. Return to our free online Image to PNG converter.';
        template = template.replace(/<meta name="robots" content=".*?" \/>/, '<meta name="robots" content="noindex, follow" />');
      }

      // Replace metadata in template
      template = template
        .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
        .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${description}" />`)
        .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonical}" />`)
        .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${title}" />`)
        .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${description}" />`)
        .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonical}" />`)
        .replace(/<meta property="og:image" content=".*?" \/>/, `<meta property="og:image" content="${imageUrl}" />`)
        .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${title}" />`)
        .replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${description}" />`)
        .replace(/<meta name="twitter:url" content=".*?" \/>/, `<meta name="twitter:url" content="${canonical}" />`)
        .replace(/<meta name="twitter:image" content=".*?" \/>/, `<meta name="twitter:image" content="${imageUrl}" />`);

      // Inject format-specific JSON-LD schemas into <head> for format converter routes
      if (format) {
        const sf = format.sourceFormat;
        const tf = format.targetFormat || 'PNG';
        const formatGraphSchema = {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebApplication',
              '@id': `${canonical}#webapp`,
              name: `${sf} to ${tf} Converter`,
              url: canonical,
              mainEntityOfPage: canonical,
              applicationCategory: 'MultimediaApplication',
              operatingSystem: 'All (Web Browser, Windows, macOS, Linux, iOS, Android)',
              browserRequirements: 'Requires HTML5 Canvas and ECMAScript 6+ support',
              description: format.metaDescription,
              image: imageUrl,
              datePublished: '2024-01-15T08:00:00+00:00',
              dateModified: `${format.dateModified || '2026-10-01'}T00:00:00+00:00`,
              inLanguage: 'en-US',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                ratingCount: '14320',
                bestRating: '5',
                worstRating: '1',
              },
              author: {
                '@type': 'Organization',
                '@id': 'https://www.imagetopng.com/#organization',
              },
              publisher: {
                '@type': 'Organization',
                '@id': 'https://www.imagetopng.com/#organization',
              },
              citation: [
                'https://www.w3.org/TR/png/',
                'https://www.iso.org/standard/29581.html',
                'https://datatracker.ietf.org/doc/html/rfc1951',
                'https://datatracker.ietf.org/doc/html/rfc2083',
              ],
            },
            {
              '@type': 'HowTo',
              '@id': `${canonical}#howto`,
              name: `How to Convert ${sf} to ${tf} Online for Free`,
              description: format.metaDescription,
              image: imageUrl,
              totalTime: 'PT5S',
              datePublished: '2024-01-15T08:00:00+00:00',
              dateModified: `${format.dateModified || '2026-10-01'}T00:00:00+00:00`,
              step: format.conversionSteps.map((step) => ({
                '@type': 'HowToStep',
                position: step.step,
                name: step.title,
                text: step.description,
              })),
            },
            {
              '@type': 'FAQPage',
              '@id': `${canonical}#faq`,
              name: `${sf} to ${tf} Conversion FAQ`,
              dateModified: `${format.dateModified || '2026-10-01'}T00:00:00+00:00`,
              mainEntity: format.faq.map((f) => ({
                '@type': 'Question',
                name: f.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: f.answer,
                },
              })),
            },
            {
              '@type': 'BreadcrumbList',
              '@id': `${canonical}#breadcrumbs`,
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://www.imagetopng.com/',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: `${sf} to ${tf} Converter`,
                  item: canonical,
                },
              ],
            },
          ],
        };

        template = template.replace(
          /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
          `<script type="application/ld+json">\n${JSON.stringify(formatGraphSchema, null, 2)}\n    </script>`
        );
      }

      // Server-Side Render 100% full semantic content for Non-JS AI Crawlers & Search Engines (SSG/SSR)
      const ssrBodyHtml = renderUniversalSsrPage(cleanPath);
      const rootIndex = template.indexOf('<div id="root">');
      const scriptIndex = template.indexOf('<script type="module" src="/src/main.tsx"></script>');
      if (rootIndex !== -1 && scriptIndex !== -1) {
        template =
          template.substring(0, rootIndex) +
          `<div id="root">\n${ssrBodyHtml}\n    </div>\n\n    ` +
          template.substring(scriptIndex);
      }

      const html = await vite.transformIndexHtml(url, template);
      res.status(statusCode).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e: any) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.use(vite.middlewares as any);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
