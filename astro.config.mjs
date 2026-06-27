import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import rehypeFigureCaption from './src/plugins/rehype-figure-caption.mjs';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

export default defineConfig({
  output: 'static',
  site: 'https://MPSLab-ASU.github.io',
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeFigureCaption, rehypeKatex],
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
    build: {
      rollupOptions: {
        external: ['/pagefind/pagefind.js'],
      },
    },
  },
});
