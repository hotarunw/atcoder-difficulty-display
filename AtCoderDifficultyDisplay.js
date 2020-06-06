// ==UserScript==
// @name            AtCoderDifficultyDisplay
// @namespace       https://github.com/hotarunx
// @version         0.3
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
    const CONTESTS_INFORMATION = "https://kenkoooo.com/atcoder/resources/contests.json";
    const SUBMISSION_API = "https://kenkoooo.com/atcoder/atcoder-api/results?user=" + userScreenName;
    const SUBMISSIONS_DATASET = "https://kenkoooo.com/atcoder/resources/problem-models.json";

    if (displayDifficulty)
        fetch(SUBMISSIONS_DATASET)
            .then((response) => response.json())
            .then((jsonData) => {
                addDifficultyText(jsonData);
            });

    if (displaySubmissionStatus && userScreenName != "")
        fetch(CONTESTS_INFORMATION)
            .then((response) => response.json())
            .then((contestsData) => {

                fetch(SUBMISSION_API)
                    .then((response) => response.json())
                    .then((submissionData) => {

                        addSubmissionStatusText(contestsData, submissionData);
                    });
            });


})();

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

// return rating color
function colorRating(rating) {
    let color = '#FFFFFF'; // white
    if /**/ (rating < 400) color = '#808080'; // gray
    else if (rating < 800) color = '#804000'; // brown
    else if (rating < 1200) color = '#008000'; // green
    else if (rating < 1600) color = '#00C0C0'; // cyan
    else if (rating < 2000) color = '#0000FF'; // blue
    else if (rating < 2400) color = '#C0C000'; // yellow
    else if (rating < 2800) color = '#FF8000'; // orange
    else if (rating < 3200) color = '#FF0000'; // red
    else if (rating < 3600) color = '#E4E4E4'; // silver
    else /*              */ color = '#FFD325'; // gold

    return color;
}

// correct rating under 400
// see https://qiita.com/anqooqie/items/92005e337a0d2569bdbd#%E6%80%A7%E8%B3%AA4-%E5%88%9D%E5%BF%83%E8%80%85%E3%81%B8%E3%81%AE%E6%85%88%E6%82%B2
function correctLowerRating(rating) {
    if (rating >= 400) return rating;

    do {
        rating = 400 / Math.exp((400 - rating) / 400);

    } while (rating < 0);

    return rating;
}

function generateDifficultyText(difficulty, is_experimental) {
    let text = " / ";

    difficulty = correctLowerRating(difficulty)

    // add difficulty value
    let colored_text = "Difficulty: ";
    if (is_experimental) colored_text += "🧪";
    colored_text += difficulty.toFixed();

    // color difficulty value
    const color = colorRating(difficulty);

    text += "<span style='color: " + color + ";'>" + colored_text + "</span>";

    return text;
}

function addDifficultyText(jsonData) {
    let text = "";

    // get id
    const path = location.pathname.split("/");
    const id = path[path.length - 1];

    // get Element of Problem Status
    let status = getElementOfProblemStatus();

    const problem = jsonData[id];
    // if problem exist in json
    if (problem != null && problem.difficulty != null) {
        text += generateDifficultyText(problem.difficulty, problem.is_experimental);
    }

    status.insertAdjacentHTML('beforeend', text);
}

function addSubmissionStatusText(contestsData, submissionData) {
    let text = "";

    // get (start,end)time from contests info API
    const contest = contestsData.filter(function (item, index) { if (item.id == contestScreenName) return true; })[0];
    const start = contest["start_epoch_second"];
    const duration = contest["duration_second"];
    const end = start + duration;

    const path = location.pathname.split("/");
    const id = path[path.length - 1];

    // get Element of Problem Status
    let status = getElementOfProblemStatus();

    // submission status
    let contest_accepted = false, accepted = false, contest_submitted = false, submitted = false;

    // search all submissions to this problem
    const submissions = submissionData.filter(function (item, index) { if (item.problem_id == id) return true; });
    for (const item of submissions) {
        const time = item["epoch_second"];

        // update submission status

        if (start <= time && time <= end) {
            contest_submitted = true;
        } else {
            submitted = true;
        }
        if (item["result"] == "AC") {
            accepted = true;
        }
        if ((start <= time && time <= end) && item["result"] == "AC") {
            contest_accepted = true;
        }

    }

    // generate text following submission status
    text += " / "

    if (contest_accepted) text += "<span style='color: #5CB85C;'>★Accepted</span>";
    else if (accepted) text += "<span style='color: #5CB85C;'>Accepted</span>";
    else if (submitted) text += "<span style='color: #F0AD4E;'>Trying</span>";
    else if (contest_submitted) text += "<span style='color: #F0AD4E;'>★Trying</span>";
    else text += "Trying";

    status.insertAdjacentHTML('beforeend', text);
}
