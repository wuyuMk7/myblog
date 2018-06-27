var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
var webpack = require('webpack');

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',
    mode: 'development',

    output: {
        path: helpers.root('..', 'public', 'dist'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    plugins: [
        new ExtractTextPlugin('[name].css'),
        new webpack.NamedModulesPlugin()
        //new webpack.HotModuleReplacementPlugin()
    ],

    devServer: {
        historyApiFallback: true,
        stats: 'minimal',
        hotOnly: true
    }

});
