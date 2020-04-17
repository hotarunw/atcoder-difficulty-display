// ==UserScript==
// @name            AtCoderDifficultyDisplay
// @namespace       https://github.com/hotarunx
// @version         0.1
// @description     display a difficulty of AtCoder Problems.
// @description:ja  AtCoder ProblemsのDifficultyを表示します。
// @author          hotarunx
// @match           https://atcoder.jp/contests/*/tasks/*
// @grant           none
// @connect         https://kenkoooo.com/atcoder/resources/*
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

(function () {
    // URL of Estimated difficulties of the problems
    const url = "https://kenkoooo.com/atcoder/resources/problem-models.json";

    // get id
    const path = location.pathname.split("/");
    const id = path[path.length - 1];

    // get Element of Problem Status
    let element_status = getElementOfProblemStatus();

    // fetch Information API
    this.fetch(url)
        .then(function (data) {
            return data.json();
        })
        .then(function (json) {
            // search problem
            const problem = json[id];

            // if problem exist in json
            if (problem != null) {
                const difficulty = problem.difficulty;

                // if difficulty is exist
                if (difficulty != null) {
                    element_status.textContent += " / ";

                    // add difficulty value
                    let add_text = "Difficulty: ";
                    if (problem.is_experimental) add_text += "🧪";
                    add_text += difficulty.toFixed();

                    // color difficulty value
                    const color = colorRating(difficulty);

                    const add_span = "<span style='color: " + color + ";'>" + add_text + "</span>";

                    element_status.innerHTML += add_span;
                }
            }
        })
})();
