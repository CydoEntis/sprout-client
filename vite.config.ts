import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path";
import fs from "fs";

// https://vite.dev/config/
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "ssl/private.key")),
      cert: fs.readFileSync(path.resolve(__dirname, "ssl/server.crt")),
    },
    host: true,
    port: 5173,
  },
  plugins: [react(), TanStackRouterVite()],
});
