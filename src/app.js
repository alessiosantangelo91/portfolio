import styles from './assets/scss/app.scss';
import { onDOMReady } from './utils.js'
const SineWaves = require('sine-waves')

console.log(SineWaves)

onDOMReady(() => {

  window.addEventListener('scroll', event => {
    const scrollTop = document.body.scrollTop
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.clientHeight
    const scrollPercent = Math.round(scrollTop / documentHeight * 100)
    document.getElementById('scrollProgress').style.width = scrollPercent + '%';
  });

  const letters = document.querySelectorAll('.intro__name span')
  letters.forEach(element => {
    element.setAttribute('data-friction', Math.floor(Math.random() * 4) + 1)
  })

  window.addEventListener('scroll', () => {
    letters.forEach(element => {
      const scrollTop = document.body.scrollTop
      const friction = element.getAttribute('data-friction')
      const amount = scrollTop * (-friction) * 0.2
      element.style.transform = `translate3d(0, ${amount}px, 0)`
      element.style.transitionDelay = `0s`
    })
  })

  const wave = document.getElementById('IntroWave')
  const waveInstance = new SineWaves({
    el: wave,
    speed: 4,
    rotate: 0,
    ease: 'SineInOut',
    waveWidth: wave.innerWidth,
    waves: [
      {
        timeModifier: 4,
        lineWidth: 1,
        amplitude: -25,
        wavelength: 25
      },
      {
        timeModifier: 3,
        lineWidth: 2,
        amplitude: -50,
        wavelength: 50
      },
      {
        timeModifier: 3,
        lineWidth: 1,
        amplitude: -100,
        wavelength: 100
      },
    ],
    resizeEvent: function() {
      const primaryColor = alpha => `rgba(225, 153, 33, ${alpha})`
      const secondaryColor = alpha => `rgba(237, 194, 123, ${alpha})`

      this.waves.forEach((item, index) => {
        const gradient = this.ctx.createLinearGradient(0, 0, this.width, 0)
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0.1)')
        gradient.addColorStop(0.25, secondaryColor((index) / 10))
        gradient.addColorStop(0.5, primaryColor((index + 1) / 10))
        gradient.addColorStop(0.25, secondaryColor((index) / 10))
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.1)')
        item.strokeStyle = gradient;
      })
    }
  })
})

const headings = document.querySelectorAll('.reveal, .fade-in, .intro');
const config = {
  rootMargin: '-50px 0px',
  threshold: 0.01
};

// The observer for the images on the page
let observer = new IntersectionObserver(onIntersection, config);

headings.forEach(heading => observer.observe(heading));

function onIntersection(entries) {
  // Loop through the entries
  entries.forEach(entry => {
    // Are we in viewport?
    if (entry.intersectionRatio > 0) {
      observer.unobserve(entry.target);
      entry.target.classList.add('is-animated')
    }
  });
}
