import type { getSubmissions } from "atcoder-problems-api/submission";
import { nonPenaltyJudge } from "./index";
import { contestID, taskID } from "./parser";

export type SubmissionEntry = (ReturnType<
  typeof getSubmissions
> extends Promise<infer P>
  ? P
  : never)[number];

export type analyzeReturn = {
  before: {
    maxScore: SubmissionEntry | undefined;
    firstAc: SubmissionEntry | undefined;
    representative: SubmissionEntry | undefined;
  };
  during: {
    maxScore: SubmissionEntry | undefined;
    firstAc: SubmissionEntry | undefined;
    representative: SubmissionEntry | undefined;
    penalties: number;
  };
  after: {
    maxScore: SubmissionEntry | undefined;
    firstAc: SubmissionEntry | undefined;
    representative: SubmissionEntry | undefined;
  };
  another: {
    maxScore: SubmissionEntry | undefined;
    firstAc: SubmissionEntry | undefined;
    representative: SubmissionEntry | undefined;
  };
};

/**
 * 得点が最大の提出を返す
 */
const parseMaxScore = (submissionsArg: SubmissionEntry[]) => {
  if (submissionsArg.length === 0) {
    return undefined;
  }
  const maxScore = submissionsArg.reduce((left, right) =>
    left.point > right.point ? left : right
  );
  return maxScore;
};

/**
 * ペナルティ数を数える
 */
const parsePenalties = (submissionsArg: SubmissionEntry[]) => {
  let penalties = 0;
  let hasAccepted = false;
  submissionsArg.forEach((element) => {
    hasAccepted = element.result === "AC" || hasAccepted;
    if (!hasAccepted && nonPenaltyJudge.includes(element.result)) {
      penalties += 1;
    }
  });

  return penalties;
};

/**
 * 最初にACした提出を返す
 */
const parseFirstAcceptedTime = (submissionsArg: SubmissionEntry[]) => {
  const ac = submissionsArg.filter((element) => element.result === "AC");
  return ac[0];
};

/**
 * 代表的な提出を返す
 * 1. 最後にACした提出
 * 2. 最後の提出
 * 3. undefined
 */
const parseRepresentativeSubmission = (submissionsArg: SubmissionEntry[]) => {
  const ac = submissionsArg.filter((element) => element.result === "AC");
  const nonAC = submissionsArg.filter((element) => element.result !== "AC");

  if (ac.length > 0) return ac.slice(-1)[0];
  if (nonAC.length > 0) return nonAC.slice(-1)[0];
  return undefined;
};

/**
 * 提出をパースして最大得点 ペナルティ数を返す
 * 対象: コンテスト前,中,後の提出 別コンテストの同じ問題への提出
 * 返す情報: 最大得点 ペナルティ数 ACするまでの時間  最後のAC無ければ最後の提出
 */
export const analyzeSubmissions = (
  submissionsArg: SubmissionEntry[]
): analyzeReturn => {
  const submissions = submissionsArg.filter(
    (element) => element.problem_id === taskID
  );

  const beforeContest = submissions.filter(
    (element) =>
      element.contest_id === contestID &&
      element.epoch_second < startTime.unix()
  );

  const duringContest = submissions.filter(
    (element) =>
      element.contest_id === contestID &&
      element.epoch_second >= startTime.unix() &&
      element.epoch_second < endTime.unix()
  );

  const afterContest = submissions.filter(
    (element) =>
      element.contest_id === contestID && element.epoch_second >= endTime.unix()
  );

  const anotherContest = submissions.filter(
    (element) => element.contest_id !== contestID
  );

  return {
    before: {
      maxScore: parseMaxScore(beforeContest),
      firstAc: parseFirstAcceptedTime(beforeContest),
      representative: parseRepresentativeSubmission(beforeContest),
    },
    during: {
      maxScore: parseMaxScore(duringContest),
      firstAc: parseFirstAcceptedTime(duringContest),
      representative: parseRepresentativeSubmission(duringContest),
      penalties: parsePenalties(duringContest),
    },
    after: {
      maxScore: parseMaxScore(afterContest),
      firstAc: parseFirstAcceptedTime(afterContest),
      representative: parseRepresentativeSubmission(afterContest),
    },
    another: {
      maxScore: parseMaxScore(anotherContest),
      firstAc: parseFirstAcceptedTime(anotherContest),
      representative: parseRepresentativeSubmission(anotherContest),
    },
  };
};
