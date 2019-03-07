const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './app/index.js',   // 入口文件
  output: {
    path: path.resolve(__dirname, 'build'),    // 必须使用绝对地址，输出文件夹
    filename: 'bundle.js',    // 打包输出的文件的文件名
    publicPath: 'build/'       // 寻找资源
  },
  module: {
    rules: [
      // js 文件
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      // css 文件
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              modules: true
            }
          }]
        })
      },
      // 图片资源
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            // 限制 图片大小 100KB，小于限制会将图片转换为 base64格式
            limit: 100000,
            // 超出限制，创建的文件格式
            // build/images/[图片名].[hash].[图片格式]
            name: 'images/[name].[hash].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    // 输出的文件路径
    new ExtractTextPlugin('css/[name].[hash].css')
  ]
}