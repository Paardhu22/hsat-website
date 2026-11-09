import { build } from "vite";
import react from "@vitejs/plugin-react";
import { pathToFileURL } from "node:url";
import path from "node:path";

await build({
  configFile: false,
  plugins: [react()],
  logLevel: "warn",
  build: {
    ssr: "scripts/render-check.jsx",
    outDir: "artifacts/render-check",
    emptyOutDir: true,
  },
});
await import(
  pathToFileURL(path.resolve("artifacts/render-check/render-check.js")).href
);
