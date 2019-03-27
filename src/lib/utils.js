const isEntryInViewport = entry => entry.intersectionRatio > 0

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
  const animateEntry = entry => entry.target.classList.add('is-animated')
  const onIntersection = entries => entries.forEach(entry => { isEntryInViewport ? animateEntry(entry) : null })
  const observer = new IntersectionObserver(onIntersection, config)
  entries.forEach(entry => observer.observe(entry))
}

const createObserver = (entries, config, onIntersection) => {
  const observer = new IntersectionObserver(onIntersection, config)
  entries.forEach(entry => observer.observe(entry))
  return observer
}


module.exports = {
  createObserver: createObserver,
  isEntryInViewport: isEntryInViewport,
  onDOMReady: onDOMReady,
  runObserver: runObserver,
}
