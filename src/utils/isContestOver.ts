import { contestID } from "./parser";

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
 * 次を判定
 * * コンテストが終了している
 * * コンテストが常設コンテスト
 */
export default () => {
  if (permanentContestIDs.includes(contestID)) return true;
  return Date.now() > endTime.valueOf();
};
