# README

## atcoder-difficulty-display

[![GreasyFork](https://img.shields.io/badge/GreasyFork-install-orange)](https://greasyfork.org/ja/scripts/397185-atcoder-difficulty-display)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-green)](https://github.com/hotarunw/atcoder-difficulty-display)

![atcoder-difficulty-display](https://raw.githubusercontent.com/hotarunw/atcoder-difficulty-display/master/img/overview1.png)
![atcoder-difficulty-display](https://raw.githubusercontent.com/hotarunw/atcoder-difficulty-display/master/img/overview2.png)

[**AtCoder**](https://atcoder.jp/) のページに [**AtCoder Problems**](https://kenkoooo.com/atcoder/) の難易度を表示するユーザースクリプトです。

## Description

AtCoder のページに AtCoder Problems が推定した**難易度**を表示します。

難易度が表示されて色付けされます。
推定不可能な問題の場合は**Unavailable**と表示します。
実験的手法で推定された難易度には、AtCoder Problems と同様に「🧪」をつけます。

## 現在あるバグ

まれに Difficulty が何も表示されなくなるバグがあります。
開発者ツールのアプリケーションタブから **ATCODER-PROBLEMS-API-** という名前の IndexedDB データベースを削除すると解消します。

バグの原因が分からなくて困っています。心当たりあれば Issue<https://github.com/hotarunw/atcoder-difficulty-display/issues/18>に投稿してほしいです。バグ発生時のデータベースのデータもほしいです。

## Install

1. [**Tampermonkey**](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=ja) などのユーザースクリプトマネージャをインストールします。
2. [![GreasyFork](https://img.shields.io/badge/GreasyFork-install-orange)](https://greasyfork.org/ja/scripts/397185-atcoder-difficulty-display) からユーザースクリプトをインストールします。

### ネタバレ防止機能

![atcoder-difficulty-display](https://raw.githubusercontent.com/hotarunw/atcoder-difficulty-display/master/img/config1.png)
![atcoder-difficulty-display](https://raw.githubusercontent.com/hotarunw/atcoder-difficulty-display/master/img/config2.png)

difficulty のネタバレ防止目的で最初は difficulty を表示せず、ボタンを押すことで difficulty を表示できます。

[基本設定 \- AtCoder](https://atcoder.jp/settings) の下部にあるネタバレ防止のチェックボックスを ON にすることで有効になります。

## Note

このユーザースクリプトは**AtCoder Problems**の API を使っているのみで、**AtCoder Problems**とは関わりはありません。

意見があれば [GitHub リポジトリ](https://github.com/hotarunw/atcoder-difficulty-display) に Issue を立ててください。

難易度については [AtCoder Problems の難易度推定について](http://pepsin-amylase.hatenablog.com/entry/atcoder-problems-difficulty) を見てください。

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Copyright (c) 2020 hotarunw

This software is released under the MIT License, see LICENSE.

### 使用した OSS ソフトウェアのライセンス表示

[NOTICE](./NOTICE.md)

<!-- TODO: README更新 -->
