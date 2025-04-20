import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    title: "Blue",
  },
  server: {
    publicDir: [{
      name: "public"
    }]
  }
});
