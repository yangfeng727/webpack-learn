const path = require('path');
const webpack = require('webpack')
const merge = require('webpack-merge')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // 压缩css
const TerserPlugin = require("terser-webpack-plugin"); // 压缩js webpack5用terser-webpack-plugin替代uglifyjs-webpack-plugin【因为不支持es6】
const baseWebpackConfig = require('./webpack.base.conf.js')

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    // devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
        }),
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        // new webpack.NoEmitOnErrorsPlugin(),
        // // https://github.com/ampedandwired/html-webpack-plugin
        // new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     template: 'index.html',
        //     inject: true
        // }),
        // // copy custom static assets
        // new CopyWebpackPlugin([
        //     {
        //         from: path.resolve(__dirname, '../static'),
        //         to: config.dev.assetsSubDirectory,
        //         ignore: ['.*']
        //     }
        // ])
    ],
    optimization: {
        minimize: true,
        minimizer: [
            // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
            // `...`,
            new CssMinimizerPlugin(),
            // new TerserPlugin()
        ],
    },
})
module.exports = webpackConfig