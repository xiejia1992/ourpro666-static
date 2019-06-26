const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const merge=require("webpack-merge");

const webpackBaseConfig=require('./webpack.base.js')
console.log(webpackBaseConfig)
function resolve(dir) {
	return path.join(__dirname, '..', dir)
}

module.exports = merge(webpackBaseConfig, {
  devtool: '#cheap-module-eval-source-map',
  plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			inject: 'body'
		}),
		new webpack.ProvidePlugin({
	              $: "jquery",
	              jQuery: "jquery"
	          }),
		new ExtractTextPlugin("styles.css"),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
		  API_URL:"'http://192.168.0.102'"
		})
	]
});