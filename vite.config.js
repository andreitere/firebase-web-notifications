import { defineConfig } from "vite";

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
export default defineConfig({
  ...(config || {})
});
