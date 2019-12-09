const px2rem = require('postcss-px2rem');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const postcss = px2rem({
  remUnit: 75, // 基准大小 baseSize，需要和rem.js中相同
});

const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  // baseUrl: '/', // 基本路径
  outputDir: 'dist', // 输出文件目录 默认 dist
  lintOnSave: true, // eslint-loader 是否在保存的时候检查
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  css: { // css 配置
    loaderOptions: {
      postcss: {
        plugins: [
          postcss
        ]
      },
      // sass: {
      //   data: `
      //   @import "@/styles/theme.scss";
      //   @import "@/styles/vant.scss";
      //   `
      // }
    }
  },
  configureWebpack: config => {
    // 删除console插件
    let plugins = [
      new CompressionWebpackPlugin(
        {
          test: /\.js$|\.html$|\.css/,
          threshold: 10240
        },
      ),
      new UglifyJsPlugin({
        uglifyOptions: {
          mangle: {
            eval: true
          },
          compress: {
            warnings: false,
            drop_console: true,//console
            drop_debugger: false,
            pure_funcs: ['console.log']//移除console
          }
        }
      })
    ]
    if (NODE_ENV === 'production') {
      config.plugins = [...config.plugins, ...plugins]
    }
  },
  chainWebpack: config => {
    // console.log(1, config)
  },
  devServer: {
    port: 8100,
    host: '0.0.0.0',
    proxy: {
      '/cfunr-gateway': {
        target: 'http://10.254.49.59:21102/',// 测试
        // target: 'https://card.xinyan-ai.com/', // 生产
        ws: true,
        changeOrigin: true
      },
    }
  }
}
