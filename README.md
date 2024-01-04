# atcoder-difficulty-display

[**AtCoder**](https://atcoder.jp/) のページに [**AtCoder Problems**](https://kenkoooo.com/atcoder/) の難易度を表示するユーザースクリプトです。

## Description

AtCoder のページに AtCoder Problems が推定した**難易度**を表示します。

難易度が表示されて色付けされます。
推定不可能な問題の場合は**Unavailable**と表示します。
実験的手法で推定された難易度には、AtCoder Problems と同様に「🧪」をつけます。

### ネタバレ防止機能

![atcoder-difficulty-display](https://raw.githubusercontent.com/hotarupoyo/atcoder-difficulty-display/master/img/config1.png)
![atcoder-difficulty-display](https://raw.githubusercontent.com/hotarupoyo/atcoder-difficulty-display/master/img/config2.png)

difficulty のネタバレ防止目的で最初は difficulty を表示せず、ボタンを押すことで difficulty を表示できます。

[基本設定 \- AtCoder](https://atcoder.jp/settings) の下部にあるネタバレ防止のチェックボックスを ON にすることで有効になります。

## Note

このユーザースクリプトは**AtCoder Problems**の API を使っているのみで、**AtCoder Problems**とは関わりはありません。

難易度については [AtCoder Problems の難易度推定について](http://pepsin-amylase.hatenablog.com/entry/atcoder-problems-difficulty) を見てください。

## GitHub リポジトリ

<https://github.com/hotarupoyo/atcoder-difficulty-display>

## GreasyFork からインストール

<https://greasyfork.org/ja/scripts/397185-atcoder-difficulty-display>

## ライセンス表示

使用した OSS のライセンスを表示します。

### kenkoooo/AtCoderProblems

ファイルのコメントに記載。ファイルを使用した。

Source: <https://github.com/kenkoooo/AtCoderProblems>

> MIT License
>
> Copyright (c) 2019 kenkoooo
>
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all
> copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
> SOFTWARE.

### key-moon/atcoder-problems-api

AtCoder Problems の API を取得する機能全体と特に提出一覧を取得してキャッシュする機能を使用した。

Source: <https://github.com/key-moon/atcoder-problems-api>
