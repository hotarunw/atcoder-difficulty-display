import type { getEstimatedDifficulties } from "atcoder-problems-api/information";
import type { getSubmissions } from "atcoder-problems-api/submission";
import { Problem } from "atcoder-problems-api/types";

export type SubmissionEntry = (ReturnType<
  typeof getSubmissions
> extends Promise<infer P>
  ? P
  : never)[number];

export type ProblemModel = (ReturnType<
  typeof getEstimatedDifficulties
> extends Promise<infer P>
  ? P
  : never)[number];

export type ProblemModelEx = ProblemModel & {
  /** Difficultyの代わりに表示する説明 */
  extra_difficulty?: string;
};

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
    "atcoderDifficultyDisplayEstimatedDifficultieslastFetchedAt",
  ];

  /** 過去バージョンのlocalStorageデータを削除する */
  oldLocalStorageKeys.forEach((key) => {
    localStorage.removeItem(key);
  });
};

const getTypical90Difficulty = (title: string): number => {
  if (title.includes("★1")) return 149;
  if (title.includes("★2")) return 399;
  if (title.includes("★3")) return 799;
  if (title.includes("★4")) return 1199;
  if (title.includes("★5")) return 1599;
  if (title.includes("★6")) return 1999;
  if (title.includes("★7")) return 2399;
  return NaN;
};

const getTypical90Description = (title: string): string => {
  if (title.includes("★1")) return "200 点問題レベル";
  if (title.includes("★2")) return "300 点問題レベル";
  if (title.includes("★3")) return "";
  if (title.includes("★4")) return "400 点問題レベル";
  if (title.includes("★5")) return "500 点問題レベル";
  if (title.includes("★6")) return "これが安定して解ければ上級者です";
  if (title.includes("★7")) return "チャレンジ問題枠です";
  return "エラー: 競プロ典型 90 問の難易度読み取りに失敗しました";
};

export const addTypical90Difficulty = (
  problemModels: { [key: string]: ProblemModel },
  problems: Problem[]
): { [key: string]: ProblemModelEx } => {
  const models: { [key: string]: ProblemModelEx } = problemModels;
  const problemsT90 = problems.filter(
    (element) => element.contest_id === "typical90"
  );
  problemsT90.forEach((element) => {
    const difficulty = getTypical90Difficulty(element.title);

    const model: ProblemModelEx = {
      slope: NaN,
      intercept: NaN,
      variance: NaN,
      difficulty,
      discrimination: NaN,
      irt_loglikelihood: NaN,
      irt_users: NaN,
      is_experimental: false,
      extra_difficulty: `${getTypical90Description(element.title)}`,
    };
    models[element.id] = model;
  });
  return models;
};
