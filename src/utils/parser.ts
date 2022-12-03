// AtCoderの問題ページをパースする

/**
 * URLをパースする パラメータを消す \
 * 例: in:  https://atcoder.jp/contests/abc210?lang=en \
 * 例: out: (5)['https:', '', 'atcoder.jp', 'contests', 'abc210']
 */
export const parseURL = (url: string) => {
  // 区切り文字`/`で分割する
  // ?以降の文字列を削除してパラメータを削除する
  return url.split("/").map((x) => x.replace(/\?.*/i, ""));
};

export const URL = parseURL(window.location.href);

/**
 * 表セル要素から、前の要素のテキストが引数と一致する要素を探す
 * 個別の提出ページで使うことを想定
 * 例: searchSubmissionInfo(["問題", "Task"])
 */
const searchSubmissionInfo = (key: string[]) => {
  const tdTags = document.getElementsByTagName("td");
  const tdTagsArray = Array.prototype.slice.call(
    tdTags
  ) as HTMLTableCellElement[];

  return tdTagsArray.filter((elem) => {
    const prevElem = elem.previousElementSibling;
    const text = prevElem?.textContent;
    if (typeof text === "string") return key.includes(text);
    return false;
  })[0];
};

/** コンテストタイトル 例: AtCoder Beginner Contest 210 */
export const contestTitle =
  document.getElementsByClassName("contest-title")[0]?.textContent ?? "";

/** コンテストID 例: abc210 */
export const contestID = URL[4] ?? "";

/**
 * ページ種類 \
 * 基本的にコンテストIDの次のパス
 * ### 例外
 * 個別の問題: task
 * 個別の提出: submission
 * 個別の問題ページで解説ボタンを押すと遷移する個別の問題の解説一覧ページ: task_editorial
 */
export const pageType = ((): string => {
  if (URL.length < 6) return "";
  if (URL.length >= 7 && URL[5] === "submissions" && URL[6] !== "me")
    return "submission";
  if (URL.length >= 8 && URL[5] === "tasks" && URL[7] === "editorial")
    return "task_editorial";
  if (URL.length >= 7 && URL[5] === "tasks") return "task";
  return URL[5] ?? "";
})();

/** 問題ID 例: abc210_a */
export const taskID = ((): string => {
  if (pageType === "task") {
    // 問題ページでは、URLから問題IDを取り出す
    return URL[6] ?? "";
  }
  if (pageType === "submission") {
    // 個別の提出ページでは、問題リンクのURLから問題IDを取り出す
    // 提出情報の問題のURLを取得する
    const taskCell = searchSubmissionInfo(["問題", "Task"]);
    if (!taskCell) return "";
    const taskLink = taskCell.getElementsByTagName("a")[0];
    if (!taskLink) return "";
    const taskUrl = parseURL(taskLink.href);

    const taskIDParsed = taskUrl[6] ?? "";
    return taskIDParsed;
  }
  return "";
})();

/** 問題名 例: A - Cabbages */
export const taskTitle = ((): string => {
  if (pageType === "task") {
    // 問題ページでは、h2から問題名を取り出す
    return (
      document
        .getElementsByClassName("h2")[0]
        ?.textContent?.trim()
        .replace(/\n.*/i, "") ?? ""
    );
  }
  if (pageType === "submission") {
    // 個別の提出ページでは、問題リンクのテキストから問題名を取り出す
    // 提出情報の問題のテキストを取得する
    const taskCell = searchSubmissionInfo(["問題", "Task"]);
    if (!taskCell) return "";
    const taskLink = taskCell.getElementsByTagName("a")[0];
    if (!taskLink) return "";
    return taskLink.textContent ?? "";
  }
  return "";
})();

/** 提出ユーザー 例: machikane */
export const submissionsUser = ((): string => {
  if (pageType !== "submission") return "";
  // 個別の提出ページのとき

  const userCell = searchSubmissionInfo(["ユーザ", "User"]);
  if (!userCell) return "";

  return userCell?.textContent?.trim() ?? "";
})();

/** 提出結果 例: AC */
export const judgeStatus = ((): string => {
  if (pageType !== "submission") return "";
  // 個別の提出ページのとき

  const statusCell = searchSubmissionInfo(["結果", "Status"]);
  if (!statusCell) return "";

  return statusCell?.textContent?.trim() ?? "";
})();

/** 得点 例: 100 */
export const judgeScore = ((): number => {
  if (pageType !== "submission") return 0;
  // 個別の提出ページのとき

  const scoreCell = searchSubmissionInfo(["得点", "Score"]);
  if (!scoreCell) return 0;

  return parseInt(scoreCell?.textContent?.trim() ?? "0", 10);
})();
