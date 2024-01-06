import lscache from "lscache";
import { MyScore, SubmissionEntry } from "../../types";

import { lscacheKeyMyScores, lscacheKeyMySubmissions } from "../consts/lscacheKey";
import { parseMyScoresFromAtcoder, parseMySubmissionsFromAtcoder } from "./parseFromAtcoder";

export const fetchMyScoresFromAtcoder = async (): Promise<MyScore[]> => {
  // キャッシュがまだ有効ならキャッシュを読む
  const scoresLs = lscache.get(lscacheKeyMyScores) as MyScore[] | null;
  if (scoresLs != null) {
    return scoresLs;
  }
  // AtCoderの自分の得点状況ページをパースしてキャッシュする
  try {
    const scoresA = await parseMyScoresFromAtcoder();
    // 負荷が問題になっているので、有効期限10分と長めにキャッシュする
    lscache.set(lscacheKeyMyScores, scoresA, 10);
    return scoresA;
  } catch (_error) {
    // 何らかの原因でAtCoderのページのリクエストに失敗したときは、空の配列をキャッシュして、連続でAtCoderのページをリクエストしないようにする
    lscache.set(lscacheKeyMyScores, [], 10);
    return [];
  }
};

export const fetchMySubmissionsFromAtcoder = async (): Promise<SubmissionEntry[]> => {
  // キャッシュがまだ有効ならキャッシュを読む
  const submissionsLs = lscache.get(lscacheKeyMySubmissions) as SubmissionEntry[] | null;
  if (submissionsLs != null) {
    return submissionsLs;
  }
  // AtCoderの自分の提出一覧ページをパースしてキャッシュする
  try {
    const submissionsA = await parseMySubmissionsFromAtcoder();
    // 負荷が問題になっているので、有効期限10分と長めにキャッシュする
    lscache.set(lscacheKeyMySubmissions, submissionsA, 10);
    return submissionsA;
  } catch (_error) {
    // 何らかの原因でAtCoderのページのリクエストに失敗したときは、空の配列をキャッシュして、連続でAtCoderのページをリクエストしないようにする
    lscache.set(lscacheKeyMySubmissions, [], 10);
    return [];
  }
};
