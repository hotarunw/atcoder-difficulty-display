// ==UserScript==
// @name            AtCoderDifficultyDisplay
// @namespace       https://github.com/hotarunx
// @version         0.2
// @description     display a difficulty of AtCoder Problems.
// @description:ja  AtCoder ProblemsのDifficultyを表示します。
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
    if /**/ (rating < 0400) color = '#808080'; // gray
    else if (rating < 0800) color = '#804000'; // brown
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
    console.log("hello");
}

(function () {
    // URL of Estimated difficulties of the problems
    const CONTESTS_INFORMATION = "https://kenkoooo.com/atcoder/resources/contests.json";
    const SUBMISSION_API = "https://kenkoooo.com/atcoder/atcoder-api/results?user=" + userScreenName;
    const SUBMISSIONS_DATASET = "https://kenkoooo.com/atcoder/resources/problem-models.json";

    // fetch Information API
    fetch(SUBMISSIONS_DATASET)
        .then((response) => response.json())
        .then((jsonData) => {
            addDifficultyText(jsonData);
        });

    if (userScreenName != "") {
        fetch(CONTESTS_INFORMATION)
            .then((response) => response.json())
            .then((contestsData) => {

                fetch(SUBMISSION_API)
                    .then((response) => response.json())
                    .then((submissionData) => {

                        addSubmissionStatusText(contestsData, submissionData);
                    });
            });
    }

})();
