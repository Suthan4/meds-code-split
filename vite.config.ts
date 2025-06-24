import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" &&
      visualizer({
        // template: "treemap", // or 'sunburst', 'network', etc by default its treemap.
        filename: "dist/stats.html", // Output path
        open: true, // Opens report in browser after build
        gzipSize: true,
        brotliSize: true,
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Splits core React libraries
          react: ["react", "react-dom"],

          // Splits commonly used heavy vendors
          vendor: ["zod"],

          // Optional: separate Radix UI chunks
          radix: ["@radix-ui/react-dialog", "@radix-ui/react-tooltip"],

          // Optional: form & validation logic
          form: ["react-hook-form", "@hookform/resolvers"],
        },
      },
    },
  },
}));
