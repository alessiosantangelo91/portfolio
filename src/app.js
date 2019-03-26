const AppStyles = require('./assets/scss/app.scss')
const Utils     = require('./lib/utils.js')
const Anime     = require('animejs').default;

Utils.htmlTextPrepare()

const animateIntro = () => {
  Anime.timeline({ loop: false })
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
    translateY: (e, i, l) => (-3 + 3*2*i) + 'rem'
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
    targets: '.intro__name__word',
    translateX: [
      '-0.1rem',
      '-0.2rem',
      '-0.4rem',
      '0.4rem',
      '-0.4rem',
      '0.4rem',
      '-0.4rem',
      '0.2rem',
      '-0.1rem',
      '0'
    ],
    easing: 'easeOutExpo',
    duration: 300,
  }, '+=300')
  .add({
    targets:    '.intro__name__word',
    translateY:  ['4.4rem', '3.8rem', '4.2rem', '3.9rem', '4.1rem', '4rem'],
    easing:     'easeOutExpo',
    duration:   600,
  }, '+=600')
  // Menu
  .add({
    targets:    '.nav__link span',
    translateX: [ 40, 0 ],
    translateZ: 0,
    opacity:    [ 0, 1 ],
    easing:     'easeOutExpo',
    duration:   1200,
    delay: (el, i) => 500 + 30 * i
  }, '+=400')
}

const animateScrollProgress = () => {
  const scrollTop = document.body.scrollTop
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.clientHeight
  const scrollPercent = Math.round(scrollTop / documentHeight * 100) / 100
  console.log('scrollPercent', scrollPercent)
  Anime.timeline({ loop: false }).add({
    targets:  '#scrollProgress',
    easing:   'linear',
    scaleX:   scrollPercent,
    duration: 50
  })
}


Utils.onDOMReady(() => {

  Utils.runObserver()

  animateIntro()
  window.addEventListener('scroll', () => animateScrollProgress())
})
