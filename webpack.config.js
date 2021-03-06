var path = require('path');
// this will create a html file and include index_bundle in it.
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

var config = {
  //the source file to run through loaders
  entry: './app/index.js',
  output: {
    //this is going to resolve in the directory name plus dist folder.
    //path is just a set of pathing utilities
    path: path.resolve(__dirname, 'dist'),
    //it's going to output to a file called index_bundle
    filename: 'index_bundle.js',
    //setting this plus devServer.historyApiFallback always loads
    // '/' which is where React Router is 
    publicPath: '/'
  },
  //the loaders
  module: {
    rules: [
      //these are the transformations we want to make.
      //the first is the babel loader - babel loader is going to be used
      //on any file with a .js extension. find this babel loader
      //in the package.json "babel": [presets]
      { test: /\.(js)$/, use: 'babel-loader' },
      //similarly, any .css file will be run through style and css loader
      //css loader changes url references into import statements.
      //eg require('./index.css') as valid throughout whole
      //application. style loader loads it onto the page
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }

    ]
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'app/index.html'
  })
  ],
  mode: "development"
};

//end the process.env when production mode is setup and uglify the JS 
if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  )
}

module.exports = config;
