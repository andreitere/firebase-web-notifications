import { fileURLToPath } from "url";
import { defineConfig } from "vite";

import path, { resolve } from "path";

const configs = {
  sw: {
    build: {
      outdir: "./dist",
      lib: {
        entry: resolve("./firebase-messaging-sw.js"),
        fileName: "firebase-messaging-sw",
        formats: ["es"],
      },
      emptyOutDir: false,
    },
  },
  main: {},
};

const config = configs[process.env.VITE_CONFIG];
console.log();
export default defineConfig({
  ...(config || {})
});
