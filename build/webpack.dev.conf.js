const path = require('path');
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf.js')
// 开发环境调试地址
const targetUrl = {
    testUrl: 'https://localhost:11000/' // 改为自己的后端地址
}

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        https: false, // 是否开启https
        // static: {
        //     directory: path.join(__dirname, '../www'), // 静态本地服务
        // },
        compress: true, // 启用 gzip compression： 如果为 true ，开启虚拟服务器时，为你的代码进行压缩。加快开发流程和优化的作用
        host: 'localhost',
        port: 9000,
        hot: true,
        open: false,
        proxy: {
            '/api': {
                target: targetUrl.testUrl,
                changeOrigin: true,
                pathRewrite: {'^/api': ''},
            },
        },
    },
    plugins: [
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
    ]
})
module.exports = webpackConfig