// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite'

import solidJs from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: 'dracula',
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [solidJs()]
});
