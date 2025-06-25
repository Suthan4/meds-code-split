// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
import { componentTagger } from "file:///home/project/node_modules/lovable-tagger/dist/index.js";
import { visualizer } from "file:///home/project/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
var __vite_injected_original_dirname = "/home/project";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" && visualizer({
      filename: "dist/stats.html",
      open: true,
      gzipSize: true,
      brotliSize: true,
      template: "treemap"
      // Shows bundle size visually
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    // Enable source maps for debugging (disable in production for smaller builds)
    sourcemap: mode === "development",
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1e3,
    // Enable minification
    minify: "terser",
    // Terser options for better compression
    terserOptions: {
      compress: {
        drop_console: mode === "production",
        // Remove console.log in production
        drop_debugger: true,
        pure_funcs: mode === "production" ? ["console.log", "console.info"] : []
      },
      mangle: {
        safari10: true
      }
    },
    rollupOptions: {
      output: {
        // Improved manual chunks strategy
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom")) {
              return "react-vendor";
            }
            if (id.includes("@radix-ui") || id.includes("lucide-react")) {
              return "ui-vendor";
            }
            if (id.includes("react-hook-form") || id.includes("@hookform") || id.includes("zod")) {
              return "form-vendor";
            }
            if (id.includes("@tanstack/react-query") || id.includes("zustand")) {
              return "state-vendor";
            }
            if (id.includes("date-fns") || id.includes("clsx") || id.includes("tailwind-merge")) {
              return "utils-vendor";
            }
            if (id.includes("@supabase") || id.includes("supabase")) {
              return "supabase-vendor";
            }
            if (id.includes("recharts") || id.includes("d3")) {
              return "charts-vendor";
            }
            return "vendor";
          }
          if (id.includes("src/features/auth")) {
            return "auth-feature";
          }
          if (id.includes("src/components/ui")) {
            return "ui-components";
          }
          if (id.includes("src/services")) {
            return "services";
          }
        },
        // Optimize chunk file names
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split("/").pop()?.replace(".tsx", "").replace(".ts", "") : "chunk";
          return `js/${facadeModuleId}-[hash].js`;
        },
        // Optimize asset file names
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split(".") || [];
          const ext = info[info.length - 1];
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name || "")) {
            return `images/[name]-[hash].${ext}`;
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name || "")) {
            return `fonts/[name]-[hash].${ext}`;
          }
          return `assets/[name]-[hash].${ext}`;
        },
        // Entry file naming
        entryFileNames: "js/[name]-[hash].js"
      },
      // External dependencies (if you want to load them from CDN)
      external: mode === "production" ? [] : []
      // Add CDN externals here if needed
    },
    // CSS code splitting
    cssCodeSplit: true,
    // Optimize CSS
    cssMinify: true,
    // Report compressed file sizes
    reportCompressedSize: true,
    // Optimize for modern browsers
    target: ["es2020", "chrome80", "firefox78", "safari14"]
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "@radix-ui/react-dialog",
      "@radix-ui/react-tooltip",
      "lucide-react",
      "clsx",
      "tailwind-merge"
    ],
    exclude: ["@supabase/supabase-js"]
    // Large deps that should be bundled separately
  },
  // Enable CSS preprocessing optimizations
  css: {
    devSourcemap: mode === "development",
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
        // If you have SCSS variables
      }
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBjb21wb25lbnRUYWdnZXIgfSBmcm9tIFwibG92YWJsZS10YWdnZXJcIjtcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tIFwicm9sbHVwLXBsdWdpbi12aXN1YWxpemVyXCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiAoe1xuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiBcIjo6XCIsXG4gICAgcG9ydDogODA4MCxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgbW9kZSA9PT0gXCJkZXZlbG9wbWVudFwiICYmIGNvbXBvbmVudFRhZ2dlcigpLFxuICAgIG1vZGUgPT09IFwicHJvZHVjdGlvblwiICYmXG4gICAgICB2aXN1YWxpemVyKHtcbiAgICAgICAgZmlsZW5hbWU6IFwiZGlzdC9zdGF0cy5odG1sXCIsXG4gICAgICAgIG9wZW46IHRydWUsXG4gICAgICAgIGd6aXBTaXplOiB0cnVlLFxuICAgICAgICBicm90bGlTaXplOiB0cnVlLFxuICAgICAgICB0ZW1wbGF0ZTogXCJ0cmVlbWFwXCIsIC8vIFNob3dzIGJ1bmRsZSBzaXplIHZpc3VhbGx5XG4gICAgICB9KSxcbiAgXS5maWx0ZXIoQm9vbGVhbiksXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXG4gICAgfSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICAvLyBFbmFibGUgc291cmNlIG1hcHMgZm9yIGRlYnVnZ2luZyAoZGlzYWJsZSBpbiBwcm9kdWN0aW9uIGZvciBzbWFsbGVyIGJ1aWxkcylcbiAgICBzb3VyY2VtYXA6IG1vZGUgPT09IFwiZGV2ZWxvcG1lbnRcIixcbiAgICBcbiAgICAvLyBPcHRpbWl6ZSBjaHVuayBzaXplIHdhcm5pbmdzXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAxMDAwLFxuICAgIFxuICAgIC8vIEVuYWJsZSBtaW5pZmljYXRpb25cbiAgICBtaW5pZnk6IFwidGVyc2VyXCIsXG4gICAgXG4gICAgLy8gVGVyc2VyIG9wdGlvbnMgZm9yIGJldHRlciBjb21wcmVzc2lvblxuICAgIHRlcnNlck9wdGlvbnM6IHtcbiAgICAgIGNvbXByZXNzOiB7XG4gICAgICAgIGRyb3BfY29uc29sZTogbW9kZSA9PT0gXCJwcm9kdWN0aW9uXCIsIC8vIFJlbW92ZSBjb25zb2xlLmxvZyBpbiBwcm9kdWN0aW9uXG4gICAgICAgIGRyb3BfZGVidWdnZXI6IHRydWUsXG4gICAgICAgIHB1cmVfZnVuY3M6IG1vZGUgPT09IFwicHJvZHVjdGlvblwiID8gW1wiY29uc29sZS5sb2dcIiwgXCJjb25zb2xlLmluZm9cIl0gOiBbXSxcbiAgICAgIH0sXG4gICAgICBtYW5nbGU6IHtcbiAgICAgICAgc2FmYXJpMTA6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gICAgXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIC8vIEltcHJvdmVkIG1hbnVhbCBjaHVua3Mgc3RyYXRlZ3lcbiAgICAgICAgbWFudWFsQ2h1bmtzOiAoaWQpID0+IHtcbiAgICAgICAgICAvLyBWZW5kb3IgY2h1bmtzIC0gc2VwYXJhdGUgbGFyZ2UgbGlicmFyaWVzXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwibm9kZV9tb2R1bGVzXCIpKSB7XG4gICAgICAgICAgICAvLyBSZWFjdCBlY29zeXN0ZW1cbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcInJlYWN0XCIpIHx8IGlkLmluY2x1ZGVzKFwicmVhY3QtZG9tXCIpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBcInJlYWN0LXZlbmRvclwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBVSSBsaWJyYXJpZXNcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcIkByYWRpeC11aVwiKSB8fCBpZC5pbmNsdWRlcyhcImx1Y2lkZS1yZWFjdFwiKSkge1xuICAgICAgICAgICAgICByZXR1cm4gXCJ1aS12ZW5kb3JcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gRm9ybSBsaWJyYXJpZXNcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcInJlYWN0LWhvb2stZm9ybVwiKSB8fCBpZC5pbmNsdWRlcyhcIkBob29rZm9ybVwiKSB8fCBpZC5pbmNsdWRlcyhcInpvZFwiKSkge1xuICAgICAgICAgICAgICByZXR1cm4gXCJmb3JtLXZlbmRvclwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBRdWVyeSBhbmQgc3RhdGUgbWFuYWdlbWVudFxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwiQHRhbnN0YWNrL3JlYWN0LXF1ZXJ5XCIpIHx8IGlkLmluY2x1ZGVzKFwienVzdGFuZFwiKSkge1xuICAgICAgICAgICAgICByZXR1cm4gXCJzdGF0ZS12ZW5kb3JcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gRGF0ZSBhbmQgdXRpbGl0eSBsaWJyYXJpZXNcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcImRhdGUtZm5zXCIpIHx8IGlkLmluY2x1ZGVzKFwiY2xzeFwiKSB8fCBpZC5pbmNsdWRlcyhcInRhaWx3aW5kLW1lcmdlXCIpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBcInV0aWxzLXZlbmRvclwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBTdXBhYmFzZSBhbmQgYXV0aFxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwiQHN1cGFiYXNlXCIpIHx8IGlkLmluY2x1ZGVzKFwic3VwYWJhc2VcIikpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIFwic3VwYWJhc2UtdmVuZG9yXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIENoYXJ0cyBhbmQgdmlzdWFsaXphdGlvblxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwicmVjaGFydHNcIikgfHwgaWQuaW5jbHVkZXMoXCJkM1wiKSkge1xuICAgICAgICAgICAgICByZXR1cm4gXCJjaGFydHMtdmVuZG9yXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIE90aGVyIGxhcmdlIHZlbmRvcnNcbiAgICAgICAgICAgIHJldHVybiBcInZlbmRvclwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICBcbiAgICAgICAgICAvLyBBcHAgY2h1bmtzIC0gc2VwYXJhdGUgYnkgZmVhdHVyZVxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcInNyYy9mZWF0dXJlcy9hdXRoXCIpKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJhdXRoLWZlYXR1cmVcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwic3JjL2NvbXBvbmVudHMvdWlcIikpIHtcbiAgICAgICAgICAgIHJldHVybiBcInVpLWNvbXBvbmVudHNcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwic3JjL3NlcnZpY2VzXCIpKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJzZXJ2aWNlc1wiO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgIC8vIE9wdGltaXplIGNodW5rIGZpbGUgbmFtZXNcbiAgICAgICAgY2h1bmtGaWxlTmFtZXM6IChjaHVua0luZm8pID0+IHtcbiAgICAgICAgICBjb25zdCBmYWNhZGVNb2R1bGVJZCA9IGNodW5rSW5mby5mYWNhZGVNb2R1bGVJZFxuICAgICAgICAgICAgPyBjaHVua0luZm8uZmFjYWRlTW9kdWxlSWQuc3BsaXQoXCIvXCIpLnBvcCgpPy5yZXBsYWNlKFwiLnRzeFwiLCBcIlwiKS5yZXBsYWNlKFwiLnRzXCIsIFwiXCIpXG4gICAgICAgICAgICA6IFwiY2h1bmtcIjtcbiAgICAgICAgICByZXR1cm4gYGpzLyR7ZmFjYWRlTW9kdWxlSWR9LVtoYXNoXS5qc2A7XG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICAvLyBPcHRpbWl6ZSBhc3NldCBmaWxlIG5hbWVzXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiAoYXNzZXRJbmZvKSA9PiB7XG4gICAgICAgICAgY29uc3QgaW5mbyA9IGFzc2V0SW5mby5uYW1lPy5zcGxpdChcIi5cIikgfHwgW107XG4gICAgICAgICAgY29uc3QgZXh0ID0gaW5mb1tpbmZvLmxlbmd0aCAtIDFdO1xuICAgICAgICAgIFxuICAgICAgICAgIGlmICgvXFwuKHBuZ3xqcGU/Z3xzdmd8Z2lmfHRpZmZ8Ym1wfGljbykkL2kudGVzdChhc3NldEluZm8ubmFtZSB8fCBcIlwiKSkge1xuICAgICAgICAgICAgcmV0dXJuIGBpbWFnZXMvW25hbWVdLVtoYXNoXS4ke2V4dH1gO1xuICAgICAgICAgIH1cbiAgICAgICAgICBcbiAgICAgICAgICBpZiAoL1xcLih3b2ZmMj98ZW90fHR0ZnxvdGYpJC9pLnRlc3QoYXNzZXRJbmZvLm5hbWUgfHwgXCJcIikpIHtcbiAgICAgICAgICAgIHJldHVybiBgZm9udHMvW25hbWVdLVtoYXNoXS4ke2V4dH1gO1xuICAgICAgICAgIH1cbiAgICAgICAgICBcbiAgICAgICAgICByZXR1cm4gYGFzc2V0cy9bbmFtZV0tW2hhc2hdLiR7ZXh0fWA7XG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICAvLyBFbnRyeSBmaWxlIG5hbWluZ1xuICAgICAgICBlbnRyeUZpbGVOYW1lczogXCJqcy9bbmFtZV0tW2hhc2hdLmpzXCIsXG4gICAgICB9LFxuICAgICAgXG4gICAgICAvLyBFeHRlcm5hbCBkZXBlbmRlbmNpZXMgKGlmIHlvdSB3YW50IHRvIGxvYWQgdGhlbSBmcm9tIENETilcbiAgICAgIGV4dGVybmFsOiBtb2RlID09PSBcInByb2R1Y3Rpb25cIiA/IFtdIDogW10sIC8vIEFkZCBDRE4gZXh0ZXJuYWxzIGhlcmUgaWYgbmVlZGVkXG4gICAgfSxcbiAgICBcbiAgICAvLyBDU1MgY29kZSBzcGxpdHRpbmdcbiAgICBjc3NDb2RlU3BsaXQ6IHRydWUsXG4gICAgXG4gICAgLy8gT3B0aW1pemUgQ1NTXG4gICAgY3NzTWluaWZ5OiB0cnVlLFxuICAgIFxuICAgIC8vIFJlcG9ydCBjb21wcmVzc2VkIGZpbGUgc2l6ZXNcbiAgICByZXBvcnRDb21wcmVzc2VkU2l6ZTogdHJ1ZSxcbiAgICBcbiAgICAvLyBPcHRpbWl6ZSBmb3IgbW9kZXJuIGJyb3dzZXJzXG4gICAgdGFyZ2V0OiBbXCJlczIwMjBcIiwgXCJjaHJvbWU4MFwiLCBcImZpcmVmb3g3OFwiLCBcInNhZmFyaTE0XCJdLFxuICB9LFxuICBcbiAgLy8gT3B0aW1pemUgZGVwZW5kZW5jaWVzXG4gIG9wdGltaXplRGVwczoge1xuICAgIGluY2x1ZGU6IFtcbiAgICAgIFwicmVhY3RcIixcbiAgICAgIFwicmVhY3QtZG9tXCIsXG4gICAgICBcIkByYWRpeC11aS9yZWFjdC1kaWFsb2dcIixcbiAgICAgIFwiQHJhZGl4LXVpL3JlYWN0LXRvb2x0aXBcIixcbiAgICAgIFwibHVjaWRlLXJlYWN0XCIsXG4gICAgICBcImNsc3hcIixcbiAgICAgIFwidGFpbHdpbmQtbWVyZ2VcIixcbiAgICBdLFxuICAgIGV4Y2x1ZGU6IFtcIkBzdXBhYmFzZS9zdXBhYmFzZS1qc1wiXSwgLy8gTGFyZ2UgZGVwcyB0aGF0IHNob3VsZCBiZSBidW5kbGVkIHNlcGFyYXRlbHlcbiAgfSxcbiAgXG4gIC8vIEVuYWJsZSBDU1MgcHJlcHJvY2Vzc2luZyBvcHRpbWl6YXRpb25zXG4gIGNzczoge1xuICAgIGRldlNvdXJjZW1hcDogbW9kZSA9PT0gXCJkZXZlbG9wbWVudFwiLFxuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgIHNjc3M6IHtcbiAgICAgICAgYWRkaXRpb25hbERhdGE6IGBAaW1wb3J0IFwiQC9zdHlsZXMvdmFyaWFibGVzLnNjc3NcIjtgLCAvLyBJZiB5b3UgaGF2ZSBTQ1NTIHZhcmlhYmxlc1xuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSkpOyJdLAogICJtYXBwaW5ncyI6ICI7QUFBeU4sU0FBUyxvQkFBb0I7QUFDdFAsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixTQUFTLHVCQUF1QjtBQUNoQyxTQUFTLGtCQUFrQjtBQUozQixJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssT0FBTztBQUFBLEVBQ3pDLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixTQUFTLGlCQUFpQixnQkFBZ0I7QUFBQSxJQUMxQyxTQUFTLGdCQUNQLFdBQVc7QUFBQSxNQUNULFVBQVU7QUFBQSxNQUNWLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxNQUNWLFlBQVk7QUFBQSxNQUNaLFVBQVU7QUFBQTtBQUFBLElBQ1osQ0FBQztBQUFB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
