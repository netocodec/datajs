const path = require('path');
const HtmlWebpackPlugin = require('./node_modules/html-webpack-plugin');


module.exports = {
	"externals": {
		"fs": "require('fs')",
		"stream": "require('stream')",
		"child_process": "require('child_process')",
		"crypto": "require('crypto')",
		"zlib": "require('zlib')",
		"url": "require('url')",
		"http": "require('http')",
		"https": "require('https')",
		"vm": "require('vm')",
		"console": "require('console')",
		"tty": "require('tty')",
		"path": "require('path')",
		"os":"require('os')"
	},
	entry: './src/index.ts',
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.ts?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
	},
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
		},
		compress: true,
		port: 9000,
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename:'index.html',
			template:path.resolve(__dirname, 'index.html'),
			minify:false,
			cache:false,
			inject:false,
			title: 'DataJS Page Tester V1.0',
			templateParameters:{}
		}),
	],
	node:{
		global:false
	},
	target: 'web'
};

