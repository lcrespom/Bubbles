var path = require('path');

module.exports = {
	devtool: 'source-map',
	entry: './src/main.ts',
	resolve: {
		extensions: ['.webpack.js', '.ts', '.js']
	},
	externals: {
		ramda: 'R'
	},
	module: {
		loaders: [{
			test: /\.ts$/,
			loader: 'ts-loader',
			exclude: '/node_modules'
		}]
	},
	output: {
		path: path.resolve(__dirname, 'web'),
		filename: 'bundle.js'
	}
};
