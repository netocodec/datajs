const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const WebpackConfig = require('./webpack.config.development.js');

const compiler = Webpack(WebpackConfig);
const devServerOptions = { ...WebpackConfig.devServer, open:true  };
const server = new WebpackDevServer(devServerOptions, compiler);

const runServer = async () => {
	console.log('Starting server...');
	await server.start();
};

runServer();

