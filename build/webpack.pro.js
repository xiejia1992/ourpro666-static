const path = require('path');
const webpack = require('webpack');
var config = require('../config/index.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const {
	CleanWebpackPlugin
} = require("clean-webpack-plugin");
const WebpackCdnPlugin = require('webpack-cdn-plugin');

function resolve(dir) {
	return path.join(__dirname, '..', dir)
}

module.exports = {
	entry: {
		'main': './src/main.js'
	},
	output: {
		path: path.resolve(__dirname, '../static'), // 项目的打包文件路径
		filename: 'js/[name].[chunkhash:8].js',
		publicPath: './'
	},
	devtool: 'inline-source-map',
	module: {
		rules: [{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			},
			{
				test: /\.vue$/,
				use: [
					'vue-loader'
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: './img/[name].[ext]'
					}

				}]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					'file-loader'
				]
			},
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
				},
				include: [resolve('src'), resolve('static')]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			filename: config.build.index,
			template: 'index.html',
			inject: 'body'
		}),
		new WebpackCdnPlugin({
			modules: [{
					name: 'vue',
					var: 'Vue',
					path: 'dist/vue.js'
				},
				{
					name: 'element-ui',
					var: 'element-ui',
					path: 'lib/index.js'
				},
			],
			prod: false,
			publicPath: './../node_modules'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common'
		}),
		new ExtractTextPlugin("./css/styles.css"),
		new webpack.DefinePlugin({
			API_URL: "'http://140.143.167.11'"
		}),
	]
}