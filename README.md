# README

## AtCoder Difficulty Display

[![GreasyFork](https://img.shields.io/badge/GreasyFork-install-orange)](https://greasyfork.org/ja/scripts/397185-atcoder-difficulty-display)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-green)](https://github.com/hotarunx/AtCoderDifficultyDisplay)

![AtCoderDifficultyDisplay](https://raw.githubusercontent.com/hotarunx/AtCoderDifficultyDisplay/master/overview.png)

[**AtCoder**](https://atcoder.jp/) のページに [**AtCoder Problems**](https://kenkoooo.com/atcoder/) の難易度を表示するユーザースクリプトです。

## Description

AtCoder のページに AtCoder Problems が推定した**難易度**を表示します。

難易度が表示されて色付けされます。
推定不可能な問題の場合は**Unavailable**と表示します。
実験的手法で推定された難易度には、AtCoder Problems と同様に「🧪」をつけます。

## Install

1. [**Tampermonkey**](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=ja) などのユーザースクリプトマネージャをインストールします。
2. [![GreasyFork](https://img.shields.io/badge/GreasyFork-install-orange)](https://greasyfork.org/ja/scripts/397185-atcoder-difficulty-display) からユーザースクリプトをインストールします。

### ネタバレ防止機能

![AtCoderDifficultyDisplay](https://raw.githubusercontent.com/hotarunx/AtCoderDifficultyDisplay/master/overview2.png)

difficulty のネタバレ防止目的で最初は difficulty を表示せず、ボタンを押すことで difficulty を表示できます。
該当コードを true に変更することでネタバレ防止機能を有効にできます。

```diff
- const hideDifficulty = false;
+ const hideDifficulty = true;
```

## Note

このユーザースクリプトは**AtCoder Problems**の API を使っているのみで、**AtCoder Problems**とは関わりはありません。

意見があれば [GitHub リポジトリ](https://github.com/hotarunx/AtCoderDifficultyDisplay) に Issue を立ててください。

難易度については [AtCoder Problems の難易度推定について](http://pepsin-amylase.hatenablog.com/entry/atcoder-problems-difficulty) を見てください。

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Copyright (c) 2020 hotarunx

This software is released under the MIT License, see LICENSE.

### 使用したOSSソフトウェアのライセンス表示

[NOTICE](./NOTICE.md)

<!-- TODO: README更新 -->
