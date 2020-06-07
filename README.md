# AtCoderMyExtensions

私が作成したAtCoderのユーザースクリプト（Greasemonkey scripts）です。

*   [AtCoderMyExtensions](#atcodermyextensions)
    *   [AtCoderDifficultyDisplay](#atcoderdifficultydisplay)
        *   [Description](#description)
        *   [Install](#install)
        *   [Note](#note)
    *   [License](#license)

## AtCoderDifficultyDisplay

[![GreasyFork](https://img.shields.io/badge/GreasyFork-install-orange)](https://greasyfork.org/ja/scripts/397185-atcoderdifficultydisplay)

![AtCoderDifficultyDisplay](https://raw.githubusercontent.com/hotarunx/AtCoderMyExtensions/master/AtCoderDifficultyDisplay/overview.png)

[**AtCoder**](https://atcoder.jp/)の問題のページに[**AtCoder Problems**](https://kenkoooo.com/atcoder/)の難易度を表示します。

[GitHubリポジトリ](https://github.com/hotarunx/AtCoderMyExtensions#atcoderdifficultydisplay)

### Description

AtCoderの問題のページにAtCoder Problemsが推定した難易度と、その問題を提出したかどうかを表示します。

難易度、提出状況の反映は遅れます。

難易度はレーティングと同様に色つけされます。

🧪について。

> 推定難易度の横に試験管の絵文字（🧪）がついている問題があります。これは公式のレーティングシステムが導入される以前の問題に対して、やや強引な手法で難易度を推定したものです。様々な理由で絵文字がない問題よりも推定の信頼度が低いと考えられます。
>
> 引用 [AtCoder Problems の難易度推定について](http://pepsin-amylase.hatenablog.com/entry/atcoder-problems-difficulty)

難易度については
[AtCoder Problemsのよくある質問](https://github.com/kenkoooo/AtCoderProblems/blob/master/doc/faq_ja.md)
を読んでください。

提出状況を表す文章の意味は次です。

![status](https://raw.githubusercontent.com/hotarunx/AtCoderMyExtensions/master/AtCoderDifficultyDisplay/status.png)

*   緑色★Accepted : コンテスト中にACしました。
*   緑色Accepted : ACしました。
*   黄色★Trying : コンテスト中にのみ提出しました。
*   黄色Trying : 提出しました。
*   黒色Trying : 提出していません。

### Install

1.  [**Tampermonkey**](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=ja)などのユーザースクリプトマネージャをインストールします。
2.  [![GreasyFork](https://img.shields.io/badge/GreasyFork-install-orange)](https://greasyfork.org/ja/scripts/397185-atcoderdifficultydisplay)からユーザースクリプトをインストールします。

難易度と提出状況は非表示にできます。

[Tampermonkey]→[ダッシュボード]→[AtCoderDifficultyDisplay]を選択してエディタを開き、
`displayDifficulty, displaySubmissionStatus`の値を変更してください。

### Note

このユーザースクリプトは**AtCoder Problems**のAPIを使っているだけです。
**AtCoder Problems**はこのユーザースクリプトとは関係ありません。
このユーザースクリプトの質問を**AtCoder Problems**に送らないでください。

意見があればTwitterか[GitHubリポジトリ](https://github.com/hotarunx/AtCoderMyExtensions)のIssueに送ってください。

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Copyright (c) 2020 hotarunx

This software is released under the MIT License, see LICENSE.
