/*
 * Federated Wiki : Flagmatic Plugin
 *
 * Copyright Ward Cunningham and other contributors
 * Licensed under the MIT license.
 * https://github.com/fedwiki/wiki-plugin-flagmatic/blob/master/LICENSE.txt
 */

// The Flagmatic plugin offers a choice of new flags
// item.choices selects how may, 40 by default

const hsltorgb = (h, s, l) => {
  h = (h % 360) / 360
  const m2 = l * (s + 1)
  const m1 = l * 2 - m2

  const hue = num => {
    let n = num
    if (n < 0) {
      n += 1
    } else if (n > 1) {
      n -= 1
    }

    if (n * 6 < 1) {
      return m1 + (m2 - m1) * n * 6
    } else if (n * 2 < 1) {
      return m2
    } else if (n * 3 < 2) {
      return m1 + (m2 - m1) * (2 / 3 - n) * 6
    } else return m1
  }
  return [hue(h + 1 / 3) * 255, hue(h) * 255, hue(h - 1 / 3) * 255]
}
const paint = canvas => {
  const ctx = canvas.getContext('2d')
  const light = hsltorgb(Math.random() * 360, 0.78, 0.4)
  const dark = hsltorgb(Math.random() * 360, 0.78, 0.55)
  const angle = 2 * (Math.random() - 0.5)
  const sin = Math.sin(angle)
  const cos = Math.cos(angle)
  const scale = Math.abs(sin) + Math.abs(cos)

  const colprep = (col, p) => {
    Math.floor(light[col] * p + dark[col] * (1 - p)) % 255
  }

  for (const x of [
    ...Array(31)
      .keys()
      .map(i => i + 1),
  ]) {
    for (const y of [
      ...Array(31)
        .keys()
        .map(i => i + 1),
    ]) {
      let p = sin >= 0 ? sin * x + cos * y : -sin * (31 - x) + cos * y
      p = p / 31 / scale
      ctx.fillStyle = `rgba(${colprep(0, p)}, ${colprep(1, p)}, ${colprep(2, p)}, 1)`
      ctx.fillRect(x, y, 1, 1)
    }
  }
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
