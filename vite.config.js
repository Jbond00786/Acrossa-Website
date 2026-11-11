import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { renderHead } from './src/config/metadata.js';

export default defineConfig({
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'three-core',
              test: /node_modules[\\/]three[\\/]build[\\/]three\.core\.js$/,
              includeDependenciesRecursively: false,
            },
          ],
        },
      },
    },
  },
  plugins: [
    react(),
    {
      name: 'route-fallback-metadata',
      transformIndexHtml(html) {
        return html.replace(
          /<!--route-head-start-->[\s\S]*?<!--route-head-end-->/,
          `<!--route-head-start-->\n${renderHead('/')}\n<!--route-head-end-->`,
        );
      },
    },
  ],
});
