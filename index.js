#!/usr/bin/env node

const p = require('phin')
const { keyTap, mouseClick } = require('robotjs')
const { writeSync, readSync } = require('clipboardy')
const { readFileSync } = require('fs')
const flags = require('./flags')

const empty = new Array(20).fill('')

let clipboard = readSync().split('\r\n')

const pasteLine = ln => {
  keyTap('A', 'control')
  !!ln ? keyTap('V', 'control') : keyTap('backspace')
  keyTap('down')
  !!flags.e && keyTap('down')
}

const chipWrite = async () => {
  if (flags.isan) {
    const isanURL =
      'https://raw.githubusercontent.com/Collective-SB/ISAN/master/bundles/basic/ISAN-basic_bundle.yolol'
    const isanData = await p({ url: isanURL, parse: 'string' }).then(
      data => data.body
    )
    clipboard = isanData.split('\n')
  }
  if (flags.f) {
    const opts = { encoding: 'utf-8' }
    clipboard = readFileSync(flags.f, opts).split('\r\n')
  }
  if (flags.o) {
    clipboard = [...clipboard, ...empty]
  }
  if (flags.c || flags.clear) {
    clipboard = empty
  }

  mouseClick()
  clipboard
    .filter((x, i) => i < 20)
    .forEach(ln => {
      writeSync(ln)
      pasteLine(ln)
    })
}

chipWrite()
