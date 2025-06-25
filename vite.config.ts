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
        filename: "dist/stats.html",
        open: true,
        gzipSize: true,
        brotliSize: true,
        template: "treemap", // Shows bundle size visually
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Enable source maps for debugging (disable in production for smaller builds)
    sourcemap: mode === "development",
    
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000,
    
    // Enable minification
    minify: "terser",
    
    // Terser options for better compression
    terserOptions: {
      compress: {
        drop_console: mode === "production", // Remove console.log in production
        drop_debugger: true,
        pure_funcs: mode === "production" ? ["console.log", "console.info"] : [],
      },
      mangle: {
        safari10: true,
      },
    },
    
    rollupOptions: {
      output: {
        // Improved manual chunks strategy
        manualChunks: (id) => {
          // Vendor chunks - separate large libraries
          if (id.includes("node_modules")) {
            // React ecosystem
            if (id.includes("react") || id.includes("react-dom")) {
              return "react-vendor";
            }
            
            // UI libraries
            if (id.includes("@radix-ui") || id.includes("lucide-react")) {
              return "ui-vendor";
            }
            
            // Form libraries
            if (id.includes("react-hook-form") || id.includes("@hookform") || id.includes("zod")) {
              return "form-vendor";
            }
            
            // Query and state management
            if (id.includes("@tanstack/react-query") || id.includes("zustand")) {
              return "state-vendor";
            }
            
            // Date and utility libraries
            if (id.includes("date-fns") || id.includes("clsx") || id.includes("tailwind-merge")) {
              return "utils-vendor";
            }
            
            // Supabase and auth
            if (id.includes("@supabase") || id.includes("supabase")) {
              return "supabase-vendor";
            }
            
            // Charts and visualization
            if (id.includes("recharts") || id.includes("d3")) {
              return "charts-vendor";
            }
            
            // Other large vendors
            return "vendor";
          }
          
          // App chunks - separate by feature
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
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split("/").pop()?.replace(".tsx", "").replace(".ts", "")
            : "chunk";
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
        entryFileNames: "js/[name]-[hash].js",
      },
      
      // External dependencies (if you want to load them from CDN)
      external: mode === "production" ? [] : [], // Add CDN externals here if needed
    },
    
    // CSS code splitting
    cssCodeSplit: true,
    
    // Optimize CSS
    cssMinify: true,
    
    // Report compressed file sizes
    reportCompressedSize: true,
    
    // Optimize for modern browsers
    target: ["es2020", "chrome80", "firefox78", "safari14"],
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
      "tailwind-merge",
    ],
    exclude: ["@supabase/supabase-js"], // Large deps that should be bundled separately
  },
  
  // Enable CSS preprocessing optimizations
  css: {
    devSourcemap: mode === "development",
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`, // If you have SCSS variables
      },
    },
  },
}));