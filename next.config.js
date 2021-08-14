const withAntdLess = require('next-plugin-antd-less')
const { withPlausibleProxy } = require('next-plausible')

module.exports = withPlausibleProxy()(
  withAntdLess({
    modifyVars: { '@primary-color': '#3366ff' },
    lessVarsFilePathAppendToEndOfContent: false,
    cssLoaderOptions: {},

    webpack(config) {
      return config
    },
  })
)
