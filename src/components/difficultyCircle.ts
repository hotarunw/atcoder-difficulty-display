// 次のコードを引用・編集
// [AtCoderProblems/DifficultyCircle\.tsx at master · kenkoooo/AtCoderProblems](https://github.com/kenkoooo/AtCoderProblems/blob/master/atcoder-problems-frontend/src/components/DifficultyCircle.tsx)
// 0469e07274fda2282c9351c2308ed73880728e95

import { getRatingColor } from "../utils/problemsIndex";
import { topcoderLikeCircle } from "./topcoderLikeCircle";

const getColor = (difficulty: number) => {
  if (difficulty < 3200) return getRatingColor(difficulty);
  if (difficulty < 3600) return "Bronze";
  if (difficulty < 4000) return "Silver";
  return "Gold";
};

const difficultyCircle = (difficulty: number, big = true): string => {
  if (Number.isNaN(difficulty)) {
    // Unavailableの難易度円はProblemsとは異なりGlyphiconの「?」を使用
    const className = `glyphicon glyphicon-question-sign aria-hidden='true'
    difficulty-unavailable
    ${big ? "difficulty-unavailable-icon-big" : "difficulty-unavailable-icon"}`;

    return `<span>
              <span class="${className}"></span>
            </span>`;
  }
  const color = getColor(difficulty);

  return topcoderLikeCircle(color, difficulty, big);
};

export default difficultyCircle;
