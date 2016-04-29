var path = require('path');

var config = {
	name: "rendering",
	target: "node",
		
    entry: {
        app: './client/basic.js',
        
        'index.html': './client/index.html'
    },

    output: {
        filename: './js/[name].js',
        chunkFilename: './js/[id].chunk.js',
        path: path.resolve("./build"),
        publicPath: '/'
    },

    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.html$/, loader: 'file-loader?name=[name].[ext]', exclude: /node_modules/ }
        ]
    }
};

module.exports = config;