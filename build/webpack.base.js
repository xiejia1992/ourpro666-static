const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

function resolve(dir) {
	return path.join(__dirname, '..', dir)
}

module.exports = {
	entry: {
		'main': './src/main.js',
		'dev': './src/app.js',
	},
	output: {
		path: path.resolve(__dirname, '../static'), // 项目的打包文件路径
		filename: '[name].js',
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
					'file-loader'
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
	}
}