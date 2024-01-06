import { contestId, userId } from "./atcoder";

export const lscacheKeyTop = `https://atcoder.jp/contests/${contestId}`;
export const lscacheKeyMyScores = `https://atcoder.jp/contests/${contestId}/score`;
export const lscacheKeyMySubmissions = `https://atcoder.jp/contests/${contestId}/submissions?f.User=${userId}`;
