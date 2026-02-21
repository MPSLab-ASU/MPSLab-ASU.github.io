import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import rehypeFigureCaption from './src/plugins/rehype-figure-caption.mjs';

export default defineConfig({
  output: 'static',
  site: 'https://MPSLab-ASU.github.io',
  markdown: {
    rehypePlugins: [rehypeFigureCaption],
  },
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },
});
