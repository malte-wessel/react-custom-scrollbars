/* eslint no-var: 0, no-unused-vars: 0 */
var path = require('path');
var webpack = require('webpack');

module.exports = function karmaConfig(config) {
    config.set({
        browsers: [ 'Chrome' ],
        singleRun: true,
        // autoWatch: true,
        frameworks: [ 'mocha' ],
        files: [ './test.js' ],
        preprocessors: {
            './test.js': [ 'webpack', 'sourcemap' ]
        },
        reporters: [ 'mocha' ],
        webpack: {
            devtool: 'inline-source-map',
            resolve: {
                alias: {
                    'react-custom-scrollbars': path.resolve(__dirname, './src')
                }
            },
            module: {
                loaders: [{
                    test: /\.js$/,
                    loader: 'babel',
                    exclude: /(node_modules)/
                }]
            }
        }
    });
};
