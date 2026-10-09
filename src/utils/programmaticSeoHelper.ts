/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FormatData } from '../types';

export interface OsGuideItem {
  os: string;
  badge: string;
  title: string;
  summary: string;
  steps: string[];
}

export interface SoftwareWorkflowItem {
  software: string;
  category: string;
  title: string;
  description: string;
  tip: string;
}

export interface ByteSpecItem {
  attribute: string;
  sourceSpec: string;
  pngSpec: string;
  technicalImplication: string;
}

/**
 * Returns OS-specific step-by-step guides for programmatic SEO on every format page
 */
export function getOsGuides(format: FormatData): OsGuideItem[] {
  const sf = format.sourceFormat;
  const tf = format.targetFormat || 'PNG';
  return [
    {
      os: 'Windows 11 & Windows 10',
      badge: 'PC / Desktop',
      title: `How to Convert ${sf} to ${tf} on Windows 11 & Windows 10`,
      summary: `Windows natively supports viewing ${sf} files, but built-in tools like MS Paint or Photos frequently re-compress files or alter pixel quality. Our browser-based ${sf} to ${tf} converter offers a zero-install, 100% private conversion workflow on Windows.`,
      steps: [
        `Open Chrome, Microsoft Edge, or Firefox on your Windows 11 or Windows 10 PC and navigate to ImageToPNG.`,
        `Select or drag and drop your ${sf} picture directly into the ${sf} to ${tf} converter box, or press Ctrl+V to paste a copied image immediately from your Windows clipboard.`,
        `The client-side engine decodes your ${sf} pixels in local RAM and packages them into a clean ${tf} container in under a second with up to 100MB per file capacity.`,
        `Click "Download ${tf}" to save the converted file directly into your Windows "Downloads" folder, or click "Copy Image" to paste directly into Discord, Slack, Photoshop, or Word.`
      ]
    },
    {
      os: 'macOS (Apple Silicon & Intel)',
      badge: 'Mac / MacBook',
      title: `How to Convert ${sf} to ${tf} on macOS (Apple Silicon M1/M2/M3 & Intel)`,
      summary: `Mac users frequently encounter ${sf} files from web downloads or camera exports. While macOS Preview can export files, it lacks batch processing and instant clipboard copying. ImageToPNG delivers instantaneous in-browser ${sf} to ${tf} conversion on Safari and Chrome.`,
      steps: [
        `Launch Safari, Google Chrome, or Brave on your MacBook, iMac, or Mac Studio.`,
        `Select your ${sf} images from Finder or drag them straight from your desktop into the ${sf} to ${tf} converter.`,
        `The WebAssembly decoder processes your ${sf} data in memory without transmitting any image payload over the network.`,
        `Save your pristine ${tf} to your Mac or click "Download All (.zip)" to extract hundreds of converted ${tf} files at once.`
      ]
    },
    {
      os: 'iPhone & iPad (iOS)',
      badge: 'Mobile / Apple iOS',
      title: `How to Convert ${sf} to ${tf} on iPhone & iPad (iOS Safari)`,
      summary: `Converting ${sf} files to ${tf} on iOS used to require paid third-party App Store apps packed with advertisements. ImageToPNG functions as a native Progressive Web App directly inside Mobile Safari with full touch drag-and-drop.`,
      steps: [
        `Open Safari on your iPhone or iPad running iOS 15, 16, 17, or 18.`,
        `Tap "Choose Image" to access your iOS Photo Library, Files app, or snap a new photo with your camera.`,
        `Your iPhone's high-speed Bionic or Apple Silicon chip compiles the ${sf} into a high-fidelity ${tf} in local mobile Safari memory.`,
        `Tap "Download ${tf}" and select "Save Image" to place the converted ${tf} directly into your Apple Photos camera roll.`
      ]
    },
    {
      os: 'Android (Samsung, Pixel, Xiaomi)',
      badge: 'Mobile / Android',
      title: `How to Convert ${sf} to ${tf} on Android Smartphones & Tablets`,
      summary: `Android mobile browsers have native canvas acceleration. Convert ${sf} to ${tf} directly from Google Photos, Samsung Gallery, or internal storage without installing bloatware or background services.`,
      steps: [
        `Open Google Chrome or Samsung Internet on your Android device.`,
        `Tap "Choose Image" to browse your internal storage, SD card, or Google Drive folder.`,
        `The file converts instantly in your mobile browser with zero battery drain and zero network data usage.`,
        `Tap "Download ${tf}" to store the picture in your Android /Download directory, ready to share on WhatsApp, Instagram, or Telegram.`
      ]
    },
    {
      os: 'Linux (Ubuntu, Debian, Fedora, Arch)',
      badge: 'Linux / Workstation',
      title: `How to Convert ${sf} to ${tf} on Linux Without Terminal CLI`,
      summary: `While Linux administrators can use ImageMagick or libpng terminal scripts, graphic designers and casual Linux workstation users need a visual, instant drag-and-drop tool that works flawlessly on Wayland and X11 desktops.`,
      steps: [
        `Open Firefox, Chromium, or LibreWolf on Ubuntu, Debian, Fedora, Arch, or Linux Mint.`,
        `Drop your ${sf} file into the ${sf} to ${tf} converter canvas.`,
        `Hardware-accelerated WebAssembly decodes the raster stream instantly.`,
        `Download the clean ${tf} binary with verified chunk integrity.`
      ]
    }
  ];
}

/**
 * Returns professional software integration workflows for programmatic SEO
 */
export function getSoftwareWorkflows(format: FormatData): SoftwareWorkflowItem[] {
  const sf = format.sourceFormat;
  const tf = format.targetFormat || 'PNG';
  return [
    {
      software: 'Adobe Photoshop & Illustrator',
      category: 'Graphic Design',
      title: `Importing Converted ${sf} to ${tf} into Adobe Creative Cloud`,
      description: `Adobe Photoshop and Illustrator natively treat ${tf} files as production-grade assets. When you convert ${sf} to ${tf}, you eliminate repetitive lossy re-compression passes during iterative design revisions. You can cleanly isolate layers, apply gaussian blurs, and export production-ready graphics.`,
      tip: `Always save your initial ${sf} conversion as ${tf} before applying Photoshop layer styles or smart filters to preserve pristine raster edges.`
    },
    {
      software: 'Figma, Sketch & Penpot',
      category: 'UI/UX Design',
      title: `Optimizing ${sf} to ${tf} Assets for Figma Components & Design Systems`,
      description: `Modern design systems demand pixel-precise assets. Importing raw unoptimized ${sf} files into Figma frequently causes subpixel color fringing on high-density Retina and OLED displays. Converting ${sf} to ${tf} ensures razor-sharp 1x, 2x, and 3x vector-aligned raster fidelity across web and mobile mockups.`,
      tip: `Use ImageToPNG's "Copy Image" button to paste converted ${tf} layers directly onto your Figma canvas with Cmd+V / Ctrl+V.`
    },
    {
      software: 'Canva & Social Media Platforms',
      category: 'Content Creation',
      title: `Publishing Assets with Converted ${sf} to ${tf}`,
      description: `YouTube thumbnails, TikTok stickers, and Instagram graphics require crisp visuals so creators can overlay brand graphics over dynamic video backgrounds. Once you convert ${sf} to ${tf}, our built-in editor allows you to adjust filters, resize dimensions, and export clean graphics.`,
      tip: `${tf} files maintain their anti-aliased sharpness when inserted into Canva, Shopify, Etsy, and WordPress media libraries.`
    },
    {
      software: 'Unity, Unreal Engine 5 & Godot',
      category: 'Game Development',
      title: `Preparing 2D Sprites & Textures with ${sf} to ${tf} for 3D Game Engines`,
      description: `Game engines like Unity and Unreal Engine 5 generate compressed texture atlases (DXT5, ASTC, BC7) during game build compilation. Feeding raw uncalibrated ${sf} files into the engine results in double-compression artifacts. Supplying master ${tf} textures guarantees optimal texture streaming and crisp graphics.`,
      tip: `Ensure texture power-of-two dimensions (e.g. 512x512, 1024x1024, 2048x2048) when converting ${sf} to ${tf} for seamless mipmap generation.`
    }
  ];
}

/**
 * Returns deep byte-level format specification comparison
 */
export function getByteLevelSpecs(format: FormatData): ByteSpecItem[] {
  const sf = format.sourceFormat;
  const tf = format.targetFormat || 'PNG';
  const isTargetPng = tf === 'PNG';
  return [
    {
      attribute: 'File Header (Magic Bytes)',
      sourceSpec: format.magicBytes,
      pngSpec: isTargetPng ? '89 50 4E 47 0D 0A 1A 0A' : 'FF D8 FF E0 / FF D8 FF E1',
      technicalImplication: isTargetPng
        ? 'PNG magic bytes verify 8-bit clean transmission, detect CR/LF text corruption, and guarantee binary parser safety.'
        : 'JPEG magic bytes identify SOI (Start of Image) and JFIF/Exif application marker segments.'
    },
    {
      attribute: 'Primary Compression Engine',
      sourceSpec: format.benchmarks[0]?.sourceValue || 'Lossy / Proprietary',
      pngSpec: isTargetPng ? 'Lossless DEFLATE (LZ77 + Huffman, RFC 1951)' : 'Lossy Discrete Cosine Transform (DCT)',
      technicalImplication: isTargetPng
        ? 'Zero pixel values are discarded or approximated. Every single byte is mathematically reconstructed on decompression.'
        : 'Quantizes high-frequency chrominance and luminance to achieve up to 80% size reduction for photographic content.'
    },
    {
      attribute: 'Alpha Channel Bit Depth',
      sourceSpec: format.benchmarks[1]?.sourceValue || 'None (Opaque)',
      pngSpec: isTargetPng ? '8-bit Alpha (256 Gradations of Opacity)' : 'None (Opaque RGB, transparent filled white)',
      technicalImplication: isTargetPng
        ? 'Enables smooth anti-aliased edges and translucent drop shadows without ugly jagged pixel fringes.'
        : 'JPEG does not support alpha transparency; transparent pixels are composited onto a solid background color.'
    },
    {
      attribute: 'Color Channel Depth',
      sourceSpec: 'Varies by codec (Typically 8-bit/channel)',
      pngSpec: isTargetPng ? 'Up to 16-bit/channel (48-bit RGB / 64-bit RGBA)' : '8-bit/channel (24-bit Truecolor YCbCr)',
      technicalImplication: 'Ensures standard digital display fidelity across modern web, desktop, and mobile operating systems.'
    },
    {
      attribute: 'Chunk Architecture & Metadata',
      sourceSpec: 'Marker segments / EXIF blocks',
      pngSpec: isTargetPng ? 'Critical Chunks (IHDR, IDAT, PLTE, IEND) + CRC-32' : 'JPEG APP markers (APP0 JFIF, APP1 Exif)',
      technicalImplication: isTargetPng
        ? 'Standardized chunk structure compliant with ISO/IEC 15948:2004 with mandatory 32-bit CRC checksums.'
        : 'Compact stream layout universally decoded by hardware accelerators across all consumer GPUs and CPUs.'
    }
  ];
}

/**
 * Returns high-value programmatic SEO long-tail keywords for the format
 */
export function getLongTailKeywords(format: FormatData): string[] {
  const sf = format.sourceFormat.toLowerCase();
  const tf = (format.targetFormat || 'PNG').toLowerCase();
  const SF = format.sourceFormat.toUpperCase();
  const TF = (format.targetFormat || 'PNG').toUpperCase();
  
  if (tf === 'jpg') {
    return [
      `convert ${sf} to ${tf} free online`,
      `best ${sf} to ${tf} converter online`,
      `how to convert ${sf} to ${tf} without losing quality`,
      `batch convert ${sf} to ${tf} high resolution`,
      `free ${sf} to ${tf} converter no email no sign up`,
      `convert multiple ${sf} files to ${tf} zip download`,
      `how to change ${sf} to ${tf} in browser`,
      `${SF} to ${TF} high quality photo compression`,
      `fastest ${sf} to ${tf} converter for windows and mac`,
      `convert ${sf} to ${tf} on iphone safari mobile`
    ];
  }

  const isOpaque = ['jpg', 'jpeg', 'bmp', 'raw'].includes(sf);
  return [
    isOpaque ? `convert ${sf} to png transparent background with background remover` : `convert ${sf} to png transparent background free`,
    `best ${sf} to png converter online`,
    `how to convert ${sf} to png without losing quality`,
    `batch convert ${sf} to png high resolution`,
    `free ${sf} to png converter no email no sign up`,
    `convert multiple ${sf} files to png zip download`,
    `how to change ${sf} to transparent png in browser`,
    `${SF} to PNG 300 DPI high resolution converter`,
    `fastest ${sf} to png converter for windows and mac`,
    `convert ${sf} to png on iphone safari mobile`
  ];
}
