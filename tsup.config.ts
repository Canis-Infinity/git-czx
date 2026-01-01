// tsup.config.ts

import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/cli.ts'],
  format: ['esm'],
  platform: 'node',
  target: 'node18',
  clean: true,
  sourcemap: false,
  minify: false,
  banner: {
    js: '#!/usr/bin/env node',
  },
});
