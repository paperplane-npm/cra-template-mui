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
    addWebpackAlias({ '@': 'src/' }),

    addWebpackModuleRule({
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        { loader: 'sass-loader', options: { additionalData: '@import "~@/styles/global.scss";' } },
      ],
    }),

    addBabelPlugins(['@emotion']),

    addBabelPlugin(['lodash']),

    fixBabelImports('mui-core', {
      libraryName: '@mui/material',
      libraryDirectory: '',
      camel2DashComponentName: false,
    }),

    fixBabelImports('mui-icons', {
      libraryName: '@mui/icons-material',
      libraryDirectory: '',
      camel2DashComponentName: false,
    })
  ),

  devServer: overrideDevServer(devServerConfig => ({
    ...devServerConfig,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
      '/test-devserver-baidu': {
        target: 'https://www.baidu.com',
        changeOrigin: true,
        pathRewrite: {
          '^/test-devserver-baidu': '',
        },
      },
      '/paperplane': {
        target: 'https://paperplane.cc',
        changeOrigin: true,
        pathRewrite: {
          '^/paperplane': '',
        },
      },
    },
  })),
}
