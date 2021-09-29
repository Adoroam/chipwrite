const [, , ...args] = process.argv

const dashRegex = /^\-{1,2}/i
const hasFlags = args.some(str => dashRegex.exec(str))

const flags = () => {
  if (!hasFlags) return {}
  const chDashes = str => {
    const result = dashRegex.exec(str)
    return !!result ? result[0].length : 0
  }
  const flagMap = args.map(chDashes)
  const rmDashes = str => str.replace(dashRegex, '').toLowerCase()
  const crunchObject = (a, c, i) => {
    if (!!flagMap[i]) {
      const flag = rmDashes(c)
      const multiFlag = flag.length > 1 && flagMap[i]===1
      const data = flagMap[i + 1] === 0 ? args[i + 1] : true
      const flagObject = multiFlag
        ? Object.fromEntries(flag.split('').map(l => [l, data]))
        : { [flag]: data }
      return { ...a, ...flagObject }
    } else {
      return a
    }
  }
  return args.reduce(crunchObject, {})
}

module.exports = flags()
