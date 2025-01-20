import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import fs from 'fs';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync(
        path.resolve(__dirname, "./certs/localhost-key.pem")
      ),
      cert: fs.readFileSync(path.resolve(__dirname, "./certs/localhost.pem")),
    },
    port: 5173,
  },
  plugins: [react(), TanStackRouterVite()],
});
