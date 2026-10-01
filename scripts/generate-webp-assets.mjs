import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generateWebPImages() {
  const publicDir = path.resolve('public');

  // 1. Image 1: Image to PNG Conversion Workflow Diagram
  const svg1 = `
  <svg width="800" height="450" viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="450" rx="16" fill="#0f172a"/>
    <defs>
      <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#3b82f6"/>
        <stop offset="100%" stop-color="#1d4ed8"/>
      </linearGradient>
      <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#10b981"/>
        <stop offset="100%" stop-color="#059669"/>
      </linearGradient>
    </defs>
    <!-- Background grid -->
    <path d="M0 75H800M0 150H800M0 225H800M0 300H800M0 375H800M100 0V450M200 0V450M300 0V450M400 0V450M500 0V450M600 0V450M700 0V450" stroke="#1e293b" stroke-width="1"/>
    
    <text x="400" y="55" fill="#f8fafc" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="22" font-weight="800" text-anchor="middle">Image to PNG Browser-Based Conversion Pipeline</text>
    <text x="400" y="80" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="13" text-anchor="middle">Lossless Client-Side Pixel Processing &amp; DEFLATE Compression</text>

    <!-- Step 1 Card -->
    <rect x="50" y="120" width="190" height="240" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
    <rect x="70" y="140" width="40" height="40" rx="8" fill="url(#g1)"/>
    <text x="90" y="166" fill="#ffffff" font-family="sans-serif" font-size="18" font-weight="900" text-anchor="middle">1</text>
    <text x="70" y="210" fill="#ffffff" font-family="sans-serif" font-size="16" font-weight="700">Input Image</text>
    <text x="70" y="235" fill="#94a3b8" font-family="sans-serif" font-size="12">JPG, WEBP, HEIC,</text>
    <text x="70" y="255" fill="#94a3b8" font-family="sans-serif" font-size="12">SVG, TIFF, GIF, BMP</text>
    <rect x="70" y="290" width="150" height="45" rx="6" fill="#0f172a" stroke="#334155"/>
    <text x="145" y="318" fill="#38bdf8" font-family="sans-serif" font-size="11" font-weight="600" text-anchor="middle">Binary Stream Read</text>

    <!-- Arrow 1 -->
    <path d="M255 240H285M280 232L290 240L280 248" stroke="#60a5fa" stroke-width="3" stroke-linecap="round"/>

    <!-- Step 2 Card -->
    <rect x="305" y="120" width="190" height="240" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
    <rect x="325" y="140" width="40" height="40" rx="8" fill="url(#g1)"/>
    <text x="345" y="166" fill="#ffffff" font-family="sans-serif" font-size="18" font-weight="900" text-anchor="middle">2</text>
    <text x="325" y="210" fill="#ffffff" font-family="sans-serif" font-size="16" font-weight="700">Canvas Buffer</text>
    <text x="325" y="235" fill="#94a3b8" font-family="sans-serif" font-size="12">Hardware GPU</text>
    <text x="325" y="255" fill="#94a3b8" font-family="sans-serif" font-size="12">Raw RGBA Matrix</text>
    <rect x="325" y="290" width="150" height="45" rx="6" fill="#0f172a" stroke="#334155"/>
    <text x="400" y="318" fill="#38bdf8" font-family="sans-serif" font-size="11" font-weight="600" text-anchor="middle">RGBA Pixel Matrix</text>

    <!-- Arrow 2 -->
    <path d="M510 240H540M535 232L545 240L535 248" stroke="#34d399" stroke-width="3" stroke-linecap="round"/>

    <!-- Step 3 Card -->
    <rect x="560" y="120" width="190" height="240" rx="12" fill="#1e293b" stroke="#059669" stroke-width="2"/>
    <rect x="580" y="140" width="40" height="40" rx="8" fill="url(#g2)"/>
    <text x="600" y="166" fill="#ffffff" font-family="sans-serif" font-size="18" font-weight="900" text-anchor="middle">3</text>
    <text x="580" y="210" fill="#34d399" font-family="sans-serif" font-size="16" font-weight="700">Lossless PNG</text>
    <text x="580" y="235" fill="#94a3b8" font-family="sans-serif" font-size="12">DEFLATE Compressed</text>
    <text x="580" y="255" fill="#94a3b8" font-family="sans-serif" font-size="12">8-bit Alpha Channel</text>
    <rect x="580" y="290" width="150" height="45" rx="6" fill="#064e3b" stroke="#059669"/>
    <text x="655" y="318" fill="#a7f3d0" font-family="sans-serif" font-size="11" font-weight="700" text-anchor="middle">Export Ready PNG</text>

    <!-- Footer Privacy Badge -->
    <rect x="250" y="390" width="300" height="34" rx="17" fill="#1e293b" stroke="#334155"/>
    <circle cx="270" cy="407" r="5" fill="#10b981"/>
    <text x="410" y="412" fill="#e2e8f0" font-family="sans-serif" font-size="12" font-weight="600" text-anchor="middle">100% In-Browser Private Conversion</text>
  </svg>
  `;

  // 2. Image 2: Alpha Transparency Guide Diagram
  const svg2 = `
  <svg width="800" height="450" viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="450" rx="16" fill="#0f172a"/>
    <defs>
      <pattern id="checker" width="16" height="16" patternUnits="userSpaceOnUse">
        <rect width="8" height="8" fill="#cbd5e1"/>
        <rect x="8" width="8" height="8" fill="#f8fafc"/>
        <rect y="8" width="8" height="8" fill="#f8fafc"/>
        <rect x="8" y="8" width="8" height="8" fill="#cbd5e1"/>
      </pattern>
    </defs>
    <text x="400" y="55" fill="#f8fafc" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="22" font-weight="800" text-anchor="middle">Image to Transparent PNG Comparison</text>
    <text x="400" y="80" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="13" text-anchor="middle">Lossy Opaque JPG vs True 8-Bit Transparent PNG</text>

    <!-- Left Box: Opaque JPG -->
    <rect x="80" y="115" width="300" height="260" rx="12" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
    <rect x="100" y="135" width="260" height="160" rx="8" fill="#ffffff"/>
    <circle cx="230" cy="215" r="55" fill="#ef4444"/>
    <text x="230" y="222" fill="#ffffff" font-family="sans-serif" font-size="16" font-weight="800" text-anchor="middle">JPG</text>
    <text x="100" y="325" fill="#fca5a5" font-family="sans-serif" font-size="14" font-weight="700">Opaque Background (White Box)</text>
    <text x="100" y="350" fill="#94a3b8" font-family="sans-serif" font-size="12">No alpha channel support. Cannot blend on dark themes.</text>

    <!-- Right Box: Transparent PNG -->
    <rect x="420" y="115" width="300" height="260" rx="12" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <rect x="440" y="135" width="260" height="160" rx="8" fill="url(#checker)"/>
    <circle cx="570" cy="215" r="55" fill="#10b981"/>
    <text x="570" y="222" fill="#ffffff" font-family="sans-serif" font-size="16" font-weight="800" text-anchor="middle">PNG</text>
    <text x="440" y="325" fill="#6ee7b7" font-family="sans-serif" font-size="14" font-weight="700">8-Bit Alpha Transparency</text>
    <text x="440" y="350" fill="#94a3b8" font-family="sans-serif" font-size="12">Seamless overlay onto websites, mockups, and presentations.</text>
  </svg>
  `;

  // 3. Image 3: Lossless Compression & Quality Preservation
  const svg3 = `
  <svg width="800" height="450" viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="450" rx="16" fill="#0f172a"/>
    <text x="400" y="55" fill="#f8fafc" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="22" font-weight="800" text-anchor="middle">DEFLATE Lossless Compression Architecture</text>
    <text x="400" y="80" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="13" text-anchor="middle">ISO/IEC 15948 Standard: Non-Destructive Pixel Encoding</text>

    <!-- Chart / Metric comparison -->
    <rect x="70" y="120" width="660" height="250" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
    
    <!-- Feature 1 -->
    <rect x="100" y="150" width="180" height="190" rx="8" fill="#0f172a" stroke="#2563eb"/>
    <text x="190" y="185" fill="#60a5fa" font-family="sans-serif" font-size="16" font-weight="800" text-anchor="middle">100% Crisp Edges</text>
    <text x="115" y="215" fill="#cbd5e1" font-family="sans-serif" font-size="12">• Zero DCT Ringing</text>
    <text x="115" y="240" fill="#cbd5e1" font-family="sans-serif" font-size="12">• Sharp text &amp; logos</text>
    <text x="115" y="265" fill="#cbd5e1" font-family="sans-serif" font-size="12">• Exact vector raster</text>
    <text x="115" y="290" fill="#cbd5e1" font-family="sans-serif" font-size="12">• Mathematical clarity</text>

    <!-- Feature 2 -->
    <rect x="310" y="150" width="180" height="190" rx="8" fill="#0f172a" stroke="#10b981"/>
    <text x="400" y="185" fill="#34d399" font-family="sans-serif" font-size="16" font-weight="800" text-anchor="middle">Zero Quality Loss</text>
    <text x="325" y="215" fill="#cbd5e1" font-family="sans-serif" font-size="12">• Bit-for-bit accuracy</text>
    <text x="325" y="240" fill="#cbd5e1" font-family="sans-serif" font-size="12">• No generational drift</text>
    <text x="325" y="265" fill="#cbd5e1" font-family="sans-serif" font-size="12">• 256-level alpha</text>
    <text x="325" y="290" fill="#cbd5e1" font-family="sans-serif" font-size="12">• 48-bit truecolor</text>

    <!-- Feature 3 -->
    <rect x="520" y="150" width="180" height="190" rx="8" fill="#0f172a" stroke="#8b5cf6"/>
    <text x="610" y="185" fill="#c084fc" font-family="sans-serif" font-size="16" font-weight="800" text-anchor="middle">Universal Support</text>
    <text x="535" y="215" fill="#cbd5e1" font-family="sans-serif" font-size="12">• Every browser</text>
    <text x="535" y="240" fill="#cbd5e1" font-family="sans-serif" font-size="12">• Desktop apps (Figma)</text>
    <text x="535" y="265" fill="#cbd5e1" font-family="sans-serif" font-size="12">• Mobile iOS / Android</text>
    <text x="535" y="290" fill="#cbd5e1" font-family="sans-serif" font-size="12">• Print &amp; PDF ready</text>
  </svg>
  `;

  await sharp(Buffer.from(svg1))
    .webp({ quality: 90 })
    .toFile(path.join(publicDir, 'image-to-png-conversion-workflow.webp'));

  await sharp(Buffer.from(svg2))
    .webp({ quality: 90 })
    .toFile(path.join(publicDir, 'image-to-png-alpha-transparency-guide.webp'));

  await sharp(Buffer.from(svg3))
    .webp({ quality: 90 })
    .toFile(path.join(publicDir, 'image-to-png-lossless-compression-diagram.webp'));

  console.log('Generated 3 WebP images successfully in /public');
}

generateWebPImages().catch(console.error);
