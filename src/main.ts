import type { getEstimatedDifficulties } from "atcoder-problems-api/information";
import difficultyCircle from "./components/difficultyCircle";
import css from "./style/_custom.scss";
import {
  getElementOfProblemStatus,
  getElementsColorizable
} from "./utils/getElementsColorizable";
import isContestOver from "./utils/isContestOver";
import { taskID } from "./utils/parser";
import { clipDifficulty, getRatingColorClass } from "./utils/problemsIndex";

(async () => {
  // コンテスト終了前は不要なので無効化する
  if (!isContestOver()) return;

  // FIXME: ダークテーマ対応
  GM_addStyle(css);

  // 難易度取得
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const problemModels = await getEstimatedDifficulties();

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
      const difficulty = clipDifficulty(model.difficulty ?? NaN);
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
      if (model.is_experimental) {
        element.element.insertAdjacentText("afterbegin", "🧪");
      }

      // ◒難易度円追加
      element.element.insertAdjacentHTML(
        "afterbegin",
        difficultyCircle(difficulty, element.big)
      );
    });

    // bootstrap3のtooltipを有効化 難易度円の値を表示するtooltip
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, no-undef
    $('[data-toggle="tooltip"]').tooltip();

    // 個別の問題ページのところに難易度等情報を追加
    if (elementProblemStatus) {
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

      elementProblemStatus.insertAdjacentHTML(
        "beforeend",
        ` / Difficulty:
        <span style='font-weight: bold;' class="${className}">${value}</span>`
      );
    }
  };

  // TODO: 自分の得点状況ページ対応

  // 色付け実行
  // TODO: ネタバレ防止機能が有効なら後で実行する
  colorizeElement();

  console.log("elementsColorizable :>> ", elementsColorizable);
})().catch((error) => {
  // eslint-disable-next-line no-console
  console.error("[AtCoderDifficultyDisplay]", error);
});
