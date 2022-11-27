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
    if (!hasAccepted && !nonPenaltyJudge.includes(element.result)) {
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
 * 提出をパースして情報を返す
 * 対象: コンテスト前,中,後の提出 別コンテストの同じ問題への提出
 * 返す情報: 得点が最大の提出 最初のACの提出 代表的な提出 ペナルティ数
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

export type Period = "before" | "during" | "after" | "another";

/**
 * 提出状況を表すラベルを生成
 */
export const generateStatusLabel = (
  submission: SubmissionEntry | undefined,
  type: Period
) => {
  if (submission === undefined) {
    return "";
  }

  const isAC = submission.result === "AC";

  let className = "";
  switch (type) {
    case "before":
      className = "label-primary";
      break;
    case "during":
      className = isAC ? "label-success" : "label-warning";
      break;
    case "after":
      className = isAC
        ? "label-success-after-contest"
        : "label-warning-after-contest";
      break;
    case "another":
      className = "label-default";
      break;
    default:
      break;
  }

  let content = "";
  switch (type) {
    case "before":
      content = "コンテスト前の提出";
      break;
    case "during":
      content = "コンテスト中の提出";
      break;
    case "after":
      content = "コンテスト後の提出";
      break;
    case "another":
      content = "別コンテストの同じ問題への提出";
      break;
    default:
      break;
  }

  const href = `https://atcoder.jp/contests/${submission.contest_id}/submissions/${submission.id}`;

  return `<span class="label ${className}"
      data-toggle="tooltip" data-placement="bottom" title="${content}">
      <a class="label-status-a" href=${href}>${submission.result}</a>
    </span> `;
};

/**
 * ペナルティ数を表示
 */
export const generatePenaltiesCount = (penalties: number) => {
  if (penalties <= 0) {
    return "";
  }

  const content = "コンテスト中のペナルティ数";

  return `<span data-toggle="tooltip" data-placement="bottom" title="${content}"class="difficulty-red" style='font-weight: bold; font-size: x-small;'>
            (${penalties.toString()})
          </span>`;
};

/**
 * 最初のACの時間を表示
 */
export const generateFirstAcTime = (
  submission: SubmissionEntry | undefined
) => {
  if (submission === undefined) {
    return "";
  }

  const content = "提出時間";

  const href = `https://atcoder.jp/contests/${submission.contest_id}/submissions/${submission.id}`;

  const elapsed = submission.epoch_second - startTime.unix();
  const elapsedSeconds = elapsed % 60;
  const elapsedMinutes = Math.trunc(elapsed / 60);

  return `<span data-toggle="tooltip" data-placement="bottom" title="${content}">
          <a class="difficulty-orange" style='font-weight: bold; font-size: x-small;' href=${href}>
            ${elapsedMinutes}:${elapsedSeconds}
          </a>
        </span>`;
};

/**
 * マラソン用に得点を表示するスパンを生成
 */
export const generateScoreSpan = (
  submission: SubmissionEntry | undefined,
  type: Period
) => {
  if (submission === undefined) {
    return "";
  }

  // マラソン用を考えているのでとりあえず1万点未満は表示しない
  if (submission.point < 10000) {
    return "";
  }

  let className = "";
  switch (type) {
    case "before":
      className = "difficulty-blue";
      break;
    case "during":
      className = "difficulty-green";
      break;
    case "after":
      className = "difficulty-yellow";
      break;
    case "another":
      className = "difficulty-grey";
      break;
    default:
      break;
  }

  let content = "";
  switch (type) {
    case "before":
      content = "コンテスト前の提出";
      break;
    case "during":
      content = "コンテスト中の提出";
      break;
    case "after":
      content = "コンテスト後の提出";
      break;
    case "another":
      content = "別コンテストの同じ問題への提出";
      break;
    default:
      break;
  }

  const href = `https://atcoder.jp/contests/${submission.contest_id}/submissions/${submission.id}`;

  return `<span
      data-toggle="tooltip" data-placement="bottom" title="${content}">
        <a class="${className}" style='font-weight: bold;' href=${href}>
          ${submission.point}
        </a>
    </span> `;
};
