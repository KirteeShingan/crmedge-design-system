import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
    },
    sourcemap: true,
  },
  css: {
    modules: {
      // Export BOTH original (snake_case) and camelCase keys.
      // Component code uses `styles[`variant_${variant}`]` lookups
      // which require the original key — "camelCaseOnly" drops it
      // and was silently rendering buttons without their variant styles.
      localsConvention: "camelCase",
    },
  },
});
