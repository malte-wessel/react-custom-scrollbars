var path = require('path');
var webpack = require('webpack');

var entry = [];
if(process.env.NODE_ENV === 'development') {
    entry.push(
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server'
    );
}

var plugins = [
    new webpack.HotModuleReplacementPlugin(),
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

var loaders = [];
if(process.env.NODE_ENV === 'development') {
    loaders.push({
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
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
    }
};
