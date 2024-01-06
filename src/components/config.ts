import { GM_deleteValue, GM_getValue, GM_registerMenuCommand, monkeyWindow } from "$";
import packageJson from "../..//package.json" assert { type: "json" };
// GM_configの型はnpm installしたときにGitHubからクローンする
// "scripts": {
//   "install": "git clone https://github.com/sizzlemctwizzle/GM_config.git node_modules/GM_config"
// },
// src/vite-env.d.tsに/// <reference types="GM_config/types" />を追加している

export let config: GM_configStruct;
const options: InitOptionsNoCustom = {
  id: packageJson.name, // The id used for this instance of GM_config
  title: packageJson.name, // Panel Title
  fields: // Fields object
    {
      addShowDifficultyButton: {
        label: '難易度を非表示にして表示ボタンを追加する / Hide difficulty and add "Show Difficulty" Button',
        type: "checkbox",
        default: false,
      },
    },
};

export const constructGMConfig = (): GM_configStruct => {
  // FIXME: GM_configの型がおかしい
  // HACK: window参照エラー無視
  // @ts-ignore
  config = monkeyWindow.GM_config(options);
  GM_registerMenuCommand("設定", () => config.open());

  // 旧データ移行
  const oldHideDifficultyGmValue = GM_getValue("hide-difficulty-atcoder-difficulty-display") as
    | true
    | false
    | undefined;
  if (oldHideDifficultyGmValue != null) {
    config.set("addShowDifficultyButton", oldHideDifficultyGmValue);
    GM_deleteValue("hide-difficulty-atcoder-difficulty-display");
  }

  return config;
};
