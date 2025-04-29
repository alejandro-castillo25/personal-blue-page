import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    title: "Blue",
    favicon: "./public/assets/images/star.png"
  },
  server: {
    publicDir: [{
      name: "public"
    }]
  }
});
