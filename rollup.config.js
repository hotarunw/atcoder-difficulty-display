/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import typescript from "@rollup/plugin-typescript";
import scss from "rollup-plugin-scss";
import { string } from "rollup-plugin-string";
import packageJson from "./package.json" with { type: "json" };

const userScriptBanner = `
// ==UserScript==
// @name         ${packageJson.name}
// @namespace    https://github.com/hotarunw
// @version      ${packageJson.version}
// @description  ${packageJson.description}
// @author       ${packageJson.author}
// @license      ${packageJson.license}
// @supportURL   ${packageJson.bugs.url}
// @match        https://atcoder.jp/contests/*
// @exclude      https://atcoder.jp/contests/
// @match        https://atcoder.jp/settings
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest
// @connect      kenkoooo.com
// @require      https://greasyfork.org/scripts/437862-atcoder-problems-api/code/atcoder-problems-api.js?version=1004589
// ==/UserScript==`.trim();

export default [
  {
    input: "src/main.ts",
    output: {
      banner: userScriptBanner,
      file: "dist/dist.js",
    },
    plugins: [
      string({
        include: "**/*.html",
      }),
      scss({
        output: false,
      }),
      typescript(),
    ],
  },
];
