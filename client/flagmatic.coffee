
# The Flagmatic plugin offers a choice of new flags
# item.choices selects how may, 40 by default

hsltorgb = (h, s, l) ->
  h = (h % 360) / 360
  m2 = l * (s + 1)
  m1 = ((l * 2) - m2)
  hue = (num) ->
    if num < 0
      num += 1
    else if num > 1
      num -= 1
    if (num * 6) < 1
      m1 + (m2 - m1) * num * 6
    else if (num * 2) < 1
      m2
    else if (num * 3) < 2
      m1 + (m2 - m1) * (2/3 - num) * 6
    else
      m1
  [(hue(h+1/3)*255), (hue(h) * 255), (hue(h - 1/3) * 255)]

paint = (canvas) ->
  ctx = canvas.getContext('2d')
  light = hsltorgb(Math.random() * 360, .78, .50)
  dark = hsltorgb(Math.random() * 360, .78, .25)
  angle = 2 * (Math.random() - 0.5)
  sin = Math.sin angle
  cos = Math.cos angle
  scale = (Math.abs(sin) + Math.abs(cos))
  colprep = (col, p) ->
    Math.floor(light[col]*p + dark[col]*(1-p))%255
  for x in [0..31]
    for y in [0..31]
      p = if sin >= 0 then sin * x + cos * y else -sin * (31 - x) + cos * y
      p = p / 31 / scale
      ctx.fillStyle = "rgba(#{colprep(0, p)}, #{colprep(1, p)}, #{colprep(2, p)}, 1)"
      ctx.fillRect(x, y, 1, 1)

delay = (msec, done) ->
  setTimeout done, msec

emit = ($item, item) ->
  $item.append """
    <div style="width:93%; background:#eee; padding:.8em; margin-bottom:5px; text-align: center;">
      <span class="flags"></span>
      <p class="caption">choose a new flag</p>
    </div>
  """
  $flags = $item.find '.flags'
  for [1..item.choices || 40]
    $flags.append $flag = $ '<canvas width=32 height=32 style="padding: 3px;"/>'
    paint $flag.get(0)

bind = ($item, item) ->
  $item.find('canvas').click  ->
    data = this.toDataURL()
    ajax = $.post '/favicon.png', {image: data}, (reply) ->
    ajax.done ->
      $item.find('.caption').text 'sweet'
    ajax.error ->
      $item.find('.caption').text 'ouch, logged in?'
    delay 1500, ->
      $item.find('.caption').text 'choose another flag'


window.plugins.flagmatic = {emit, bind} if window?
module.exports = {} if module?
