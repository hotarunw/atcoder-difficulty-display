import { SubmissionEntry } from "../../types";
import { contestEndTime, contestStartTime, nonPenaltyJudgeStatuses } from "../consts/atcoder";

export type IsSolvedStatus = "successBefore" | "successIntime" | "success" | "warningIntime" | "warning" | undefined;
export type RepresentativeSubmissions = {
  before: {
    maxScore: SubmissionEntry | undefined;
    firstAc: SubmissionEntry | undefined;
    latest: SubmissionEntry | undefined;
    latestAc: SubmissionEntry | undefined;
  };
  intime: {
    maxScore: SubmissionEntry | undefined;
    firstAc: SubmissionEntry | undefined;
    latest: SubmissionEntry | undefined;
    latestAc: SubmissionEntry | undefined;
    penalties: number;
  };
  after: {
    maxScore: SubmissionEntry | undefined;
    firstAc: SubmissionEntry | undefined;
    latest: SubmissionEntry | undefined;
    latestAc: SubmissionEntry | undefined;
  };
  another: {
    maxScore: SubmissionEntry | undefined;
    firstAc: SubmissionEntry | undefined;
    latest: SubmissionEntry | undefined;
    latestAc: SubmissionEntry | undefined;
  };
  isSolvedStatus: IsSolvedStatus;
};

/**
 * 得点が最大の提出を返す
 */
const findSubmissionWithMaxScore = (submissions: SubmissionEntry[]) => {
  if (submissions.length === 0) {
    return undefined;
  }
  return submissions.reduce((left, right) => (left.point > right.point ? left : right));
};

/**
 * ペナルティ数を数える
 */
const countPenalties = (submissions: SubmissionEntry[]) => {
  submissions.sort((a, b) => a.epoch_second - b.epoch_second);
  let penalties = 0;
  for (const iterator of submissions) {
    if (iterator.result === "AC") {
      return penalties;
    }
    if (!nonPenaltyJudgeStatuses.includes(iterator.result)) {
      penalties += 1;
    }
  }
  return penalties;
};

/**
 * 最初にACした提出を返す
 */
const findFirstAcceptedSubmission = (submissions: SubmissionEntry[]) => {
  submissions.sort((a, b) => a.epoch_second - b.epoch_second);
  const ac = submissions.filter((element) => element.result === "AC");
  return ac[0];
};

/**
 * 最後にACした提出を返す
 */
const findLatestAcceptedSubmission = (submissions: SubmissionEntry[]) => {
  submissions.sort((a, b) => a.epoch_second - b.epoch_second);
  const ac = submissions.filter((element) => element.result === "AC");
  return ac.slice(-1)[0];
};

/**
 * 最後の提出を返す
 */
const findLatestSubmission = (submissions: SubmissionEntry[]) => {
  submissions.sort((a, b) => a.epoch_second - b.epoch_second);
  return submissions.slice(-1)[0];
};

/**
 * 提出をパースして情報を返す
 * 対象: コンテスト前,中,後の提出 別コンテストの同じ問題への提出
 * 返す情報: 得点が最大の提出 最初のACの提出 最後のACの提出 最後の提出 ペナルティ数
 */
export const findRepresentativeSubmissions = (
  submissionsArg: SubmissionEntry[],
  contestId: string,
  problemId: string,
): RepresentativeSubmissions => {
  const submissions = submissionsArg.filter((element) => element.problem_id === problemId);
  submissions.sort((a, b) => a.epoch_second - b.epoch_second); // 必ずソートが必要なので最初にソートしておく

  const submissionsBeforeContest = submissions.filter(
    (element) => element.contest_id === contestId && element.epoch_second < contestStartTime.getTime() / 1000,
  );

  const submissionsInTime = submissions.filter(
    (element) =>
      element.contest_id === contestId &&
      element.epoch_second >= contestStartTime.getTime() / 1000 &&
      element.epoch_second < contestEndTime.getTime() / 1000,
  );

  const submissionsAfterContest = submissions.filter(
    (element) => element.contest_id === contestId && element.epoch_second >= contestEndTime.getTime() / 1000,
  );

  const submissionsAtAnotherContest = submissions.filter((element) => element.contest_id !== contestId);

  const before = {
    maxScore: findSubmissionWithMaxScore(submissionsBeforeContest),
    firstAc: findFirstAcceptedSubmission(submissionsBeforeContest),
    latestAc: findLatestAcceptedSubmission(submissionsBeforeContest),
    latest: findLatestSubmission(submissionsBeforeContest),
  };
  const intime = {
    maxScore: findSubmissionWithMaxScore(submissionsInTime),
    firstAc: findFirstAcceptedSubmission(submissionsInTime),
    latestAc: findLatestAcceptedSubmission(submissionsInTime),
    latest: findLatestSubmission(submissionsInTime),
    penalties: countPenalties(submissionsInTime),
  };
  const after = {
    maxScore: findSubmissionWithMaxScore(submissionsAfterContest),
    firstAc: findFirstAcceptedSubmission(submissionsAfterContest),
    latestAc: findLatestAcceptedSubmission(submissionsAfterContest),
    latest: findLatestSubmission(submissionsAfterContest),
  };
  const another = {
    maxScore: findSubmissionWithMaxScore(submissionsAtAnotherContest),
    firstAc: findFirstAcceptedSubmission(submissionsAtAnotherContest),
    latestAc: findLatestAcceptedSubmission(submissionsAtAnotherContest),
    latest: findLatestSubmission(submissionsAtAnotherContest),
  };

  const isSolvedStatus = ((): IsSolvedStatus => {
    if (before.latestAc != null) {
      return "successBefore";
    }
    if (intime.latestAc?.result === "AC") {
      return "successIntime";
    }
    if (after.latestAc?.result === "AC") {
      return "success";
    }
    if (intime.latest != null) {
      return "warningIntime";
    }
    if (after.latest != null) {
      return "warning";
    }
    return undefined;
  })();

  return {
    before,
    intime,
    after,
    another,
    isSolvedStatus,
  };
};
