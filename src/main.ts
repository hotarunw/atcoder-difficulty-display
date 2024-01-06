import { getContests, getContestsAndProblems, getProblems } from "atcoder-problems-api/information";
import { getSubmissions } from "atcoder-problems-api/submission";

import { fetchMyScoresFromAtcoder, fetchMySubmissionsFromAtcoder } from "./apis/api";
import { contestId, userId } from "./consts/atcoder";

import { ContestProblems, Problem, SubmissionEntry } from "../types";

import lscache from "lscache";
import { constructGMConfig } from "./components/config";

import { RepresentativeSubmissions, findRepresentativeSubmissions } from "./utils/findRepresentativeSubmissions";
(async () => {
  lscache.flushExpired();
  // 旧バージョンのローカルストレージを消す
  localStorage.removeItem("atcoderDifficultyDisplayUserSubmissions");
  localStorage.removeItem("atcoderDifficultyDisplayUserSubmissionslastFetchedAt");
  localStorage.removeItem("atcoderDifficultyDisplayEstimatedDifficulties");
  localStorage.removeItem("atcoderDifficultyDisplayEstimatedDifficultieslastFetchedAt");

  const config = constructGMConfig();

  // APIコール
  const [contests, problems, contestProblems, submissions] = await Promise.all([
    getContests(),
    getProblems() as unknown as Problem[],
    getContestsAndProblems() as unknown as ContestProblems[],
    userId != null ? getSubmissions(userId) : <SubmissionEntry[]>[],
  ]);
  const scoresFromAtcoder = new Map<string, number>();

  // AtCoder Problemsがまだクロールしていないコンテストならば、AtCoderのページから問題、自分の提出一覧を取得する
  if (!contests.some((element) => element.id === contestId)) {
    const [problemsFromAtcoder, submissionsFromAtCoder] = await Promise.all([
      fetchMyScoresFromAtcoder(),
      fetchMySubmissionsFromAtcoder(),
    ]);

    problems.concat(problemsFromAtcoder);
    submissions.concat(submissionsFromAtCoder);
    for (const iterator of problemsFromAtcoder) {
      contestProblems.push({
        contest_id: iterator.contest_id,
        problem_id: iterator.id,
        problem_index: iterator.problem_index,
      });
    }
    // 得点ページから得点を取り問題解いたか判定する 提出一覧は1ページしか取得しないので2ページあると困る
    for (const iterator of problemsFromAtcoder) {
      scoresFromAtcoder.set(iterator.id, iterator.score);
    }
  }

  const contestProblemsHere = contestProblems.filter((element2) => element2.contest_id === contestId);
  // Problems Informationのcontest_idでフィルターするとABSの問題など再出題された問題が取得できないので
  // Pairs of Contests and Problemsでフィルターする
  const problemsHere = problems.filter((element) => {
    return contestProblemsHere.some((element2) => element2.problem_id === element.id);
  });
  const submissionsHere = submissions.filter((element) => element.contest_id === contestId);

  const representativeSubmissions = new Map<string, RepresentativeSubmissions>();
  for (const iterator of problemsHere) {
    representativeSubmissions.set(
      iterator.id,
      findRepresentativeSubmissions(submissions, iterator.contest_id, iterator.id),
    );
  }
})();
