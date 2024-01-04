(() => {
  lscache.flushExpired();
  // 旧バージョンのローカルストレージを消す
  localStorage.removeItem("atcoderDifficultyDisplayUserSubmissions");
  localStorage.removeItem("atcoderDifficultyDisplayUserSubmissionslastFetchedAt");
  localStorage.removeItem("atcoderDifficultyDisplayEstimatedDifficulties");
  localStorage.removeItem("atcoderDifficultyDisplayEstimatedDifficultieslastFetchedAt");
})();
