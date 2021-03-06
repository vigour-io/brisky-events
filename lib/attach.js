'use strict'
module.exports = exports = function attach (e, data) {
  const touch = e.changedTouches
  const ev = touch ? touch[0] : e
  if (data.x !== void 0) {
    data.prevX = data.x
  }
  if (data.y !== void 0) {
    data.prevY = data.y
  }
  if (ev.clientX !== void 0) {
    data.x = ev.clientX
  }
  if (ev.clientY !== void 0) {
    data.y = ev.clientY
  }
  data.event = e
  return data
}

exports.start = function attachStartPos (data) {
  data.startX = data.x
  data.startY = data.y
  return data
}
