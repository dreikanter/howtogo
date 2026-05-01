import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import content from './vite-plugin-content.js';

const silencedA11y = new Set([
  'a11y_no_static_element_interactions',
  'a11y_mouse_events_have_key_events',
  'a11y_no_noninteractive_element_interactions',
]);

export default defineConfig({
  plugins: [
    content({ dir: 'content' }),
    svelte({
      onwarn(warning, defaultHandler) {
        if (silencedA11y.has(warning.code)) return;
        defaultHandler(warning);
      },
    }),
  ],
  build: {
    target: 'es2022',
    cssCodeSplit: false,
  },
});
