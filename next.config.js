const withAntdLess = require('next-plugin-antd-less')
const { withPlausibleProxy } = require('next-plausible')

module.exports = withPlausibleProxy()(
  withAntdLess({
    // optional
    modifyVars: { '@primary-color': '#3366ff' },
    // optional
    // lessVarsFilePath: './src/styles/variables.less',
    // optional
    lessVarsFilePathAppendToEndOfContent: false,
    // optional https://github.com/webpack-contrib/css-loader#object
    cssLoaderOptions: {},

    webpack(config) {
      return config
    },
  })
)
