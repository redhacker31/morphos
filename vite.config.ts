import { defineConfig } from "vite";
import { enterDevPlugin } from "vite-plugin-enter-dev";
import path from "path";

// https://vitejs.dev/config/
// enterDevPlugin() bundles @vitejs/plugin-react plus the Enter sandbox
// dev-server config (port/base/host/polling) required for the live preview.
export default defineConfig({
  plugins: [enterDevPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "src"),
    },
  },
});
