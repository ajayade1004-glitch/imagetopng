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
  return [
    {
      os: 'Windows 11 & Windows 10',
      badge: 'PC / Desktop',
      title: `How to Convert ${sf} to PNG on Windows 11 & Windows 10`,
      summary: `Windows natively supports viewing ${sf} files, but built-in tools like MS Paint or Photos frequently re-compress files or flatten transparent layers. Our browser-based ${sf} to PNG converter offers a zero-install, 100% lossless conversion workflow on Windows.`,
      steps: [
        `Open Chrome, Microsoft Edge, or Firefox on your Windows 11 or Windows 10 PC and navigate to ImageToPNG.`,
        `Drag and drop your ${sf} picture directly into the converter box or press Ctrl+V to paste a copied ${sf} screenshot immediately from your Windows clipboard.`,
        `The client-side engine decodes your ${sf} pixels in local RAM and packages them into an ISO/IEC 15948 compliant PNG container in under a second.`,
        `Click "Download PNG" to save the converted file directly into your Windows "Downloads" folder, or click "Copy Image" to paste directly into Discord, Slack, Photoshop, or Word.`
      ]
    },
    {
      os: 'macOS (Apple Silicon & Intel)',
      badge: 'Mac / MacBook',
      title: `How to Convert ${sf} to PNG on macOS (Apple Silicon M1/M2/M3 & Intel)`,
      summary: `Mac users frequently encounter ${sf} files from web downloads or camera exports. While macOS Preview can export files, it lacks batch processing and instant clipboard copying. ImageToPNG delivers instantaneous in-browser ${sf} to PNG conversion on Safari and Chrome.`,
      steps: [
        `Launch Safari, Google Chrome, or Brave on your MacBook, iMac, or Mac Studio.`,
        `Select your ${sf} images from Finder or drag them straight from your desktop into the converter.`,
        `The WebAssembly decoder processes your ${sf} data in memory without transmitting any image payload over the network.`,
        `Save your pristine PNG to your Mac or click "Download All (.zip)" to extract hundreds of converted PNG files at once.`
      ]
    },
    {
      os: 'iPhone & iPad (iOS)',
      badge: 'Mobile / Apple iOS',
      title: `How to Convert ${sf} to PNG on iPhone & iPad (iOS Safari)`,
      summary: `Converting ${sf} files to PNG on iOS used to require paid third-party App Store apps packed with advertisements. ImageToPNG functions as a native Progressive Web App directly inside Mobile Safari with full touch drag-and-drop.`,
      steps: [
        `Open Safari on your iPhone or iPad running iOS 15, 16, 17, or 18.`,
        `Tap "Choose Image" to access your iOS Photo Library, Files app, or snap a new photo with your camera.`,
        `Your iPhone's high-speed Bionic or Apple Silicon chip compiles the ${sf} into a lossless PNG in local mobile Safari memory.`,
        `Tap "Download PNG" and select "Save Image" to place the converted PNG directly into your Apple Photos camera roll with full alpha channel support.`
      ]
    },
    {
      os: 'Android (Samsung, Pixel, Xiaomi)',
      badge: 'Mobile / Android',
      title: `How to Convert ${sf} to PNG on Android Smartphones & Tablets`,
      summary: `Android mobile browsers have native canvas acceleration. Convert ${sf} to PNG directly from Google Photos, Samsung Gallery, or internal storage without installing bloatware or background services.`,
      steps: [
        `Open Google Chrome or Samsung Internet on your Android device.`,
        `Tap "Choose Image" to browse your internal storage, SD card, or Google Drive folder.`,
        `The file converts instantly in your mobile browser with zero battery drain and zero data upload usage.`,
        `Tap "Download PNG" to store the picture in your Android /Download directory, ready to share on WhatsApp, Instagram, or Telegram.`
      ]
    },
    {
      os: 'Linux (Ubuntu, Debian, Fedora, Arch)',
      badge: 'Linux / Workstation',
      title: `How to Convert ${sf} to PNG on Linux Without Terminal CLI`,
      summary: `While Linux administrators can use ImageMagick or libpng terminal scripts, graphic designers and casual Linux workstation users need a visual, instant drag-and-drop tool that works flawlessly on Wayland and X11 desktops.`,
      steps: [
        `Open Firefox, Chromium, or LibreWolf on Ubuntu, Debian, Fedora, Arch, or Linux Mint.`,
        `Drop your ${sf} file onto the upload canvas.`,
        `Hardware-accelerated WebAssembly decodes the raster stream instantly.`,
        `Download the clean PNG binary with verified CRC-32 chunk integrity.`
      ]
    }
  ];
}

/**
 * Returns professional software integration workflows for programmatic SEO
 */
export function getSoftwareWorkflows(format: FormatData): SoftwareWorkflowItem[] {
  const sf = format.sourceFormat;
  return [
    {
      software: 'Adobe Photoshop & Illustrator',
      category: 'Graphic Design',
      title: `Importing Converted ${sf} to PNG into Adobe Creative Cloud`,
      description: `Adobe Photoshop and Illustrator natively treat PNG files as 32-bit RGBA master assets. When you convert ${sf} to PNG, you eliminate repetitive lossy re-compression passes during iterative design revisions. You can cleanly isolate layers, apply gaussian blurs, and export production-ready vector masks.`,
      tip: `Always save your initial ${sf} conversion as PNG before applying Photoshop layer styles or smart filters to prevent JPEG ringing artifacts from bleeding into your composite.`
    },
    {
      software: 'Figma, Sketch & Penpot',
      category: 'UI/UX Design',
      title: `Optimizing ${sf} Assets for Figma Components & Design Systems`,
      description: `Modern design systems demand pixel-precise assets. Importing raw ${sf} files into Figma frequently causes blurred borders and subpixel color fringing on high-density Retina and OLED displays. Converting ${sf} to PNG ensures razor-sharp 1x, 2x, and 3x vector-aligned raster fidelity across web and mobile mockups.`,
      tip: `Use ImageToPNG's "Copy Image" button to paste converted PNG layers directly onto your Figma canvas with Cmd+V / Ctrl+V.`
    },
    {
      software: 'Canva & Social Media Platforms',
      category: 'Content Creation',
      title: `Creating Transparent Overlays & Stickers with Converted ${sf} to PNG`,
      description: `YouTube thumbnails, TikTok stickers, and Instagram graphics require transparent backgrounds so creators can overlay brand graphics over dynamic video backgrounds. Once you convert ${sf} to PNG, our built-in editor allows you to erase solid backgrounds and export clean alpha cutouts.`,
      tip: `PNG files maintain their anti-aliased transparency when uploaded to Canva, Shopify, Etsy, and WordPress media libraries.`
    },
    {
      software: 'Unity, Unreal Engine 5 & Godot',
      category: 'Game Development',
      title: `Preparing 2D Sprites, UI Textures & Normal Maps for 3D Game Engines`,
      description: `Game engines like Unity and Unreal Engine 5 generate compressed texture atlases (DXT5, ASTC, BC7) during game build compilation. Feeding raw lossy ${sf} files into the engine results in double-compression artifacts. Supplying master PNG textures guarantees optimal texture streaming and crisp alpha cutouts.`,
      tip: `Ensure texture power-of-two dimensions (e.g. 512x512, 1024x1024, 2048x2048) when converting ${sf} to PNG for seamless mipmap generation.`
    }
  ];
}

/**
 * Returns deep byte-level format specification comparison
 */
export function getByteLevelSpecs(format: FormatData): ByteSpecItem[] {
  const sf = format.sourceFormat;
  return [
    {
      attribute: 'File Header (Magic Bytes)',
      sourceSpec: format.magicBytes,
      pngSpec: '89 50 4E 47 0D 0A 1A 0A',
      technicalImplication: 'PNG magic bytes verify 8-bit clean transmission, detect CR/LF text corruption, and guarantee binary parser safety.'
    },
    {
      attribute: 'Primary Compression Engine',
      sourceSpec: format.benchmarks[0]?.sourceValue || 'Lossy / Proprietary',
      pngSpec: 'Lossless DEFLATE (LZ77 + Huffman, RFC 1951)',
      technicalImplication: 'Zero pixel values are discarded or approximated. Every single byte is mathematically reconstructed on decompression.'
    },
    {
      attribute: 'Alpha Channel Bit Depth',
      sourceSpec: format.benchmarks[1]?.sourceValue || 'None (Opaque)',
      pngSpec: '8-bit Alpha (256 Gradations of Opacity)',
      technicalImplication: 'Enables smooth anti-aliased edges and translucent drop shadows without ugly jagged pixel fringes.'
    },
    {
      attribute: 'Color Channel Depth',
      sourceSpec: 'Varies by codec (Typically 8-bit/channel)',
      pngSpec: 'Up to 16-bit/channel (48-bit RGB / 64-bit RGBA)',
      technicalImplication: 'Ensures support for wide color gamuts (Display P3, Adobe RGB) without color posterization or banding.'
    },
    {
      attribute: 'Chunk Architecture & Metadata',
      sourceSpec: 'Marker segments / EXIF blocks',
      pngSpec: 'Critical Chunks (IHDR, IDAT, PLTE, IEND) + Ancillary (tRNS, pHYs, gAMA)',
      technicalImplication: 'Standardized chunk structure with mandatory 32-bit CRC checksums ensures zero file corruption during transit.'
    }
  ];
}

/**
 * Returns high-value programmatic SEO long-tail keywords for the format
 */
export function getLongTailKeywords(format: FormatData): string[] {
  const sf = format.sourceFormat.toLowerCase();
  const SF = format.sourceFormat.toUpperCase();
  return [
    `convert ${sf} to png transparent background free`,
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
