'use strict'
const addListeners = require('./listener')
const displayed = require('./displayed')
const attachEvent = require('./attach')
const fire = require('./fire')
const attachStartPos = attachEvent.start

exports.inject = require('./')

exports.on = {
  properties: {
    drag (val) {
      const self = this

      if (typeof val === 'function') {
        val = { drag: val }
      }

      this.set({
        mousedown: {
          mouseDragStart (data) {
            var dragged, removeListeners, target

            if (data.event.which !== 3) {
              removeListeners = addListeners(
                'mouseup', mouseDragUp,
                'mousemove', mouseDragMove
              )
              target = data.target
              attachStartPos(data)
            }

            function mouseDragMove (e) {
              if (displayed(target)) {
                data.dragStart = !dragged
                fire('drag', e, data, val, self)
                dragged = true
              } else {
                removeListeners()
              }
            }

            function mouseDragUp (e) {
              if (dragged && displayed(target)) {
                data.dragEnd = true
                fire('drag', e, data, val, self)
              }
              removeListeners()
            }
          }
        },
        touchstart: {
          touchDragStart (data) {
            var dragged
            const target = data.target
            const removeListeners = addListeners(
              'touchmove', touchDragMove,
              'touchend', touchDragUp
            )

            attachStartPos(data)

            function touchDragMove (e) {
              if (displayed(target)) {
                data.dragStart = !dragged
                fire('drag', e, data, val, self)
                // @todo make this system
                if (data.cancelDrag) {
                  removeListeners()
                }
                dragged = true
              } else {
                removeListeners()
              }
            }

            function touchDragUp (e) {
              if (dragged && displayed(target)) {
                data.dragEnd = true
                fire('drag', e, data, val, self, true)
              }
              removeListeners()
            }
          }
        }
      })
    }
  }
}
