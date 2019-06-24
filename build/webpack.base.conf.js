const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const devConfig = require('./webpack.dev.conf');
const prodConfig = require('./webpack.prod.conf');
const baseConfig = {
    entry: {
        main: './src/index.js'
    },
    module: {
        rules: [
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:[
                    {
                        loader:'babel-loader'
                    },
                    {
                        loader: "imports-loader?this=>window"
                    }
                ]
            },
            {
                test: /\.jpg$/,
                use: {
                    loader: 'url-loader',
                    options:{
                        //placeholder 占位符
                        name:'[name].[ext]',
                        outputPath:'images/',
                        limit:2048 //图片大小 超过这个值时会被打包到images目录下，否则会以base64的格式打包到bundle.js中 单位b
                    }

                }
            },
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader'
                }
            },
            {
                test: /\.(svg|eot|ttf|woff)(\?.*)?$/,
                loader: 'file-loader',
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: "src/index.html"
        }),
        new CleanWebpackPlugin({
            root:path.resolve(__dirname, '../dist'),
        }),
        new webpack.ProvidePlugin({
            $:'jquery'
        })
    ],
    optimization: {
        runtimeChunk: {
            name:'runtime'
        },
        usedExports: true,
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                vendors:{
                    test:/[\\/]node_modules[\\/]/,
                    priority:-10,
                    name:'vendors'
                }
            }
        }
    },
    performance: false,
    output: {
        filename: '[name].[contenthash].js',
        chunkFilename: "[name].[contenthash].js",
        path: path.resolve(__dirname, '../dist')
    }
};

module.exports = (env) => {
    console.log(env);
    if(env && env.production) {
        return merge(baseConfig , prodConfig)
    }else {
        return merge(baseConfig , devConfig)
    }
}