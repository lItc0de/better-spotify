const path = require('path');

process.env.VUE_APP_VERSION = require('./package.json').version;

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-player/'
    : '/',
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      alias: {
        utils: path.resolve(__dirname, 'src/utils/'),
      },
    },
  },
};
