'use strict'

const internals = {}

/** @param {number} ms */
internals.timeout = ms => {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

/** @param {number} seconds */
internals.formatTime = seconds => {
  const pad = number => `${number}`.padStart(2, 0)

  let minute = Math.floor(seconds / 60)
  const second = Math.round(seconds % 60)
  if (minute > 60) {
    const hour = Math.floor(minute / 60)
    minute = Math.floor(minute % 60)
    return `${hour}:${pad(minute)}:${pad(second)}`
  }
  return `${minute}:${pad(second)}`
}

class Timer {
  /** @param {HTMLElement} element */
  constructor (element = document.querySelector('[data-countdown-date]')) {
    this.element = element
    this.endTime = new Date(element.dataset.countdownDate)
    this.isCancelled = false

    this.cancel = this.cancel.bind(this)
    this.run = this.run.bind(this)
  }

  cancel () {
    console.log(`[Timer] Cancelling ${this.length} minute timer`)
    this.isCancelled = true
  }

  async run () {
    console.log(`[Timer] Starting ${this.length} minute timer`)
    const finishTime = this.endTime.getTime()

    while (Date.now() < finishTime) {
      const seconds = Math.round((finishTime - Date.now()) / 1000)
      this.element.textContent = internals.formatTime(seconds)
      await internals.timeout(1000)
    }

    this.element.textContent = '0:00'
  }
}

const init = () => {
  console.log('Initializing')
  const element = document.querySelector('[data-countdown-date]')
  if (element) {
    const timer = new Timer(element)
    timer.run()
  }
  document.addEventListener('keyup', e => {
    console.log(`Key press detected: "${e.key}"`)
    if (document.location.href !== '/' && ['Backspace', 'Escape'].includes(e.key)) {
      document.location.href = '/'
    }
  })
}

document.addEventListener('DOMContentLoaded', init)
