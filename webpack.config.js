const path = require('path');

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
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		filename: 'main.min.js',
		path: path.resolve(__dirname, 'dist'),
	},
	node:{
		global:false
	},
	target: 'web'
};

