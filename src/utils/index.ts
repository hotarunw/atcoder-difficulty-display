import { IsSolvedStatus } from "./findRepresentativeSubmissions";

export const comparelexicographically = (a: string, b: string): number => {
  if (a === b) {
    return 0;
  }
  return a < b ? -1 : 1;
};

export const lookupClassForIsSolvedStatus = (a: IsSolvedStatus) => {
  if (a === "successBefore") {
    return "table-success-before-contest";
  }
  if (a === "successIntime") {
    return "table-success-intime";
  }
  if (a === "success") {
    return "table-success";
  }
  if (a === "warningIntime") {
    return "table-warning-intime";
  }
  if (a === "warning") {
    return "table-warning";
  }
  return "";
};
