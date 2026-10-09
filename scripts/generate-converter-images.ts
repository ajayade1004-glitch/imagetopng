import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { SUPPORTED_FORMATS } from '../src/data/formats';

const outputDir = path.resolve(process.cwd(), 'public', 'images', 'converters');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

interface FormatTheme {
  primary: string;
  secondary: string;
  accent: string;
  badgeBg: string;
  sourceDesc: string;
  sourceType: string;
}

const THEMES: Record<string, FormatTheme> = {
  'jpg-to-png': {
    primary: '#ef4444',
    secondary: '#b91c1c',
    accent: '#0055ff',
    badgeBg: '#fee2e2',
    sourceDesc: '24-bit Lossy DCT Compressed',
    sourceType: 'JPEG Raster Image',
  },
  'jpeg-to-png': {
    primary: '#f43f5e',
    secondary: '#be123c',
    accent: '#0055ff',
    badgeBg: '#ffe4e6',
    sourceDesc: '24-bit Baseline DCT Photo',
    sourceType: 'JPEG Photographic Bitmap',
  },
  'webp-to-png': {
    primary: '#06b6d4',
    secondary: '#0e7490',
    accent: '#0055ff',
    badgeBg: '#cffafe',
    sourceDesc: 'VP8/VP8X Google Web Bitmap',
    sourceType: 'Modern Web Image Format',
  },
  'gif-to-png': {
    primary: '#d946ef',
    secondary: '#a21caf',
    accent: '#0055ff',
    badgeBg: '#fae8ff',
    sourceDesc: '8-bit Indexed Palette (256 Colors)',
    sourceType: 'CompuServe Graphics Interchange',
  },
  'bmp-to-png': {
    primary: '#64748b',
    secondary: '#334155',
    accent: '#0055ff',
    badgeBg: '#f1f5f9',
    sourceDesc: 'Uncompressed Device-Independent Bitmap',
    sourceType: 'Windows DIB / BMP Raster',
  },
  'svg-to-png': {
    primary: '#f59e0b',
    secondary: '#b45309',
    accent: '#0055ff',
    badgeBg: '#fef3c7',
    sourceDesc: 'XML Vector Paths & Shapes',
    sourceType: 'Scalable Vector Graphics',
  },
  'avif-to-png': {
    primary: '#0ea5e9',
    secondary: '#0369a1',
    accent: '#0055ff',
    badgeBg: '#e0f2fe',
    sourceDesc: 'AV1 Keyframe 10/12-bit HDR Container',
    sourceType: 'AV1 Image File Format',
  },
  'ico-to-png': {
    primary: '#3b82f6',
    secondary: '#1d4ed8',
    accent: '#0055ff',
    badgeBg: '#dbeafe',
    sourceDesc: 'Multi-Resolution Favicon Icon Resource',
    sourceType: 'Windows Icon Resource',
  },
  'tiff-to-png': {
    primary: '#6366f1',
    secondary: '#4338ca',
    accent: '#0055ff',
    badgeBg: '#e0e7ff',
    sourceDesc: 'Tag-Based Archival Truecolor Bitmap',
    sourceType: 'Tagged Image File Format',
  },
  'heic-to-png': {
    primary: '#8b5cf6',
    secondary: '#6d28d9',
    accent: '#0055ff',
    badgeBg: '#ede9fe',
    sourceDesc: 'Apple HEVC/H.265 High Efficiency Container',
    sourceType: 'High Efficiency Image Container',
  },
  'psd-to-png': {
    primary: '#2563eb',
    secondary: '#1e40af',
    accent: '#0055ff',
    badgeBg: '#eff6ff',
    sourceDesc: 'Adobe Layered Composite Canvas',
    sourceType: 'Photoshop Document Resource',
  },
  'raw-to-png': {
    primary: '#ea580c',
    secondary: '#c2410c',
    accent: '#0055ff',
    badgeBg: '#ffedd5',
    sourceDesc: 'Bayer Sensor CFA Uncompressed Mosaic',
    sourceType: 'Camera Sensor RAW File',
  },
  'png-to-jpg': {
    primary: '#0055ff',
    secondary: '#1d4ed8',
    accent: '#ea580c',
    badgeBg: '#dbeafe',
    sourceDesc: '32-bit RGBA Lossless PNG',
    sourceType: 'Lossless DEFLATE Graphic',
  },
};

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateSvgCard(fmt: typeof SUPPORTED_FORMATS[0]): string {
  const sf = escapeXml(fmt.sourceFormat);
  const tf = escapeXml(fmt.targetFormat || 'PNG');
  const rawTheme = THEMES[fmt.slug] || {
    primary: '#0055ff',
    secondary: '#1d4ed8',
    accent: '#0055ff',
    badgeBg: '#dbeafe',
    sourceDesc: 'Raster Graphics File',
    sourceType: `${sf} Image File`,
  };

  const theme = {
    ...rawTheme,
    sourceDesc: escapeXml(rawTheme.sourceDesc),
    sourceType: escapeXml(rawTheme.sourceType),
  };

  const isTargetJpg = tf === 'JPG';
  const targetDesc = isTargetJpg ? 'Lossy Web-Optimized JPG' : '32-bit RGBA Lossless DEFLATE';
  const targetSpec = isTargetJpg ? 'Up to 80% Smaller • Web Ready' : 'ISO/IEC 15948:2004 Compliant';
  const targetAlpha = isTargetJpg ? 'Opaque Standard RGB' : '8-bit Alpha Channel (256 Opacity Levels)';
  const magic = escapeXml(fmt.magicBytes.split('/')[0].trim());

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Gradient Background -->
    <rect width="1200" height="630" fill="#0f172a" />
    <circle cx="200" cy="150" r="350" fill="${theme.primary}" opacity="0.18" />
    <circle cx="1000" cy="480" r="380" fill="${theme.accent}" opacity="0.18" />
    <rect width="1200" height="630" fill="url(#grid)" opacity="0.08" />

    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" stroke-width="1" />
      </pattern>
    </defs>

    <!-- Top Branding Bar -->
    <g transform="translate(60, 48)">
      <rect width="40" height="40" rx="10" fill="#0055ff" />
      <path d="M12 28L20 12L28 28H12Z" fill="#ffffff" />
      <text x="52" y="28" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="900" letter-spacing="-0.5">
        ImageTo<tspan fill="#38bdf8">PNG</tspan>
      </text>
      <rect x="220" y="6" width="320" height="28" rx="14" fill="#1e293b" stroke="#334155" stroke-width="1" />
      <text x="380" y="25" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" text-anchor="middle" letter-spacing="0.5">
        100% IN-BROWSER CONVERTER
      </text>
    </g>

    <!-- Title and Subtitle -->
    <g transform="translate(60, 130)">
      <text x="0" y="44" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="52" font-weight="900" letter-spacing="-1">
        ${sf} to ${tf} Converter
      </text>
      <text x="0" y="86" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="500">
        High-Speed In-Browser Transformation • Zero Server Uploads • 100% Private
      </text>
    </g>

    <!-- Left Source Box -->
    <g transform="translate(60, 250)">
      <rect width="420" height="260" rx="20" fill="#1e293b" stroke="#334155" stroke-width="2" />
      <rect x="24" y="24" width="70" height="32" rx="8" fill="${theme.badgeBg}" />
      <text x="59" y="45" fill="${theme.primary}" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="900" text-anchor="middle">
        ${sf}
      </text>
      <text x="106" y="46" fill="#cbd5e1" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="700">
        ${theme.sourceType}
      </text>

      <rect x="24" y="74" width="372" height="1" fill="#334155" />

      <!-- Specs list -->
      <text x="24" y="112" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600">Codec / Format:</text>
      <text x="24" y="136" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700">${theme.sourceDesc}</text>

      <text x="24" y="176" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600">Magic Bytes:</text>
      <text x="24" y="200" fill="#38bdf8" font-family="monospace" font-size="14" font-weight="700">${magic}</text>

      <rect x="24" y="220" width="130" height="24" rx="6" fill="#0f172a" />
      <text x="89" y="236" fill="#64748b" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" text-anchor="middle">INPUT FORMAT</text>
    </g>

    <!-- Center Arrow & Process Pill -->
    <g transform="translate(515, 330)">
      <circle cx="85" cy="50" r="42" fill="#0055ff" />
      <path d="M72 50H98M98 50L88 40M98 50L88 60" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      
      <rect x="20" y="105" width="130" height="26" rx="13" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
      <text x="85" y="122" fill="#93c5fd" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="800" text-anchor="middle">
        LOCAL RAM
      </text>
    </g>

    <!-- Right Destination Box -->
    <g transform="translate(720, 250)">
      <rect width="420" height="260" rx="20" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
      <rect x="24" y="24" width="70" height="32" rx="8" fill="#dbeafe" />
      <text x="59" y="45" fill="#1d4ed8" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="900" text-anchor="middle">
        ${tf}
      </text>
      <text x="106" y="46" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="700">
        ${targetDesc}
      </text>

      <rect x="24" y="74" width="372" height="1" fill="#334155" />

      <!-- Output Specs list -->
      <text x="24" y="112" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600">Standard &amp; Quality:</text>
      <text x="24" y="136" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700">${targetSpec}</text>

      <text x="24" y="176" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600">Transparency Support:</text>
      <text x="24" y="200" fill="#4ade80" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700">${targetAlpha}</text>

      <rect x="24" y="220" width="140" height="24" rx="6" fill="#0f172a" />
      <text x="94" y="236" fill="#38bdf8" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" text-anchor="middle">OUTPUT MASTER</text>
    </g>

    <!-- Bottom Footer Bar -->
    <g transform="translate(60, 560)">
      <text x="0" y="20" fill="#64748b" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600">
        ISO/IEC 15948:2004 Standard Compliant • DEFLATE Algorithm • Client-Side Only • No Upload Limits
      </text>
      <text x="1080" y="20" fill="#38bdf8" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" text-anchor="end">
        https://www.imagetopng.com/${fmt.slug}
      </text>
    </g>
  </svg>`;
}

async function run() {
  console.log(`Generating unique images for all ${SUPPORTED_FORMATS.length} converters...`);

  for (const fmt of SUPPORTED_FORMATS) {
    const svgContent = generateSvgCard(fmt);
    const baseFilename = fmt.slug;
    
    // Save SVG
    const svgPath = path.join(outputDir, `${baseFilename}.svg`);
    fs.writeFileSync(svgPath, svgContent, 'utf-8');

    // Generate PNG (1200x630) using Sharp
    const pngPath = path.join(outputDir, `${baseFilename}.png`);
    await sharp(Buffer.from(svgContent))
      .resize(1200, 630)
      .png({ quality: 95, compressionLevel: 9 })
      .toFile(pngPath);

    // Generate WebP (1200x630) using Sharp
    const webpPath = path.join(outputDir, `${baseFilename}.webp`);
    await sharp(Buffer.from(svgContent))
      .resize(1200, 630)
      .webp({ quality: 90 })
      .toFile(webpPath);

    console.log(`✓ Generated unique cards for: ${fmt.slug} (SVG, PNG, WebP)`);
  }

  console.log('All unique converter images generated successfully!');
}

run().catch((err) => {
  console.error('Error generating images:', err);
  process.exit(1);
});
