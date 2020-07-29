// ==UserScript==
// @name            AtCoder Difficulty Display
// @namespace       https://github.com/hotarunx
// @homepage        https://github.com/hotarunx/AtCoderDifficultyDisplay
// @supportURL      https://github.com/hotarunx/AtCoderDifficultyDisplay/issues
// @version         1.0.0
// @description     AtCoder Problemsの難易度を表示します。
// @description:en  display a difficulty of AtCoder Problems.
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

(async function () {
    // 現在時間、コンテスト開始時間、コンテスト終了時間（UNIX時間 + 時差）
    const nowTime = Math.floor(Date.now() / 1000);
    const startTimeEpoch = Math.floor(Date.parse(startTime._i) / 1000);
    const endTimeEpoch = Math.floor(Date.parse(endTime._i) / 1000);

    // URLから問題ID(ex: abc170_a)を取得
    const path = location.pathname.split("/");
    const problemId = path[path.length - 1];
    const isABS = path[path.length - 3] == "abs";

    const problemStatus = getElementOfProblemStatus();
    const problemTitle = document.getElementsByClassName("h2")[0];

    // 問題のコンテストが開催中ならば全ての処理をスキップする。
    if (!isABS && !isContestOver(nowTime, endTimeEpoch)) return;

    const estimatedDifficulties = await getEstimatedDifficulties(nowTime, endTimeEpoch);
    const userSubmissions = await getUserSubmissions(nowTime, endTimeEpoch);

    changeProblemTitle(problemId, estimatedDifficulties, problemTitle);
    addDifficultyText(problemId, estimatedDifficulties, problemStatus);
    if (!isABS)
        addIsSolvedText(problemId, userSubmissions, problemStatus, startTimeEpoch, endTimeEpoch);
})();

// コンテストが終了した？
function isContestOver(nowTime, endTimeEpoch) {
    // 緩衝時間(10分)
    const bufferTime = 10 * 60;

    // 現在時間 > コンテスト終了時間 + 緩衝時間？
    if (nowTime > endTimeEpoch + bufferTime) return true;
    return false;
}

// 推定難易度を読み込む
async function getEstimatedDifficulties(nowTime, endTimeEpoch) {
    const URL = "https://kenkoooo.com/atcoder/resources/problem-models.json";
    const KEY_DATA = "atcoderDifficultyDisplayEstimatedDifficulties";
    const KEY_LASTFETCH = "atcoderDifficultyDisplayEstimatedDifficultiesLastFetched";
    const fetchTime = parseInt(localStorage.getItem(KEY_LASTFETCH));

    let jsondata = JSON.parse(localStorage.getItem(KEY_DATA));

    // 推定難易度をlocalStorageから読み込む。もしくはAtCoder Problemsから取得する。

    // 次の場合は推定難易度をAtCoder Problemsから取得する
    // * 推定難易度が保存されていない
    // * 推定難易度を取得して1日経過した
    // * 推定難易度を取得して10分後かつコンテスト終了後から1時間以内

    let need2Fetch = false;
    if (isNaN(fetchTime)) need2Fetch = true;
    else if (nowTime >= 24 * 60 * 60 + fetchTime) need2Fetch = true;
    else if (nowTime >= 10 * 60 + fetchTime && nowTime - endTimeEpoch > 0 && nowTime - endTimeEpoch <= 60 * 60) need2Fetch = true;

    if (need2Fetch) {
        // 推定難易度をAtCoder Problemsから取得する
        jsondata = await (await (fetch(URL))).json();
        localStorage.setItem(KEY_DATA, JSON.stringify(jsondata));
        localStorage.setItem(KEY_LASTFETCH, nowTime);
    }

    return jsondata;
}

// 提出一覧を読み込む
async function getUserSubmissions(nowTime, endTimeEpoch) {
    const URL = "https://kenkoooo.com/atcoder/atcoder-api/results?user=" + userScreenName;
    const KEY_DATA = "atcoderDifficultyDisplayUserSubmissions";
    const KEY_LASTFETCH = "atcoderDifficultyDisplayUserSubmissionsLastFetched";
    const fetchTime = parseInt(localStorage.getItem(KEY_LASTFETCH));

    let jsondata = JSON.parse(localStorage.getItem(KEY_DATA));

    // 提出集をlocalStorageから読み込む。もしくはAtCoder Problemsから取得する。

    // 次の場合は提出集をAtCoder Problemsから取得する
    // * 提出集が保存されていない
    // * 提出集を取得して1時間経過した
    // * 提出集を取得して10分後かつコンテスト終了後から1時間以内

    let need2Fetch = false;
    if (isNaN(fetchTime)) need2Fetch = true;
    else if (nowTime >= 1 * 60 * 60 + fetchTime) need2Fetch = true;
    else if (nowTime >= 10 * 60 + fetchTime && nowTime - endTimeEpoch > 0 && nowTime - endTimeEpoch <= 60 * 60) need2Fetch = true;

    if (need2Fetch) {
        // 提出集をAtCoder Problemsから取得する
        jsondata = await (await (fetch(URL))).json();
        localStorage.setItem(KEY_DATA, JSON.stringify(jsondata));
        localStorage.setItem(KEY_LASTFETCH, nowTime);
    }

    return jsondata;
}

// Webページの問題ステータス（実行時間制限とメモリ制限が書かれた部分）のHTMLオブジェクトを取得
function getElementOfProblemStatus() {
    let element_status;

    const main_container = document.getElementById('main-container');
    const elements_p = main_container.getElementsByTagName("p");

    for (let i = 0; i < elements_p.length; i++) {
        const element = elements_p[i];
        if (element.textContent.match("メモリ制限:") || element.textContent.match("Memory Limit:")) {
            element_status = element;
            break;
        }
    }

    return element_status;
}

// レーティングに対応する色のカラーコード
function colorRating(rating) {
    if (rating < 400) return '#808080'; //          gray
    else if (rating < 800) return '#804000'; //     brown
    else if (rating < 1200) return '#008000'; //    green
    else if (rating < 1600) return '#00C0C0'; //    cyan
    else if (rating < 2000) return '#0000FF'; //    blue
    else if (rating < 2400) return '#C0C000'; //    yellow
    else if (rating < 2800) return '#FF8000'; //    orange
    return '#FF0000'; //                            red
}

// レートを表す難易度円(◒)を生成
function generateDifficultyCircle(rating, size = 12) {
    if (rating < 3200) {
        // 色と円がどのぐらい満ちているかを計算
        const color = colorRating(rating);
        const percentFull = (rating % 400) / 400 * 100;

        // ◒を生成
        return "<span style = 'display: inline-block; border-radius: 50%; border-style: solid;border-width: 1px; margin-right: 5px; height: " + size + "px; width: " + size + "px;border-color: " + color + "; background: linear-gradient(to top, " + color + " 0%, " + color + " " + percentFull + "%, rgba(0, 0, 0, 0) " + percentFull + "%, rgba(0, 0, 0, 0) 100%); '></span>";

    }
    // 金銀銅は例外処理
    else if (rating < 3600) {
        return '<span style="display: inline-block; border-radius: 50%; border-style: solid;border-width: 1px; margin-right: 5px; height: ' + size + 'px; width: ' + size + 'px; border-color: rgb(150, 92, 44); background: linear-gradient(to right, rgb(150, 92, 44), rgb(255, 218, 189), rgb(150, 92, 44));"></span>';

    } else if (rating < 4000) {
        return '<span style="display: inline-block; border-radius: 50%; border-style: solid;border-width: 1px; margin-right: 5px; height: ' + size + 'px; width: ' + size + 'px; border-color: rgb(128, 128, 128); background: linear-gradient(to right, rgb(128, 128, 128), white, rgb(128, 128, 128));"></span>';

    } else {
        return '<span style="display: inline-block; border-radius: 50%; border-style: solid;border-width: 1px; margin-right: 5px; height: ' + size + 'px; width: ' + size + 'px; border-color: rgb(255, 215, 0); background: linear-gradient(to right, rgb(255, 215, 0), white, rgb(255, 215, 0));"></span>';

    }
}

// 400未満のレーティングを補正
// 参考 https://qiita.com/anqooqie/items/92005e337a0d2569bdbd#性質4-初心者への慈悲
function correctLowerRating(rating) {
    if (rating >= 400) return rating;
    do {
        rating = 400 / Math.exp((400 - rating) / 400);
    } while (rating < 0);
    return rating;
}

function changeProblemTitle(problemId, estimatedDifficulties, problemTitle) {
    const problem = estimatedDifficulties[problemId];

    // 問題が存在しなければ終了
    if (problem == null) return;
    if (problem.difficulty != null) {
        const difficulty = correctLowerRating(problem.difficulty).toFixed();
        problemTitle.style.color = colorRating(difficulty);
        if (problem.is_experimental) problemTitle.insertAdjacentHTML("beforebegin", "🧪");
        problemTitle.insertAdjacentHTML("beforebegin", generateDifficultyCircle(difficulty, 20));
    }
    else {
        problemTitle.style.color = "#17a2b8";
        const unavailableCircle = '<span style="margin-right: 5px;font-size: 24px;color: #fff;background-color: #17a2b8;padding-right: .6em;padding-left: .6em;border-radius: 10rem;display: inline-block;padding: .25em .4em;font-weight: 700;line-height: 1;text-align: center;white-space: nowrap;vertical-align: initial;transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;box-sizing: border-box;">?</span>';
        problemTitle.insertAdjacentHTML("beforebegin", unavailableCircle);
    }
}

// 推定難易度文字列を生成
function generateDifficultyText(difficulty, is_experimental) {
    // 推定難易度を補正して四捨五入
    difficulty = correctLowerRating(difficulty);
    difficulty = difficulty.toFixed();

    textValue = "<span style='font-weight: bold; color: " + colorRating(difficulty) + ";'>" + difficulty + "</span>";
    // textDiff = "<a href='https://kenkoooo.com/atcoder/#/table/" + userScreenName + "'>Difficulty</a>";
    textDiff = "Difficulty";

    return textDiff + ": " + textValue + (is_experimental ? " (🧪)" : "");
}

// 推定難易度表示を追加する
function addDifficultyText(problemId, estimatedDifficulties, problemStatus) {
    const problem = estimatedDifficulties[problemId];

    // 問題が存在しなければ終了
    if (problem == null) return;

    if (problem.difficulty != null) {
        // 難易度を表示する文字列を生成
        const text = generateDifficultyText(problem.difficulty, problem.is_experimental);
        problemStatus.insertAdjacentHTML('beforeend', " / " + text);
    } else
        problemStatus.insertAdjacentHTML('beforeend', " / Difficulty: <span style='font-weight: bold; color: #17a2b8;'>Unavailable</span>");
}

// AC、コンテスト中AC、ペナルティ数、AC時間を計算
function searchSubmissionsResult(submissions, endTimeEpoch) {
    const nonPenaltyJudge = ["AC", "CE", "IE", "WJ", "WR"];
    submissions.sort((a, b) => a.epoch_second - b.epoch_second);

    let accepted = false;
    let acceptedDuringContest = false;
    let penalties = 0;
    let acceptedTime = false;

    for (const item of submissions) {
        const duringContest = item.epoch_second <= endTimeEpoch;

        if (item.result == "AC") {
            accepted = true;
            if (duringContest && !acceptedDuringContest) {
                acceptedDuringContest = true;
                acceptedTime = item.epoch_second;
            }
        }

        if (!accepted && duringContest && !nonPenaltyJudge.includes(item.result)) {
            penalties++;
        }
    }

    return { accepted, acceptedDuringContest, penalties, acceptedTime };
}

function epochTime2HHMM(time) {
    return Math.floor(time / 60).toFixed() + ":" + (time % 60).toFixed().padStart(2, '0');
}

// ACしたか、AC時間、ペナルティ数を表示
function addIsSolvedText(problemId, userSubmissions, problemStatus, startTimeEpoch, endTimeEpoch) {
    const submissions = userSubmissions.filter(function (item, index) { if (item.problem_id == problemId) return true; });
    const submitted = submissions.length > 0;
    const { accepted, acceptedDuringContest, penalties, acceptedTime } = searchSubmissionsResult(submissions, endTimeEpoch);

    let text = "Is Solved: ";
    if (acceptedDuringContest) text += "<span style='font-weight: bold; color: green;'><u>✓</u></span>";
    else if (accepted) text += "<span style='font-weight: bold; color: green;'>✓</span>";
    else if (submitted) text += "<span style='font-weight: bold; color: orange;'>✘</span>";
    else text += "<span style='font-weight: bold; color: gray;'>✘</span>";

    if (acceptedDuringContest)
        text += " <span style='font-size: x-small; color: grey;'>" + epochTime2HHMM(acceptedTime - startTimeEpoch) + "</span> ";

    if (penalties > 0)
        text += " <span style='font-size: x-small; color: red;'>(" + penalties + ")</span> ";

    problemStatus.insertAdjacentHTML('beforeend', " / " + text);
}
