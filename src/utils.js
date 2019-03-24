export const onDOMReady = (callback) => {
  var isComplete = document.readyState === "complete"
  var isLoading = document.readyState !== "loading" && !document.documentElement.doScroll
  isComplete || isLoading ?
    callback() :
    document.addEventListener("DOMContentLoaded", callback)
}
