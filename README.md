# README

## AtCoder Difficulty Display

[![GreasyFork](https://img.shields.io/badge/GreasyFork-install-orange)](https://greasyfork.org/ja/scripts/397185-atcoder-difficulty-display)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-green)](https://github.com/hotarunx/AtCoderDifficultyDisplay)

![AtCoderDifficultyDisplay](https://raw.githubusercontent.com/hotarunx/AtCoderDifficultyDisplay/master/overview.png)

[**AtCoder**](https://atcoder.jp/)の問題のページに[**AtCoder Problems**](https://kenkoooo.com/atcoder/)の難易度を表示するユーザースクリプトです。

## Description

AtCoderの問題のページにAtCoder Problemsが推定した**難易度**を表示します。

難易度が表示されて色付けされます。
推定不可能な問題の場合は**Unavailable**と表示します。
実験的手法で推定された難易度には、AtCoder Problemsと同様に「🧪」をつけています。
難易度については[AtCoder Problems の難易度推定について](http://pepsin-amylase.hatenablog.com/entry/atcoder-problems-difficulty)を参考にしてください。

### Recent Update

提出状況を問題ページに表示する機能を削除しました。
提出状況を取得するために使っていたAPIがdeprecatedになったためと、新しいAPIでの実装方法がちょっと思いついていないためです。

[Remove API \`/results\` · Issue \#961 · kenkoooo/AtCoderProblems](https://github.com/kenkoooo/AtCoderProblems/issues/961)
## Install

1. [**Tampermonkey**](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=ja)などのユーザースクリプトマネージャをインストールします。
2. [![GreasyFork](https://img.shields.io/badge/GreasyFork-install-orange)](https://greasyfork.org/ja/scripts/397185-atcoder-difficulty-display)からユーザースクリプトをインストールします。

### ネタバレ防止機能

![AtCoderDifficultyDisplay](https://raw.githubusercontent.com/hotarunx/AtCoderDifficultyDisplay/master/overview2.png)

difficultyのネタバレ防止目的で最初はdifficultyを表示せず、ボタンを押すことでdifficultyを表示できます。
該当コードをtrueに変更することでネタバレ防止機能を有効にできます。

```diff
- const hideDifficulty = false;
+ const hideDifficulty = true;
```

## Note

このユーザースクリプトは**AtCoder Problems**のAPIを使っているだけです。
**AtCoder Problems**はこのユーザースクリプトとは関係ありません。
このユーザースクリプトの質問を**AtCoder Problems**に送らないでください。

意見があればTwitterか[GitHubリポジトリ](https://github.com/hotarunx/AtCoderDifficultyDisplay)のIssuesに送ってください。

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Copyright (c) 2020 hotarunx

This software is released under the MIT License, see LICENSE.
