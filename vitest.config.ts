import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
    },
  },
  plugins: [react()],
  test: {
    coverage: {
      all: true,
      exclude: [
        'node_modules/**',
        '_helpers/**',
        'dist/**',
        'public/**',
        '.next/**',
        'components/ui/**',
        'types/**',
        'constants/**',
      ],
    },
    environment: 'jsdom',
  },
});
