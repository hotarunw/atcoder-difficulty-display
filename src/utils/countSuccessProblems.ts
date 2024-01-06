import { SubmissionEntry } from "../../types";
import { findRepresentativeSubmissions } from "./findRepresentativeSubmissions";

export const countSuccessProblems = (
  submissions: SubmissionEntry[],
  contestId: string,
  problemIds: string[],
): number => {
  let count = 0;
  for (const iterator of problemIds) {
    const s = findRepresentativeSubmissions(submissions, contestId, iterator).isSolvedStatus;
    if (s === "successBefore" || s === "successIntime" || s === "success") {
      count += 1;
    }
  }
  return count;
};

export const countSuccessIntimeProblems = (
  submissions: SubmissionEntry[],
  contestId: string,
  problemIds: string[],
): number => {
  let count = 0;
  for (const iterator of problemIds) {
    const s = findRepresentativeSubmissions(submissions, contestId, iterator).isSolvedStatus;
    // コンテスト前も含めることにする
    if (s === "successBefore" || s === "successIntime") {
      count += 1;
    }
  }
  return count;
};
