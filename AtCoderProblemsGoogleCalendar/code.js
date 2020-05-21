// ==UserScript==
// @name         AtCoderProblemsGoogleCalendar
// @namespace    https://github.com/hotarunx
// @version      0.1
// @description  AtCoder Problems Virtual ContestにコンテストをGoogle Calendarに追加するリンクを生成する
// @author       hotarunx
// @include      https://kenkoooo.com/atcoder/#/contest/show/*
// @grant        none
// @license      MIT
// ==/UserScript==

window.onload = function () {
    // Contest Title, Descriptionを取得
    const contestName = document.querySelector(".col-sm-12 h1").textContent;
    const contestDescription = document.querySelector(".col-sm-12 h4").textContent;


    // Start time, End timeを取得
    const times = document.querySelector("#root > div > div.my-5.container > div:nth-child(2) > div > table > tbody > tr:nth-child(2) > td").textContent;
    const startTime = times.replace(" - ", " (").split(" (")[0]; // 例: 2020-05-21 07:30:00
    const endTime = times.replace(" - ", " (").split(" (")[2];

    // ISO 8601基本形式に変換
    const startTimeFored = startTime.replace(/-/g, '').replace(' ', 'T').replace(/:/g, '');
    const endTimeFored = startTime.replace(/-/g, '').replace(' ', 'T').replace(/:/g, '');


    // 予定を追加するリンクを生成
    const googleCalendarUrl = 'http://www.google.com/calendar/event?' +
        'action=' + 'TEMPLATE' +
        '&text=' + contestName +
        '&dates=' + startTimeFored + '/' + endTimeFored +
        '&details=' + location.href + "\n" + contestDescription;

    // Tweetボタンの隣にリンクを追加する
    // ボタングループの場所を取得
    const buttonGroup = document.querySelector("#root > div > div.my-5.container > div:nth-child(3) > div > div");
    // ボタンの要素を生成
    const googleCalendarUrlButton = `<a href='${googleCalendarUrl}' rel="noopener noreferrer" target="_blank" class="btn btn-primary">Create Event</a>`;
    // ボタンを追加
    buttonGroup.insertAdjacentHTML('beforeend', googleCalendarUrlButton);
};
