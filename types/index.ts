// key-moon/atcoder-problems-apiでプロパティが足りないので、こっちで定義する
export type Problem = {
  id: string;
  contest_id: string;
  problem_index: string;
  name: string;
  title: string;
};

export type MyScore = Problem & { score: number };

// key-moon/atcoder-problems-apiでプロパティが足りないので、こっちで定義する
export type ContestProblems = {
  contest_id: string;
  problem_id: string;
  problem_index: string;
};

// key-moon/atcoder-problems-apiでexportしていないので、こっちで定義する
export type SubmissionEntry = {
  id: number;
  /**  これは秒でDate.getTime()はミリ秒で単位が違うから変換して比較する */
  epoch_second: number;
  problem_id: string;
  contest_id: string;
  user_id: string;
  language: string;
  point: number;
  length: number;
  result: string;
  execution_time: number;
};
