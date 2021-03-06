'use strict'
const map = require('./map')
const properties = {}

exports.inject = require('../')

exports.on = {
  types: {
    keyemitter: {
      createEvent () {
        const parent = this._parent
        const keydown = parent.keydown
        const listener = keydown && keydown.fn && keydown.fn.emitKey
        if (!listener) {
          parent.setKey('keydown', { emitKey }, false)
        }
      }
    }
  },
  properties
}

for (let i in map) {
  const type = map[i]
  if (!properties[type]) {
    properties[type] = { type: 'keyemitter' }
  }
}

function emitKey (data, stamp) {
  const keyCode = data.event.keyCode
  const type = map[keyCode]
  if (type) {
    const listener = this._emitters[type]
    if (listener) {
      listener.emit(this, data, stamp)
    }
  }
}
