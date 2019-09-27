require('./assets/scss/app.scss')

import { onDOMReady, createObserver, isEntryInViewport } from './lib/utils.js'
import anime from 'animejs'

class Portfolio {
  config = {
    introFirstnameText: 'Alessio',
    introLastnameText: 'Santangelo',
    introRoleText: 'frontend developer',
  }

  dom = {
    introFirstname: null,
    introLastname: null,
    introRole: null,
  }

  constructor() {
    this.dom = {
      introFirstname: document.getElementById('jsIntroFirstname'),
      introLastname: document.getElementById('jsIntroLastname'),
      introRole: document.getElementById('jsIntroRole'),
      footerCopyrightYear: document.getElementById('jsFooterCopyrightYear'),
    }

    this.appendHtmlString(this.config.introFirstnameText, this.dom.introFirstname)
    this.appendHtmlString(this.config.introLastnameText, this.dom.introLastname)
    this.appendHtmlString(this.config.introRoleText, this.dom.introRole)

    this.animateIntro()
    this.animateQuote()
    this.animateScrollProgress()
    this.runObserver()
    this.setCopyright()
    this.attachEvents()
  }

  appendHtmlString(str, element) {
    this
      .stringToHtmlChars(str)
      .forEach(tag => element.appendChild(tag))
  }

  stringToHtmlChars(str) {
    return str
      .split('')
      .map(s => {
        let tag = document.createElement('span')
        tag.innerText = s
        return tag
      })
  }

  animateIntro() {

    anime
      .timeline({ loop: false })
      .add({
        targets: '.intro__role span',
        translateX: [40, 0],
        translateZ: 0,
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 1200,
        delay: (el, i) => 500 + 30 * i
      })

      .add({
        targets: '.intro__name__line',
        opacity: 0.2,
        scaleX: [0, 1],
        easing: 'easeInOutExpo',
        duration: 700
      })

      .add({
        targets: '.intro__name__line--top',
        easing: 'easeOutExpo',
        translateY: '-3rem',
        duration: 600,
      })

      .add({
        targets: '.intro__name__line--bottom',
        easing: 'easeOutExpo',
        translateY: '3rem',
        duration: 600,
      }, '-=600')

      .add({
        targets: '.intro__name__word--firstname',
        opacity: [0, 1],
        translateX: ['0.5rem', 0],
        easing: 'easeOutExpo',
        duration: 600,
      }, '-=300')

      .add({
        targets: '.intro__name__word--lastname',
        opacity: [0, 1],
        translateX: ['-0.5rem', 0],
        easing: 'easeOutExpo',
        duration: 600,
      }, '-=300')

      .add({
        targets: '.intro__name__line--top',
        scaleX: 0,
        easing: 'linear',
        duration: 300,
      }, '+=600')

      .add({
        targets: '.intro__name__line--bottom',
        scaleX: 0,
        easing: 'linear',
        duration: 300,
      }, '+=300')

      .add({
        targets: '.intro__name__word',
        translateY: ['4.4rem', '3.8rem', '4.2rem', '3.9rem', '4.1rem', '4rem'],
        easing: 'easeOutExpo',
        duration: 600,
      }, '+=300')

      // Menu
      .add({
        targets: '.nav__link',
        translateX: [40, 0],
        translateZ: 0,
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 1200,
        delay: anime.stagger(200)
      }, '+=400')
  }

  animateScrollProgress() {
    const scrollTop = document.body.scrollTop
    const documentHeight = document.documentElement.clientHeight
    const scrollPercent = Math.round(scrollTop / documentHeight * 100) / 100

    anime
      .timeline({ loop: false })
      .add({
        targets: '#scrollProgress',
        easing: 'linear',
        scaleX: scrollPercent,
        duration: 50
      })
  }

  animateQuote = () => {
    anime
      .timeline({ loop: false })
      .add({
        targets: '.quote__text',
        opacity: [0, 1],
        translateX: [100, 0],
        easing: 'easeOutExpo',
        duration: 1500,
      })
      .add({
        targets: '.quote__author',
        opacity: [0, 1],
        translateX: [100, 0],
        easing: 'easeOutExpo',
        duration: 1500
      }, '+=1000')
  }

  runObserver() {
    let alreadyAnimated = false
    createObserver(
      document.querySelectorAll('.sentinel--section'), {
        rootMargin: '0px 0px'
      },
      entries => {
        entries.forEach(entry => {
          if (isEntryInViewport(entry) && !alreadyAnimated) {
            this.animateQuote()
            alreadyAnimated = true
          }
        })
      }
    )
  }

  setCopyright() {
    this.dom.footerCopyrightYear.innerHTML = (new Date()).getFullYear()
  }

  attachEvents() {
    window.addEventListener('scroll', () => this.animateScrollProgress())
  }
}

onDOMReady(() => {
  new Portfolio()
})
