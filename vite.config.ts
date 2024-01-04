import { defineConfig } from "vite";
import monkey from "vite-plugin-monkey";
import packageJson from "./package.json" assert { type: "json" };

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ["**/*.html"],
  plugins: [
    monkey({
      entry: "src/main.ts",
      userscript: {
        name: packageJson.name,
        namespace: "https://github.com/hotarupoyo",
        version: packageJson.version,
        author: "hotarupoyo",
        description: packageJson.description,
        match: ["https://atcoder.jp/contests/*"],
        exclude: ["https://atcoder.jp/contests/"],
        license: packageJson.license,
      },
    }),
  ],
});
