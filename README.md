# README

## AtCoder Difficulty Display

[![GreasyFork](https://img.shields.io/badge/GreasyFork-install-orange)](https://greasyfork.org/ja/scripts/397185-atcoder-difficulty-display)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-green)](https://github.com/hotarunx/AtCoderDifficultyDisplay)

![AtCoderDifficultyDisplay](https://raw.githubusercontent.com/hotarunx/AtCoderDifficultyDisplay/master/overview.png)

[**AtCoder**](https://atcoder.jp/)の問題のページに[**AtCoder Problems**](https://kenkoooo.com/atcoder/)の難易度を表示するユーザースクリプトです。

## Description

AtCoderの問題のページにAtCoder Problemsが推定した難易度と、その問題を正解したかどうかを表示します。

実験的手法で推定された難易度には、AtCoder Problemsと同様に「🧪」をつけています。
難易度については[AtCoder Problems の難易度推定について](http://pepsin-amylase.hatenablog.com/entry/atcoder-problems-difficulty)を参考にしてください。

正解したかなどの提出状況が4種類で表されます。

* Is Solved: ✅ (During Contest): コンテスト中に正解しました。
* Is Solved: ✅ (After Contest): 正解しました。
* Is Solved: ❌ (Not Passed): 提出しましたが正解はしていません。
* Is Solved: ❌ (Not Submitted): 提出していません。

さらに、コンテスト中のペナルティ数と得点した提出時間が表示されます。

提出状況は1時間毎に取得しているため、反映は少し遅れます。

**AtCoder Beginners Selection**の問題では提出状況は表示されません。

## Install

1. [**Tampermonkey**](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=ja)などのユーザースクリプトマネージャをインストールします。
2. [![GreasyFork](https://img.shields.io/badge/GreasyFork-install-orange)](https://greasyfork.org/ja/scripts/397185-atcoder-difficulty-display)からユーザースクリプトをインストールします。

## Note

このユーザースクリプトは**AtCoder Problems**のAPIを使っているだけです。
**AtCoder Problems**はこのユーザースクリプトとは関係ありません。
このユーザースクリプトの質問を**AtCoder Problems**に送らないでください。

意見があればTwitterか[GitHubリポジトリ](https://github.com/hotarunx/AtCoderDifficultyDisplay)のIssuesに送ってください。

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Copyright (c) 2020 hotarunx

This software is released under the MIT License, see LICENSE.
