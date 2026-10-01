import express from 'express';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

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
    appType: 'spa',
  });

  app.use(vite.middlewares as any);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
