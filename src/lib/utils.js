const onDOMReady = (callback) => {
  var isComplete = document.readyState === "complete"
  var isLoading = document.readyState !== "loading" && !document.documentElement.doScroll
  isComplete || isLoading ?
    callback() :
    document.addEventListener("DOMContentLoaded", callback)
}

const runObserver = () => {
  const config = { rootMargin: '-50px 0px', threshold: 0.01 }
  const entries = document.querySelectorAll('.reveal, .fade-in, .intro')
  const isInViewport = entry => entry.intersectionRatio > 0
  const animateEntry = entry => entry.target.classList.add('is-animated')
  const onIntersection = entries => entries.forEach(entry => { isInViewport ? animateEntry(entry) : null })
  const observer = new IntersectionObserver(onIntersection, config)
  entries.forEach(entry => observer.observe(entry))
}

const htmlSplit = element => element.innerHTML = element.innerHTML.replace(/([^\x00-\x80]|\w)/g, "<span>$&</span>")

const htmlTextPrepare = () => {
  const selector = `.intro__role, .nav__link`
  document.querySelectorAll(selector).forEach(htmlSplit)
}

module.exports = {
  htmlSplit: htmlSplit,
  onDOMReady: onDOMReady,
  runObserver: runObserver,
  htmlTextPrepare: htmlTextPrepare,
}
