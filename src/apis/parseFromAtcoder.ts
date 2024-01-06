import { MyScore, SubmissionEntry } from "../../types";
import { contestId } from "../consts/atcoder";

/** 自分の得点状況ページから、問題名と得点をパースする */
export const parseMyScoresFromAtcoder = async () => {
  const res = await fetch(`https://atcoder.jp/contests/${contestId}/score`);
  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const scores: MyScore[] = [];

  const scoreHtml = await res.text();
  const doc = new DOMParser().parseFromString(scoreHtml, "text/html");
  const tableRows = doc.querySelectorAll<HTMLTableRowElement>("table tbody tr");

  for (let i = 0; i < tableRows.length; i++) {
    const element = tableRows[i];
    const problemIndex = (element?.children[0] as HTMLTableCellElement).innerText;
    const id =
      ((element?.children[0] as HTMLTableCellElement).firstElementChild as HTMLAnchorElement).pathname.split("/")[4] ??
      "";
    const name = (element?.children[1] as HTMLTableCellElement).innerText.trim();
    const score = Number((element?.children[2] as HTMLAnchorElement).innerText);
    const title = `${problemIndex}. ${name}`;

    scores.push({ id, contest_id: contestId ?? "", problem_index: problemIndex, name, title, score });
  }

  return scores;
};
/** 自分の提出ページから、提出結果もろもろをパースする */
export const parseMySubmissionsFromAtcoder = async () => {
  const res = await fetch(`https://atcoder.jp/contests/${contestId}/submissions/me`);
  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const submissions: SubmissionEntry[] = [];

  const submissionsHtml = await res.text();
  const doc = new DOMParser().parseFromString(submissionsHtml, "text/html");
  const tableRows = doc.querySelectorAll<HTMLTableRowElement>("table tbody tr");

  for (let i = 0; i < tableRows.length; i++) {
    const element = tableRows[i];
    const epochSecond = new Date((element?.children[0] as HTMLTableCellElement).innerText).getTime() / 1000;
    const pathname = ((element?.children[1] as HTMLTableCellElement).firstElementChild as HTMLAnchorElement).pathname;
    const contestId = pathname.split("/")[2] ?? "";
    const problemId = pathname.split("/")[4] ?? "";
    const userId =
      ((element?.children[2] as HTMLTableCellElement).firstElementChild as HTMLAnchorElement).pathname.split("/")[2] ??
      "";
    const language = (element?.children[3] as HTMLAnchorElement).innerText;
    const point = Number((element?.children[4] as HTMLAnchorElement).innerText);
    const length = parseInt((element?.children[5] as HTMLAnchorElement).innerText);
    const result = (element?.children[6] as HTMLAnchorElement).innerText;
    const executionTime = parseInt((element?.children[8] as HTMLAnchorElement).innerText);
    const id = Number(
      ((element?.children[9] as HTMLTableCellElement).firstElementChild as HTMLAnchorElement).pathname.split("/")[4],
    );

    submissions.push({
      epoch_second: epochSecond,
      contest_id: contestId,
      problem_id: problemId,
      user_id: userId,
      language,
      point,
      length,
      result,
      execution_time: executionTime,
      id,
      // 使わない値だし値取得が面倒だから仮の値を設定した
    });
  }

  return submissions;
};
