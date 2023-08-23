const {
  override,
  overrideDevServer,
  addBabelPlugins,
  addWebpackAlias,
  fixBabelImports,
  addWebpackModuleRule,
  addBabelPlugin,
} = require('customize-cra')

module.exports = {
  webpack: override(
    addBabelPlugins(['@emotion']),

    addWebpackAlias({ '@': 'src/' }),

    fixBabelImports('mui-core', {
      libraryName: '@mui/material',
      libraryDirectory: '',
      camel2DashComponentName: false,
    }),

    fixBabelImports('mui-icons', {
      libraryName: '@mui/icons-material',
      libraryDirectory: '',
      camel2DashComponentName: false,
    }),

    addBabelPlugin(['lodash']),

    addWebpackModuleRule({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    })
  ),

  devServer: overrideDevServer(devServerConfig => ({
    ...devServerConfig,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  })),
}
