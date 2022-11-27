export const nonPenaltyJudge = ["AC", "CE", "IE", "WJ", "WR"];

/** 設定 ネタバレ防止のID, Key */
export const hideDifficultyID = "hide-difficulty-atcoder-difficulty-display";

/**
 * 後方互換処理
 */
export const backwardCompatibleProcessing = () => {
  const oldLocalStorageKeys = [
    "atcoderDifficultyDisplayUserSubmissions",
    "atcoderDifficultyDisplayUserSubmissionslastFetchedAt",
    "atcoderDifficultyDisplayEstimatedDifficulties",
  ];

  /** 過去バージョンのlocalStorageデータを削除する */
  oldLocalStorageKeys.forEach((key) => {
    localStorage.removeItem(key);
  });
};
