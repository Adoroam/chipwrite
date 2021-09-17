const flags = () => {
  const [bin, loc, ...args] = process.argv

  const flagList = args.filter(arg => arg.startsWith('-'))
  const hasFlags = flagList.length

  const dashRegex = /^\-+/i
  const hasDashes = str => dashRegex.exec(str)
  const rmDashes = str => str.replace(dashRegex, '').toLowerCase()

  if (!!hasFlags) {
    return args.reduce((ac, str, i) => {
      if (hasDashes(str)) {
        const flag = rmDashes(str)
        const following = args[i + 1]
        const hasNoValue = hasDashes(following) || i === args.length - 1
        const output = { [flag]: hasNoValue ? 1 : following }
        return { ...ac, ...output }
      } else {
        return ac
      }
    }, {})
  } else {
    return {}
  }
}

module.exports = flags()
