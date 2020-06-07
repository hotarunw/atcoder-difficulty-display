# README

## AtCoderDifficultyDisplay

[![GreasyFork](https://img.shields.io/badge/GreasyFork-install-orange)](https://greasyfork.org/ja/scripts/397185-atcoderdifficultydisplay)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-green)](https://github.com/hotarunx/AtCoderDifficultyDisplay)

![AtCoderDifficultyDisplay](https://raw.githubusercontent.com/hotarunx/AtCoderDifficultyDisplay/master/overview.png)

[**AtCoder**](https://atcoder.jp/)の問題のページに[**AtCoder Problems**](https://kenkoooo.com/atcoder/)の難易度を表示するユーザースクリプトです。

## Description

AtCoderの問題のページにAtCoder Problemsが推定した難易度と、その問題を提出したかどうかを表示します。

実験的手法で推定された難易度には、AtCoder Problemsと同様に「🧪」をつけています。
難易度については[AtCoder Problems の難易度推定について](http://pepsin-amylase.hatenablog.com/entry/atcoder-problems-difficulty)を参考にしてください。

このユーザースクリプトはAtCoder ProblemsのAPIを使用しています。
コードを提出してからAtCoder Problemsがクロールして反映するまでには時間差があるので、提出状況の反映は少し遅れます。

提出状況というのは次の5通りの分類で表されます。

![status](https://raw.githubusercontent.com/hotarunx/AtCoderDifficultyDisplay/master/status.png)

*   緑色★Accepted : コンテスト中にACしました。
*   緑色Accepted : ACしました。
*   黄色★Trying : コンテスト中にのみ提出しました。
*   黄色Trying : 提出しました。
*   黒色Trying : 提出していません。

## Install

1.  [**Tampermonkey**](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=ja)などのユーザースクリプトマネージャをインストールします。
2.  [![GreasyFork](https://img.shields.io/badge/GreasyFork-install-orange)](https://greasyfork.org/ja/scripts/397185-atcoderdifficultydisplay)からユーザースクリプトをインストールします。

難易度と提出状況は非表示にできます。

[Tampermonkey]→[ダッシュボード]→[AtCoderDifficultyDisplay]を選択してエディタを開き、
`displayDifficulty, displaySubmissionStatus`の値を変更してください。

## Note

このユーザースクリプトは**AtCoder Problems**のAPIを使っているだけです。
**AtCoder Problems**はこのユーザースクリプトとは関係ありません。
このユーザースクリプトの質問を**AtCoder Problems**に送らないでください。

意見があればTwitterか[GitHubリポジトリ](https://github.com/hotarunx/AtCoderDifficultyDisplay)のIssuesに送ってください。

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Copyright (c) 2020 hotarunx

This software is released under the MIT License, see LICENSE.
