const req = require.context('../../icons/svg', false, /\.svg$/)
const requireAll = (requireContext: __WebpackModuleApi.RequireContext) =>
  requireContext.keys()

const re = /\.\/(.*)\.svg/

const svgIcons = requireAll(req).map((i) => {
  const textArr = i.match(re) as RegExpMatchArray
  return textArr[1]
})

export default svgIcons
