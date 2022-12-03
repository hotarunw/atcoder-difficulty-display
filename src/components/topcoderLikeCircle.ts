// 次のコードを引用・編集
// [AtCoderProblems/TopcoderLikeCircle\.tsx at master · kenkoooo/AtCoderProblems](https://github.com/kenkoooo/AtCoderProblems/blob/master/atcoder-problems-frontend/src/components/TopcoderLikeCircle.tsx)
// 02d7ed77d8d8a9fa8d32cb9981f18dfe53f2c5f0

import { Theme, ThemeLight } from "../style/theme";
import { getRatingColorCode, RatingColor } from "../utils/problemsIndex";

// FIXME: ダークテーマ対応
const useTheme = () => ThemeLight;

type RatingMetalColor = "Bronze" | "Silver" | "Gold";
const getRatingMetalColorCode = (metalColor: RatingMetalColor) => {
  switch (metalColor) {
    case "Bronze":
      return { base: "#965C2C", highlight: "#FFDABD" };
    case "Silver":
      return { base: "#808080", highlight: "white" };
    case "Gold":
      return { base: "#FFD700", highlight: "white" };
    default:
      return { base: "#FFD700", highlight: "white" };
  }
};

type RatingColorWithMetal = RatingColor | RatingMetalColor;
const getStyleOptions = (
  color: RatingColorWithMetal,
  fillRatio: number,
  theme: Theme
) => {
  if (color === "Bronze" || color === "Silver" || color === "Gold") {
    const metalColor = getRatingMetalColorCode(color);
    return {
      borderColor: metalColor.base,
      background: `linear-gradient(to right, \
        ${metalColor.base}, ${metalColor.highlight}, ${metalColor.base})`,
    };
  }
  const colorCode = getRatingColorCode(color, theme);
  return {
    borderColor: colorCode,
    background: `border-box linear-gradient(to top, \
        ${colorCode} ${fillRatio * 100}%, \
        rgba(0,0,0,0) ${fillRatio * 100}%)`,
  };
};

export const topcoderLikeCircle = (
  color: RatingColorWithMetal,
  rating: number,
  big = true,
  extraDescription = ""
): string => {
  const fillRatio = rating >= 3200 ? 1.0 : (rating % 400) / 400;
  const className = `topcoder-like-circle
  ${big ? "topcoder-like-circle-big" : ""} rating-circle`;
  const theme = useTheme();
  const styleOptions = getStyleOptions(color, fillRatio, theme);
  const styleOptionsString = `border-color: ${styleOptions.borderColor}; background: ${styleOptions.background};`;
  const content = extraDescription
    ? `Difficulty: ${extraDescription}`
    : `Difficulty: ${rating}`;
  // FIXME: TooltipにSolve Prob, Solve Timeを追加
  return `<span
            class="${className}" style="${styleOptionsString}"
            data-toggle="tooltip" title="${content}" data-placement="bottom"
          />`;
};

export default topcoderLikeCircle;
