import { defineConfig } from "vite";
import monkey, { util } from "vite-plugin-monkey";
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
        // `@require`库在dev中未定义，但在build中定义 · Issue #113 · lisonge/vite-plugin-monkey https://github.com/lisonge/vite-plugin-monkey/issues/113
        // HACK: よく分からないがvite-plugin-monkey作者によるとutil.dataUrl("window.GM_config=GM_config")すると動く
        require: ["https://openuserjs.org/src/libs/sizzle/GM_config.js", util.dataUrl("window.GM_config=GM_config")],
        // GM_configが要するgrantを追加する 理由はvite-plugin-monkeyのautoGrantでは追加できないから
        grant: ["GM_getValue", "GM_setValue", "GM.getValue", "GM.setValue"],
      },
    }),
  ],
});
