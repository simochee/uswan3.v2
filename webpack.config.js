'use strict';

const webpack = require('webpack');

module.exports = {
	watch: true,
	entry: {
		bundle: './src/scripts/entry.js'
	},
	output: {
		path: __dirname + '../docs/assets',
		filename: '[name].js'
	},
	module: {
		preLoaders: [
			{
				test: /\.tag$/,
				exclude: /node_modules/,
				loader: 'riotjs-loader',
				query: {
					type: 'babel',
					template: 'pug'
				}
			}
		],
		loaders: [
			{
				test: /\.js$|\.tag$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015'],
					cacheDirectory: true
				}
			}
		]
	},
	resolve: {
		extensions: ['', '.js', '.tag']
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.ProvidePlugin({
			riot: 'riot'
		})
	],
	devtool: 'inline-source-map'
}