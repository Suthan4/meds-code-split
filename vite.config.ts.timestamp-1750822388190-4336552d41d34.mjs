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
      // template: "treemap", // or 'sunburst', 'network', etc by default its treemap.
      filename: "dist/stats.html",
      // Output path
      open: true,
      // Opens report in browser after build
      gzipSize: true,
      brotliSize: true
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
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
          form: ["react-hook-form", "@hookform/resolvers"]
        }
      }
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBjb21wb25lbnRUYWdnZXIgfSBmcm9tIFwibG92YWJsZS10YWdnZXJcIjtcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tIFwicm9sbHVwLXBsdWdpbi12aXN1YWxpemVyXCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiAoe1xuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiBcIjo6XCIsXG4gICAgcG9ydDogODA4MCxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgbW9kZSA9PT0gXCJkZXZlbG9wbWVudFwiICYmIGNvbXBvbmVudFRhZ2dlcigpLFxuICAgIG1vZGUgPT09IFwicHJvZHVjdGlvblwiICYmXG4gICAgICB2aXN1YWxpemVyKHtcbiAgICAgICAgLy8gdGVtcGxhdGU6IFwidHJlZW1hcFwiLCAvLyBvciAnc3VuYnVyc3QnLCAnbmV0d29yaycsIGV0YyBieSBkZWZhdWx0IGl0cyB0cmVlbWFwLlxuICAgICAgICBmaWxlbmFtZTogXCJkaXN0L3N0YXRzLmh0bWxcIiwgLy8gT3V0cHV0IHBhdGhcbiAgICAgICAgb3BlbjogdHJ1ZSwgLy8gT3BlbnMgcmVwb3J0IGluIGJyb3dzZXIgYWZ0ZXIgYnVpbGRcbiAgICAgICAgZ3ppcFNpemU6IHRydWUsXG4gICAgICAgIGJyb3RsaVNpemU6IHRydWUsXG4gICAgICB9KSxcbiAgXS5maWx0ZXIoQm9vbGVhbiksXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXG4gICAgfSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgLy8gU3BsaXRzIGNvcmUgUmVhY3QgbGlicmFyaWVzXG4gICAgICAgICAgcmVhY3Q6IFtcInJlYWN0XCIsIFwicmVhY3QtZG9tXCJdLFxuXG4gICAgICAgICAgLy8gU3BsaXRzIGNvbW1vbmx5IHVzZWQgaGVhdnkgdmVuZG9yc1xuICAgICAgICAgIHZlbmRvcjogW1wiem9kXCJdLFxuXG4gICAgICAgICAgLy8gT3B0aW9uYWw6IHNlcGFyYXRlIFJhZGl4IFVJIGNodW5rc1xuICAgICAgICAgIHJhZGl4OiBbXCJAcmFkaXgtdWkvcmVhY3QtZGlhbG9nXCIsIFwiQHJhZGl4LXVpL3JlYWN0LXRvb2x0aXBcIl0sXG5cbiAgICAgICAgICAvLyBPcHRpb25hbDogZm9ybSAmIHZhbGlkYXRpb24gbG9naWNcbiAgICAgICAgICBmb3JtOiBbXCJyZWFjdC1ob29rLWZvcm1cIiwgXCJAaG9va2Zvcm0vcmVzb2x2ZXJzXCJdLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSkpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5TixTQUFTLG9CQUFvQjtBQUN0UCxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsdUJBQXVCO0FBQ2hDLFNBQVMsa0JBQWtCO0FBSjNCLElBQU0sbUNBQW1DO0FBT3pDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxPQUFPO0FBQUEsRUFDekMsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFNBQVMsaUJBQWlCLGdCQUFnQjtBQUFBLElBQzFDLFNBQVMsZ0JBQ1AsV0FBVztBQUFBO0FBQUEsTUFFVCxVQUFVO0FBQUE7QUFBQSxNQUNWLE1BQU07QUFBQTtBQUFBLE1BQ04sVUFBVTtBQUFBLE1BQ1YsWUFBWTtBQUFBLElBQ2QsQ0FBQztBQUFBLEVBQ0wsRUFBRSxPQUFPLE9BQU87QUFBQSxFQUNoQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixjQUFjO0FBQUE7QUFBQSxVQUVaLE9BQU8sQ0FBQyxTQUFTLFdBQVc7QUFBQTtBQUFBLFVBRzVCLFFBQVEsQ0FBQyxLQUFLO0FBQUE7QUFBQSxVQUdkLE9BQU8sQ0FBQywwQkFBMEIseUJBQXlCO0FBQUE7QUFBQSxVQUczRCxNQUFNLENBQUMsbUJBQW1CLHFCQUFxQjtBQUFBLFFBQ2pEO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsRUFBRTsiLAogICJuYW1lcyI6IFtdCn0K
