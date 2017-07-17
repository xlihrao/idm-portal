let path = require('path')
let webpack = require('webpack')
let ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    debug: true,
    // eval-source-map is faster for development
    devtool: 'inline-source-map',
    entry: [
        // necessary for hot reloading with IE
        'eventsource-polyfill',
        'babel-polyfill',
        // Add for Intl API support of IE10
        'intl',
        'webpack-hot-middleware/client',
        './src/index.js'
    ],
    output: {
        // this used in index.html to load all jsx.
        path: path.join(__dirname, '../dist'),
        filename: 'bundle.js',
        publicPath: '/idm-portal/static/',
    },
    eslint: {
        configFile: './.eslintrc',
    },
    module: {
        preLoaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'eslint-loader',
        }],
        loaders: [{
            test: /\.js$/,
            // 'react-hot' for 'react-hot-loader @version: 1.3.1'
            // loaders: ['react-hot', 'babel'],
            // 'react-hot-loader/webpack' for 'react-hot-loader @version: 3.x'
            loaders: ['react-hot-loader/webpack', 'babel'],
            include: path.join(__dirname, '../src'),
        }, {
            test: /\.jsx?/,
            loaders: ['babel'],
            exclude: /node_modules/,
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
            // loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
            include: path.join(__dirname, '../src/assets'),
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&minetype=image/svg+xml',
            include: path.join(__dirname, '../src/assets'),
        },
            ],
    },
    plugins: [
        //hot replace & deploy
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.OldWatchingPlugin(),
        // extract & combine CSS
        // new ExtractTextPlugin({
        //     filename: 'bundle.css',
        //     disabled: false,
        //     allChunks: true,
        // }),
        new ExtractTextPlugin('bundle.css', {
            disable: false,
            allChunks: true,
        }),
        // define variable can be used in any pages.
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('dev'),
            },
        }),
        // reduce chunk
        new webpack.optimize.OccurenceOrderPlugin(),
    ],
}