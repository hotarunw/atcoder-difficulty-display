import type { getEstimatedDifficulties } from "atcoder-problems-api/information";
import type { getSubmissions } from "atcoder-problems-api/submission";
// HACK: もっとスマートに呼ぶ方法はある?
// atcoder-problems-apiをバンドルせずに型だけ呼び出す
// ユーザースクリプトの@requireで呼ぶためバンドルは不要
import difficultyCircle from "./components/difficultyCircle";
import html from "./components/setting.html";
import css from "./style/_custom.scss";
import {
  analyzeSubmissions,
  generateFirstAcTime,
  generatePenaltiesCount,
  generateScoreSpan,
  generateStatusLabel,
} from "./utils/analyzeSubmissions";
import {
  getElementOfProblemStatus,
  getElementsColorizable,
} from "./utils/getElementsColorizable";
import isContestOver from "./utils/isContestOver";
import { taskID, URL } from "./utils/parser";
import { clipDifficulty, getRatingColorClass } from "./utils/problemsIndex";

/**
 * コンテストページ <https://atcoder.jp/contests/*> の処理 \
 * メインの処理
 */
const contestPageProcess = async () => {
  // コンテスト終了前は不要なので無効化する
  if (!isContestOver()) return;

  // FIXME: ダークテーマ対応
  GM_addStyle(css);

  // 難易度取得
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const problemModels = await getEstimatedDifficulties();
  // TODO: 競プロ典型90問対応
  // FIXME: JOI非公式難易度表対応

  // 提出取得
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const submissions = await getSubmissions(userScreenName);
  console.log("submissions :>> ", submissions);

  // 色付け対象の要素の配列を取得する
  // 難易度が無いものを除く
  const elementsColorizable = getElementsColorizable().filter(
    (element) => element.taskID in problemModels
  );

  // 問題ステータス（個別の問題ページの実行時間制限とメモリ制限が書かれた部分）を取得する
  const elementProblemStatus = getElementOfProblemStatus();

  /**
   * 色付け処理を実行する
   */
  const colorizeElement = () => {
    // 問題見出し、問題リンクを色付け
    elementsColorizable.forEach((element) => {
      const model = problemModels[element.taskID];
      // 難易度がUnavailableならばdifficultyプロパティが無い
      // difficultyの値をNaNとする
      const difficulty = clipDifficulty(model?.difficulty ?? NaN);
      console.log("model :>> ", model);
      // 色付け
      if (!Number.isNaN(difficulty)) {
        const color = getRatingColorClass(difficulty);
        // eslint-disable-next-line no-param-reassign
        element.element.classList.add(color);
      } else {
        element.element.classList.add("difficulty-unavailable");
      }

      // 🧪追加
      if (model?.is_experimental) {
        element.element.insertAdjacentText("afterbegin", "🧪");
      }

      // ◒難易度円追加
      element.element.insertAdjacentHTML(
        element.afterbegin ? "afterbegin" : "beforebegin",
        difficultyCircle(difficulty, element.big)
      );
    });

    // 個別の問題ページのところに難易度等情報を追加
    if (elementProblemStatus) {
      // 難易度の値を表示する

      // 難易度推定の対象外なら、この値はundefined
      const model = problemModels[taskID];

      // 難易度がUnavailableのときはdifficultyの値をNaNとする
      // 難易度がUnavailableならばdifficultyプロパティが無い
      const difficulty = clipDifficulty(model?.difficulty ?? NaN);
      console.log("model :>> ", model);

      // 色付け
      let className = "";
      if (difficulty) {
        className = getRatingColorClass(difficulty);
      } else if (model) {
        className = "difficulty-unavailable";
      } else {
        className = "";
      }

      // Difficultyの値設定
      let value = "";
      if (difficulty) {
        value = difficulty.toString();
      } else if (model) {
        value = "Unavailable";
      } else {
        value = "None";
      }
      // 🧪追加
      const experimentalText = model?.is_experimental ? "🧪" : "";

      const content = `${experimentalText}${value}`;

      elementProblemStatus.insertAdjacentHTML(
        "beforeend",
        ` / Difficulty:
        <span style='font-weight: bold;' class="${className}">${content}</span>`
      );

      /** この問題への提出 提出時間ソート済みと想定 */
      const thisTaskSubmissions = submissions.filter(
        (element) => element.problem_id === taskID
      );
      const analyze = analyzeSubmissions(thisTaskSubmissions);

      // コンテスト前中後外の提出状況 コンテスト中の解答時間とペナルティ数を表示する
      let statuesHTML = "";
      statuesHTML += generateStatusLabel(
        analyze.before.representative,
        "before"
      );
      statuesHTML += generateStatusLabel(
        analyze.during.representative,
        "during"
      );
      statuesHTML += generateStatusLabel(analyze.after.representative, "after");
      statuesHTML += generateStatusLabel(
        analyze.another.representative,
        "another"
      );
      statuesHTML += generatePenaltiesCount(analyze.during.penalties);
      statuesHTML += generateFirstAcTime(analyze.during.firstAc);

      if (statuesHTML.length > 0) {
        elementProblemStatus.insertAdjacentHTML(
          "beforeend",
          ` / Status: ${statuesHTML}`
        );
      }

      // コンテスト前中後外の1万点以上の最大得点を表示する
      // NOTE: マラソン用のため、1万点以上とした
      let scoresHTML = "";
      scoresHTML += generateScoreSpan(analyze.before.maxScore, "before");
      scoresHTML += generateScoreSpan(analyze.during.maxScore, "during");
      scoresHTML += generateScoreSpan(analyze.after.maxScore, "after");
      scoresHTML += generateScoreSpan(analyze.another.maxScore, "another");

      if (scoresHTML.length > 0) {
        elementProblemStatus.insertAdjacentHTML(
          "beforeend",
          ` / Scores: ${scoresHTML}`
        );
      }
    }

    // bootstrap3のtooltipを有効化 難易度円の値を表示するtooltip
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, no-undef
    $('[data-toggle="tooltip"]').tooltip();
  };

  // 色付け実行
  // TODO: ネタバレ防止機能が有効なら後で実行する
  // TODO: 設定画面に設定ボタンを追加
  // https://atcoder.jp/settings
  colorizeElement();
};

const settingPageProcess = async () => {
  const form = document.getElementsByClassName("form-horizontal")[0];
  if (form === undefined) return;

  form.insertAdjacentHTML("afterend", html);
};

/**
 * 最初に実行される部分 \
 * 共通の処理を実行した後ページごとの処理を実行する
 */
(async () => {
  if (URL[3] === "contests" && URL.length >= 5) {
    await contestPageProcess();
  }
  if (URL[3] === "settings" && URL.length === 4) {
    await settingPageProcess();
  }
})().catch((error) => {
  // eslint-disable-next-line no-console
  console.error("[AtCoderDifficultyDisplay]", error);
});
