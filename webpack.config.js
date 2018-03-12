const webpack = require('webpack')
const path = require('path')

const env = process.env.WEBPACK_ENV;

let plugins = []
let devtool = ''

if (env === 'production') {
  const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin

  plugins.push(new UglifyJsPlugin({minimize:true}))
  plugins.push(new webpack.DefinePlugin({
    'process.env':{
      NODE_ENV: '"production"'
    }
  }))
  plugins.push(new webpack.LoaderOptionsPlugin({minimize:true}))
  devtool = '#eval-source-map'
}

module.exports = {
  entry: path.join(__dirname, 'src/main.js'),
  output:{
    path: path.join(__dirname, 'dist'),
    filename:'bundle.js'
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        exclude:/(node_modules|bower_components)/,
        loader:'babel-loader',
        query:{
          presets:['es2015']
        }
      },
      {
        test:/\.vue$/,
        loader:'vue-loader'
      },
      {
        test: /\.css$/,
        loader:['style-loader','css-loader']
      }
    ]
  },
  resolve:{
    alias:{
      'vue$':'vue/dist/vue.esm.js'
    }
  },
  plugins,devtool
}