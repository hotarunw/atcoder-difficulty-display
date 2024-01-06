import { problemId } from "../consts/atcoder";

export type ElementAndId = {
  element: HTMLElement;
  problemId: string;
  big?: boolean;
};

/**
 * 色付け対象の要素の配列を取得する
 * * 個別の問題ページのタイトル
 * * 問題へのリンク
 * * 解説ページのH3の問題名
 */
export const selectProblemNameElement = (): ElementAndId[] => {
  const targets: ElementAndId[] = [];

  // 問題ページのタイトル
  if (location.pathname.match(/contests\/.+\/tasks\/.+/) != null) {
    const element = document.getElementsByClassName("h2")[0] as HTMLElement;
    if (element) {
      targets.push({ element, problemId: problemId ?? "", big: true });
    }
  }

  // h3タグ要素 解説ページの問題名を想定
  if (location.pathname.match(/contests\/.+\/editorial$/) != null) {
    const e =     Array.from(document.querySelectorAll<HTMLHeadingElement>("h3:has(>a)")).map((element) => {
      const problemId = (element.firstElementChild as HTMLAnchorElement).pathname.split("/")[4] ?? "";
      return { element, problemId, big: true };
    })
    Array.prototype.push.apply(targets,e);
  }



  const h3TagsRaw = document.getElementsByTagName("h3");
  const h3TagsArray = Array.prototype.slice.call(h3TagsRaw) as HTMLAnchorElement[];
  const h3TagsConverted: ElementAndId[] = h3TagsArray.map((element) => {
    const url = parseURL(element.getElementsByTagName("a")[0]?.href ?? "");

    const problemIdFromUrl = (url[url.length - 2] ?? "") === "tasks" ? url[url.length - 1] ?? "" : "";
    return { element, problemId: problemIdFromUrl, big: true, afterbegin: true };
  });

  // aタグ要素 問題ページ、提出ページ等のリンクを想定
  const aTagsRaw = document.getElementsByTagName("a");
  let aTagsArray = Array.prototype.slice.call(aTagsRaw) as HTMLAnchorElement[];
  // 問題ページの一番左の要素は除く 見た目の問題です
  aTagsArray = aTagsArray.filter(
    (element) => !((pageType === "tasks" || pageType === "score") && !element.parentElement?.previousElementSibling),
  );

  // 左上の日本語/英語切り替えリンクは除く
  aTagsArray = aTagsArray.filter((element) => !element.href.includes("?lang="));

  // 解説ページの問題名の右のリンクは除く
  aTagsArray = aTagsArray.filter(
    (element) => !(pageType === "editorial" && element.children[0]?.classList.contains("glyphicon-new-window")),
  );

  const aTagsConverted: ElementAndId[] = aTagsArray.map((element) => {
    const url = parseURL(element.href);

    const problemIdFromUrl = (url[url.length - 2] ?? "") === "tasks" ? url[url.length - 1] ?? "" : "";
    // 個別の解説ページではbig
    const big = element.parentElement?.tagName.includes("H2") ?? false;

    // Comfortable AtCoderのドロップダウンではafterbegin
    const afterbegin = element.parentElement?.parentElement?.classList.contains("dropdown-menu") ?? false;
    return { element, problemId: problemIdFromUrl, big, afterbegin };
  });

  targets.push(...aTagsConverted);

  // FIXME: 別ユーザースクリプトが指定した要素を色付けする機能
  // 指定したクラスがあれば対象とすることを考えている
  // ユーザースクリプトの実行順はユーザースクリプトマネージャーの設定で変更可能

  targets.push(...h3TagsConverted);

  return targets;
};
