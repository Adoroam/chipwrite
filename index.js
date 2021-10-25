#!/usr/bin/env node

const p = require('phin')
const robut = require('robotjs')
const { writeSync, readSync } = require('clipboardy')
const { readFileSync } = require('fs')
const flags = require('flags').default

robut.setKeyboardDelay(0)
robut.setMouseDelay(0)
const { keyTap, mouseClick } = robut

if (!!flags.nocomment) {
  flags.n = flags.nocomment
}
if (!!flags.editor) {
  flags.e = flags.editor
}

const empty = new Array(20).fill('')

let clipboard = readSync().split('\r\n')
let trimCap = 20

const pasteLine = (ln, last) => {
  keyTap('A', 'control')
  const emptyCases = [!!flags.n && ln.startsWith('//'), !!!ln]
  emptyCases.some(reason => !!reason)
    ? keyTap('backspace')
    : keyTap('V', 'control')
  if (last) return
  keyTap('down')
  !!flags.e && keyTap('down')
}

const trimTail = arr => {
  const trimdex = arr
    .map(ln => (!!flags.n ? !ln.startsWith('//') : !!ln))
    .reduceRight((a, c, i) => (a ? a : !!c ? i : 0), 0)
  return arr.filter((x, i) => i < arr.length - trimdex)
}

const flagHelp = [
  { flag: '-h --help', description: 'displays this help info' },
  {
    flag: '-f --file',
    description: 'accepts a yolol file to copy.',
    parameters: 'required: relative path to yolol file',
  },
  {
    flag: '-i --isan',
    description: 'fetches the most recent ISAN script',
  },
  {
    flag: '-t --trim',
    description: 'removes empty lines from the end.',
  },
  {
    flag: '-c --clear',
    description: 'clear the current chip.',
    parameters: 'optional: accepts line number to stop clearing',
  },
  {
    flag: '-e --editor',
    description: 'use when writing inside ship builder.',
  },
  {
    flag: '-n --nocomment',
    description: 'excludes full line comments',
  },
  {
    flag: '-o --overwrite',
    description: 'clear the end of the current chip.',
    parameters: 'optional: accepts line number to stop overwrite',
  },
]

const chipWrite = async () => {
  if (flags.h || flags.help) {
    console.table(flagHelp)
    return
  }

  if (flags.i || flags.isan) {
    const isanURL =
      'https://raw.githubusercontent.com/Collective-SB/ISAN/master/bundles/basic/ISAN-basic_bundle.yolol'
    const isanData = await p({ url: isanURL, parse: 'string' }).then(
      data => data.body
    )
    clipboard = isanData.split('\n')
  }
  if (flags.f || flags.file) {
    const opts = { encoding: 'utf-8' }
    clipboard = readFileSync(flags.f, opts).split('\r\n')
  }
  if (flags.t || flags.n || flags.trim) {
    clipboard = trimTail(clipboard)
  }
  if (flags.o || flags.overwrite) {
    clipboard = [...clipboard, ...empty]
    if (+flags.o > 1) trimCap = +flags.o
  }
  if (flags.c || flags.clear) {
    clipboard = empty
    if (+flags.c > 1) trimCap = +flags.c
  }
  if (trimCap > 20) trimCap = 20

  mouseClick()
  const trimmed = clipboard.filter((x, i) => i < trimCap)
  const lastIndex = trimmed.length - 1
  trimmed.forEach((ln, i) => {
    writeSync(ln)
    pasteLine(ln, i === lastIndex)
  })
}

chipWrite()
