/*
 * Federated Wiki : Flagmatic Plugin
 *
 * Copyright Ward Cunningham and other contributors
 * Licensed under the MIT license.
 * https://github.com/fedwiki/wiki-plugin-flagmatic/blob/master/LICENSE.txt
 */

// The Flagmatic plugin offers a choice of new flags
// item.choices selects how may, 40 by default

const paint = canvas => {
  const ctx = canvas.getContext('2d')
  const light = `hsl(${Math.round(Math.random() * 360)}, 78%, 40%)`
  const dark = `hsl(${Math.round(Math.random() * 360)}, 78%, 55%)`
  const angle = 2 * (Math.random() - 0.5)
  const x2 = 31 * Math.cos(angle)
  const y2 = 31 * Math.sin(angle)

  const gr = ctx.createLinearGradient(0, 0, x2, y2)

  gr.addColorStop(0, light)
  gr.addColorStop(1, dark)

  ctx.fillStyle = gr
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

const delay = (msec, done) => {
  setTimeout(done, msec)
}

const emit = ($item, item) => {
  $item.append(`
    <div style="width:93%; background:#eee; padding:.8em; margin-bottom:5px; text-align: center;">
      <span class="flags"></span>
      <p class="caption">choose a new flag</p>
    </div>
    `)

  const $flags = $item.find('.flags')
  for (let i = 1; i <= (item.choices || 40); i++) {
    const $flag = $('<canvas width=32 height=32 style="padding: 3px;"/>')
    $flags.append($flag)
    paint($flag.get(0))
  }
}

const bind = ($item, item) => {
  $item.find('canvas').on('click', evt => {
    const data = evt.target.toDataURL()
    const ajax = $.post('/favicon.png', { image: data })
    ajax.done(() => {
      $item.find('.caption').text('sweet')
    })
    ajax.fail(() => {
      $item.find('.caption').text('ouch, logged in?')
    })
    delay(1500, () => {
      $item.find('.caption').text('choose another flag')
    })
  })
}

if (typeof window !== 'undefined') {
  window.plugins.flagmatic = { emit, bind }
}

export const flagmatic = typeof window == 'undefined' ? {} : undefined
