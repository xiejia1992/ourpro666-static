const path = require('path');
const webpack = require('webpack');
var config=require('../config/index.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
function resolve(dir) {
	return path.join(__dirname, '..', dir)
}

module.exports = {
	entry: {
		'main': './src/main.js',
		'dev': './src/app.js',
		'vendor':['jquery','element-ui']
	},
	output: {
		path: path.resolve(__dirname, '../static'), // 项目的打包文件路径
		filename: 'js/[name].[chunkhash:8].js',
	},
	devtool: 'inline-source-map',
	resolve: {
		alias: {
			//导入vue完整包
			'vue$': 'vue/dist/vue.js',
		}
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
				use: [
					{
						loader:'file-loader',
						options:{
							name:'./img/[name].[ext]'
						}
					
					}
				]
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
			filename:config.build.index,
			template: 'index.html',
			inject: 'body'
		}),
		new webpack.ProvidePlugin({
	          $: "jquery",
	          jQuery: "jquery"
	      }),
		new ExtractTextPlugin("./css/styles.css"),
		new webpack.DefinePlugin({
		  API_URL:"'http://140.143.167.11'"
		})
	]
}