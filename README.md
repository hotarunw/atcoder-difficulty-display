# AtCoderMyExtensions

私が作成したAtCoderのUserScript（Greasemonkey scripts）です。

*   [AtCoderMyExtensions](#atcodermyextensions)
    *   [AtCoderDifficultyDisplay](#atcoderdifficultydisplay)
        *   [Description](#description)
        *   [Install](#install)
    *   [License](#license)
        *   [Install](#install-1)

## AtCoderDifficultyDisplay

[![GreasyFork](https://img.shields.io/badge/GreasyFork-install-orange)](https://greasyfork.org/ja/scripts/397185-atcoderdifficultydisplay)

![AtCoderDifficultyDisplay](AtCoderDifficultyDisplay.png)
![a](https://raw.githubusercontent.com/hotarunx/AtCoderMyExtensions/master/AtCoderDifficultyDisplay.png)

[**AtCoder**](https://atcoder.jp/)の問題のページに[**AtCoder Problems**](https://kenkoooo.com/atcoder/)の<span style="color: red; ">**Difficulty**</span>と、提出ステータス表示します。

### Description

[**AtCoder**](https://atcoder.jp/)の問題のページに[**AtCoder Problems**](https://kenkoooo.com/atcoder/)の<span style="color: red; ">**Difficulty**</span>と、提出ステータス表示します。

Difficulty、提出ステータスの反映は遅れます。

Difficultyはレーティングと同様に<span style="color: red; ">**色づけ**</span>されます。

🧪について。

> 推定難易度の横に試験管の絵文字（🧪）がついている問題があります。これは公式のレーティングシステムが導入される以前の問題に対して、やや強引な手法で難易度を推定したものです。様々な理由で絵文字がない問題よりも推定の信頼度が低いと考えられます。
>
> [AtCoder Problems の難易度推定について](http://pepsin-amylase.hatenablog.com/entry/atcoder-problems-difficulty)

Difficultyについては
[AtCoder Problemsのよくある質問](https://github.com/kenkoooo/AtCoderProblems/blob/master/doc/faq_ja.md)
を読んでください。

提出ステータスを表す文章の意味は次です。
（AtCoder ProblemsでShow By Contest Resultにしたときと同様です）

*   緑色<span style='color: #5CB85C;'>★Accepted</span> : コンテスト中にACしました。
*   緑色<span style='color: #5CB85C;'>Accepted</span> : ACしました。
*   黄色<span style='color: #F0AD4E;'>★Trying</span> : コンテスト中にのみ提出しました。
*   黄色<span style='color: #F0AD4E;'>Trying</span> : 提出しました。
*   黒色Trying : 提出していません。

### Install

1.  [**Tampermonkey**](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=ja)などのユーザースクリプトマネージャをインストールします。
2.  [![GreasyFork](https://img.shields.io/badge/GreasyFork-install-orange)](https://greasyfork.org/ja/scripts/397185-atcoderdifficultydisplay)からユーザースクリプトをインストールします。

Difficultyと提出ステータスは非表示にできます。

[Tampermonkey]→[ダッシュボード]→[AtCoderDifficultyDisplay]を選択してエディタを開き、
`displayDifficulty, displaySubmissionStatus`の値を変更してください。

### Note

このユーザースクリプトは**AtCoder Problems**のAPIを使っているだけで**AtCoder Problems**とは関係ありません。
このユーザースクリプトの質問を**AtCoder Problems**に送らないでください。

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Copyright (c) 2020 hotarunx

This software is released under the MIT License, see LICENSE.
