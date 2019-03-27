const appStyles = require('./assets/scss/app.scss')
const utils     = require('./lib/utils.js')
const anime     = require('animejs').default
const charming  = require('charming')

const toBeSplitted = document.querySelectorAll('.intro__role, .nav__link, .quote__text')

toBeSplitted.forEach(element =>  {
  charming(element, {
    classPrefix: false,
    tagName: 'span',
    splitRegex: /(\s+)/,
  })
})

const animateIntro = () => {
  anime.timeline({ loop: false })
  // Intro
  .add({
    targets:    '.intro__role span',
    translateX: [40,0],
    translateZ: 0,
    opacity:    [0,1],
    easing:     'easeOutExpo',
    duration:   1200,
    delay: (el, i) => 500 + 30 * i
  })
  .add({
    targets:    '.intro__name__line',
    opacity:    0.2,
    scaleX:     [ 0, 1 ],
    easing:     'easeInOutExpo',
    duration:   700
  })
  .add({
    targets:    '.intro__name__line',
    duration:   600,
    easing:     'easeOutExpo',
    translateY: (e, i, l) => (-3 + 3 * 2 * i) + 'rem'
  })
  .add({
    targets:    '.intro__name__word--firstname',
    opacity:    [ 0, 1 ],
    translateX: [ '0.5rem', 0 ],
    easing:     'easeOutExpo',
    duration:   600,
  }, '-=300')
  .add({
    targets:    '.intro__name__word--lastname',
    opacity:    [ 0, 1 ],
    translateX: [ '-0.5rem', 0 ],
    easing:     'easeOutExpo',
    duration:   600,
  }, '-=600')
  .add({
    targets:    '.intro__name__line--top',
    scaleX:     0,
    easing:     'linear',
    duration:   300,
  }, '+=600')
  .add({
    targets:    '.intro__name__line--bottom',
    scaleX:     0,
    easing:     'linear',
    duration:   300,
  }, '+=300')
  .add({
    targets:    '.intro__name__word',
    translateY:  ['4.4rem', '3.8rem', '4.2rem', '3.9rem', '4.1rem', '4rem'],
    easing:     'easeOutExpo',
    duration:   600,
  }, '+=1200')
  // Menu
  .add({
    targets:    '.nav__link',
    translateX: [ 40, 0 ],
    translateZ: 0,
    opacity:    [ 0, 1 ],
    easing:     'easeOutExpo',
    duration:   1200,
    delay: anime.stagger(200)
  }, '+=400')
}

const animateScrollProgress = () => {
  const scrollTop = document.body.scrollTop
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.clientHeight
  const scrollPercent = Math.round(scrollTop / documentHeight * 100) / 100

  anime.timeline({ loop: false }).add({
    targets:  '#scrollProgress',
    easing:   'linear',
    scaleX:   scrollPercent,
    duration: 50
  })
}

const animateQuote = () => {
  anime.timeline({ loop: false })
  .add({
    targets: '.quote__text span',
    opacity: [0, 1],
    translateX: [40, 0],
    easing: 'easeOutExpo',
    duration: 1200,
    delay: anime.stagger(100)
  })
  .add({
    targets: '.quote__author',
    opacity: [0, 1],
    translateX: [100, 0],
    easing: 'easeOutExpo',
    duration: 1500
  }, '+=1000')
}

utils.onDOMReady(() => {

  animateIntro()

  utils.runObserver()

  utils.createObserver(document.querySelectorAll('.sentinel--section'), {rootMargin: '0px 0px'}, entries => {
    entries.forEach(entry => utils.isEntryInViewport(entry) ? animateQuote() : null)
  })

  window.addEventListener('scroll', () => animateScrollProgress())

  document.querySelector('.footer__copyright__year').innerHTML = (new Date()).getFullYear()
})
