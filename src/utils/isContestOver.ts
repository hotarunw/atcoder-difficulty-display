import { contestID, URL } from "./parser";

/** 常設コンテストID一覧 */
const permanentContestIDs = [
  "practice",
  "APG4b",
  "abs",
  "practice2",
  "typical90",
  "math-and-algorithm",
  "tessoku-book",
];

/**
 * 開いているページのコンテストが終了していればtrue \
 * 例外処理として以下の場合もtrueを返す
 * * コンテストが常設コンテスト
 * * コンテストのページ以外にいる <https://atcoder.jp/contests/*>
 */
export default () => {
  if (!(URL[3] === "contests" && URL.length >= 5)) return true;
  if (permanentContestIDs.includes(contestID)) return true;
  return Date.now() > endTime.valueOf();
};
