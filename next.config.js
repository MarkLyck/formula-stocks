const withPlugins = require('next-compose-plugins')

const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const withAntdLess = require('next-plugin-antd-less')
const { withPlausibleProxy } = require('next-plausible')
const { withSentryConfig } = require('@sentry/nextjs')

const SentryWebpackPluginOptions = {
  silent: true,
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

const moduleExports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          dest: 'public',
          runtimeCaching,
        },
      },
    ],
    [withPlausibleProxy],
    [
      withAntdLess,
      {
        modifyVars: { '@primary-color': '#3366ff' },
        lessVarsFilePathAppendToEndOfContent: false,
        cssLoaderOptions: {},

        webpack(config) {
          return config
        },
      },
    ],
  ],
  {
    webpack(config) {
      return config
    },
  }
)

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions)
