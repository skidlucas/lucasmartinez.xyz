// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://lucasmartinez.xyz',
  integrations: [
    sitemap({
      // /kr/ is a noindex easter egg (see src/pages/kr/index.astro)
      filter: (page) => !page.includes('/kr/'),
    }),
  ],
});
