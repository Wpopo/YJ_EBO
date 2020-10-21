const {
  useBabelRc,
  addWebpackAlias,
  addDecoratorsLegacy,
  disableEsLint,
  override,
} = require('customize-cra');

const path = require('path');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin({
  outputFormat: 'human',
  outputTarget: './measur.txt',
});
module.exports = override(
  useBabelRc(),
  //addDecoratorsLegacy(),
  disableEsLint(),

  // add an alias for imports
  addWebpackAlias({
    ['Page']: path.resolve(__dirname, 'src/submodules/core/page'),
    ['BaseComponent']: path.resolve(
      __dirname,
      'src/submodules/core/baseComponent'
    ),
    ['Layout']: path.resolve(__dirname, 'src/submodules/core/layout'),
    ['Styled']: path.resolve(__dirname, 'src/submodules/core/styled'),
    ['Redux']: path.resolve(__dirname, 'src/submodules/core/redux'),
    ['Constants']: path.resolve(__dirname, 'src/submodules/core/constants'),
    ['Saga']: path.resolve(__dirname, 'src/submodules/core/saga'),
    ['Helper']: path.resolve(__dirname, 'src/submodules/core/helper'),
    ['Hooks']: path.resolve(__dirname, 'src/submodules/core/hooks'),
  }),
  config => {
    //webpack的配置 config ,evn
    if (process.env.NODE_ENV === 'production') {
      config.devtool = false;
      config = smp.wrap({
        ...config,
      });
    }
    if (process.env.NODE_ENV !== 'development')
      config.plugins = [...config.plugins];
    return config;
  }
);
