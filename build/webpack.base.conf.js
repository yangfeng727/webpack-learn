const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 抽离css为单独文件
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 可以把打包后的 CSS 或者 JS 文件引用直接注入到 HTML 模板中，这样就不用每次手动修改文件引用了。

// 自定义插件
const MyPlugin = require('./myPlugin')

const devMode = process.env.NODE_ENV !== 'production'; // 判断当前环境是开发环境还是 部署环境，主要是 mode属性的设置值。

let cssRule = [
    MiniCssExtractPlugin.loader, // 样式表抽离成专门的单独文件并且设置版本号
    {
        // 将 CSS 转化成 CommonJS 模块
        loader: 'css-loader',
        options: {
            sourceMap: devMode
        }
    },
    {
        // 结合postcss-preset-env添加css前缀
        loader: 'postcss-loader',
        options: {
            sourceMap: devMode,
            // postcssOptions:{
            //     plugins: [
            //         ['postcss-preset-env',{}],
            //         // ['autoprefixer']
            //     ]
            // }
        }
    },
]

module.exports = {
    // mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist'),
        clean: true, // 在生成文件之前清空 output 目录- webpack 5.20.0+后才有此属性
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    ...cssRule
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    ...cssRule,
                    // 这里使用 sass 、 sass-loader来变编译scss
                    // 而不是之前的 node-sass、sass-loader 组合，因为node-sass在macOSX系统上 因为m1芯片上不兼容X86会报错
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: devMode
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    ...cssRule,
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: devMode
                        }
                    }
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },

            // webpack5之前的
            // {
            //     test: /\.(woff|woff2|eot|ttf|otf)$/,
            //     use: [
            //         {
            //             loader: 'url-loader', // url-loader 包含file-loader
            //             options: {
            //                 limit: 10000
            //             }
            //         }
            //     ]
            // }, {
            //     test: /\.(png|svg|jpg|gif|jpeg|ico)$/,
            //     use: [
            //         {
            //             loader: 'url-loader',
            //             options: {
            //                 limit: 1024*50,// 小于50k转base64
            //                 name:'img/[name].[hash:8].[ext]'
            //             }
            //         }
            //     ]
            // }

            // webpack5之后使用Resource 资源
            {
                test: /\.(png|svg|jpg|gif|jpeg|ico)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[name].[hash:8].[ext]'
                }
            }
        ]
    },
    plugins: [
        new MyPlugin({myParam: '参数'}),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css', // 设置最终输出的文件名
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
        }),
        new HtmlWebpackPlugin({
            // title: 'AICODER 全栈线下实习', // 默认值：Webpack App
            filename: 'index.html', // 默认值： 'index.html'
            template: path.resolve(__dirname, '../index.html'),
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeAttributeQuotes: true // 移除属性的引号
            }
        })
    ]
};