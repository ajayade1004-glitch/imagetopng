/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import path from 'path';
import { saveStaticSitemapFile } from '../src/utils/sitemapGenerator';

async function main() {
  const publicSitemapPath = path.resolve(process.cwd(), 'public', 'sitemap.xml');
  console.log('Generating dynamic XML sitemap...');
  const writtenPath = await saveStaticSitemapFile(publicSitemapPath);
  console.log(`Successfully generated sitemap at: ${writtenPath}`);
}

main().catch((err) => {
  console.error('Failed to generate sitemap:', err);
  process.exit(1);
});
