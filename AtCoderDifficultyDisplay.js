// ==UserScript==
// @name            AtCoderDifficultyDisplay
// @namespace       https://github.com/hotarunx
// @version         0.4
// @description     display a difficulty of AtCoder Problems.
// @description:ja  AtCoder Problemsの難易度を表示します。
// @author          hotarunx
// @match           https://atcoder.jp/contests/*/tasks/*
// @grant           none
// @connect         https://kenkoooo.com/atcoder/resources/*
// @connect         https://kenkoooo.com/atcoder/atcoder-api/*
// @license         MIT
//
// Copyright(c) 2020 hotarunx
// This software is released under the MIT License, see LICENSE or https://github.com/hotarunx/AtCoderMyExtensions/blob/master/LICENSE.
//
// ==/UserScript==

(function () {

    // -------------------------------------------------------------------------
    // 設定
    // 次の変数の値を書き換えることで各数値を表示するかどうかを変更できます

    // 難易度を表示するかどうか
    const displayDifficulty = true;

    // 提出状況を表示するかどうか
    const displaySubmissionStatus = true;

    // true: 表示する
    // false: 表示しない
    // -------------------------------------------------------------------------

    // URL of Estimated difficulties of the problems
    const SUBMISSION_API = "https://kenkoooo.com/atcoder/atcoder-api/results?user=" + userScreenName;
    const SUBMISSIONS_DATASET = "https://kenkoooo.com/atcoder/resources/problem-models.json";

    if (displayDifficulty)
        fetch(SUBMISSIONS_DATASET)
            .then((response) => response.json())
            .then((jsonData) => {
                addDifficultyText(jsonData);
            });

    if (displaySubmissionStatus && userScreenName != "")
        fetch(SUBMISSION_API)
            .then((response) => response.json())
            .then((submissionData) => {
                addSubmissionStatusText(submissionData);
            });

})();

// Webページの問題ステータス（実行時間制限とメモリ制限が書かれた部分）のHTMLオブジェクトを取得
function getElementOfProblemStatus() {
    let element_status;

    const main_container = document.getElementById('main-container');
    const elements_p = main_container.getElementsByTagName("p");

    for (let i = 0; i < elements_p.length; i++) {
        const element = elements_p[i];
        if (element.textContent.match("メモリ制限:") || element.textContent.match("Memory Limit:")) {
            element_status = element;
            break
        }
    }

    return element_status;
}

// レーティングに対応する色のカラーコードを返す
function colorRating(rating) {
    let color = '#FFFFFF'; // white
    if (rating < 400) color = '#808080'; //       gray
    else if (rating < 800) color = '#804000'; //  brown
    else if (rating < 1200) color = '#008000'; // green
    else if (rating < 1600) color = '#00C0C0'; // cyan
    else if (rating < 2000) color = '#0000FF'; // blue
    else if (rating < 2400) color = '#C0C000'; // yellow
    else if (rating < 2800) color = '#FF8000'; // orange
    else if (rating < 3200) color = '#FF0000'; // red
    else if (rating < 3600) color = '#E4E4E4'; // silver
    else color = '#FFD325'; //                    gold

    return color;
}

// レーティングを0以上に補正
// 参考 https://qiita.com/anqooqie/items/92005e337a0d2569bdbd#%E6%80%A7%E8%B3%AA4-%E5%88%9D%E5%BF%83%E8%80%85%E3%81%B8%E3%81%AE%E6%85%88%E6%82%B2
function correctLowerRating(rating) {
    if (rating >= 400) return rating;
    do {
        rating = 400 / Math.exp((400 - rating) / 400);
    } while (rating < 0);
    return rating;
}

// 難易度を表示する文字列を生成
function generateDifficultyText(difficulty, is_experimental) {
    // 難易度を0にして四捨五入
    difficulty = correctLowerRating(difficulty);
    difficulty = difficulty.toFixed();

    // テキストを生成
    let difficultyText = "Difficulty: ";
    if (is_experimental) difficultyText += "🧪";
    difficultyText += difficulty;

    // 色つけ
    const color = colorRating(difficulty);
    difficultyText = "<span style='color: " + color + ";'>" + difficultyText + "</span>";

    // Problemsへのリンクを追加
    const atcoderProblemsUrl = "https://kenkoooo.com/atcoder/#/table/" + userScreenName;
    difficultyText = "<a href='" + atcoderProblemsUrl + "'>" + difficultyText + "</a>";

    return " / " + difficultyText;
}

function addDifficultyText(jsonData) {
    // URLから問題IDを取得
    const path = location.pathname.split("/");
    const id = path[path.length - 1];
    // 問題データを取得
    const problem = jsonData[id];

    // 問題が存在しなければ終了
    if (problem == null || problem.difficulty == null) { return; }

    // 難易度を表示する文字列を生成
    const text = generateDifficultyText(problem.difficulty, problem.is_experimental);

    // 問題ステータスのHTMLオブジェクトを探してtextを追加
    let status = getElementOfProblemStatus();
    status.insertAdjacentHTML('beforeend', text);
}

function addSubmissionStatusText(submissionData) {
    // URLから問題IDを取得
    const path = location.pathname.split("/");
    const id = path[path.length - 1];

    // コンテスト時間を取得
    const start = Math.floor(Date.parse(startTime._i) / 1000);
    const end = Math.floor(Date.parse(endTime._i) / 1000);

    // 4つの提出状況記録変数
    // コンテスト中にACした、コンテスト外にACした、コンテスト中に提出した、コンテスト外に提出した
    let contestAccepted = false, accepted = false, contestSubmission = false, submitted = false;

    // この問題への提出をすべて探索して提出状況を更新する
    const submissions = submissionData.filter(function (item, index) { if (item.problem_id == id) return true; });
    for (const item of submissions) {
        const time = item["epoch_second"];
        const isDuringContest = start <= time && time <= end;
        const isAccepted = item["result"] == "AC";

        if (isDuringContest) {
            contestSubmission = true;
            if (isAccepted) contestAccepted = true;
        } else {
            submitted = true;
            if (isAccepted) accepted = true;
        }
    }

    // 提出状況を表す文字列を生成
    let text;
    if (contestAccepted) text = " / <span style='color: #5CB85C;'>★Accepted</span>";
    else if (accepted) text = " / <span style='color: #5CB85C;'>Accepted</span>";
    else if (submitted) text = " / <span style='color: #F0AD4E;'>Trying</span>";
    else if (contestSubmission) text = " / <span style='color: #F0AD4E;'>★Trying</span>";
    else text = " / Trying";

    // 問題ステータスのHTMLオブジェクトを探してtextを追加
    let status = getElementOfProblemStatus();
    status.insertAdjacentHTML('beforeend', text);
}
