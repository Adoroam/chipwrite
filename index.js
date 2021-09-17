const { keyTap, mouseClick } = require('robotjs')
const { writeSync, readSync } = require('clipboardy')
const { readFileSync } = require('fs')
const flags = require('./flags')

let clipboard = readSync().split('\r\n')

const pasteLine = ln => {
  keyTap('A', 'control')
  !!ln ? keyTap('V', 'control') : keyTap('backspace')
  keyTap('down')
}

if (flags.c || flags.clear) {
  clipboard = new Array(20).fill('')
}
if (flags.isan) {
  const opts = { encoding: 'utf-8' }
  clipboard = readFileSync('./isan.yolol', opts).split('\r\n')
}

mouseClick()
clipboard.forEach(ln => {
  writeSync(ln)
  pasteLine(ln)
})
