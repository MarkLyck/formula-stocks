const withAntdLess = require('next-plugin-antd-less')
const { withPlausibleProxy } = require('next-plausible')
const { withSentryConfig } = require('@sentry/nextjs')

const SentryWebpackPluginOptions = {
  silent: true,
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

const moduleExports = withPlausibleProxy()(
  withAntdLess({
    modifyVars: { '@primary-color': '#3366ff' },
    lessVarsFilePathAppendToEndOfContent: false,
    cssLoaderOptions: {},

    webpack(config) {
      return config
    },
  })
)

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions)
