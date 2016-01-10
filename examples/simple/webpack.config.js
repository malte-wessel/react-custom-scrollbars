var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractTextPlugin = new ExtractTextPlugin('[name].css');

var entry = [];
if(process.env.NODE_ENV === 'development') {
    entry.push(
        'webpack-dev-server/client?http://localhost:3000'
    );
}

var plugins = [
    extractTextPlugin,
    new webpack.NoErrorsPlugin()
];

if(process.env.NODE_ENV === 'production') {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
	        compress: {
	            warnings: false
	        }
	    })
    );
}

var loaders = [{
    test: /\.scss$/,
    loader: extractTextPlugin.extract([
        'css',
        'autoprefixer?browsers=last 4 versions',
        'sass?includePaths[]=' + path.resolve('./node_modules')
    ].join('!'))
}];
if(process.env.NODE_ENV === 'development') {
    loaders.push({
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: __dirname
    });
} else {
    loaders.push({
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: __dirname
    });
}

loaders.push({
    test: /\.js$/,
    loaders: ['babel'],
    include: path.join(__dirname, '..', '..', 'src')
});

module.exports = {
    devtool: 'eval',
    entry: entry.concat('./index'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: plugins,
    resolve: {
        alias: {
            'react-custom-scrollbars': path.join(__dirname, '..', '..', 'src')
        },
        extensions: ['', '.js']
    },
    module: {
        loaders: loaders
    },
    sassLoader: {
        includePaths: [path.resolve(__dirname, './node_modules')]
    }
};
