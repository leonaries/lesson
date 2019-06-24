const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry: {
        main: './src/index.js'
    },
    module: {
        rules: [
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:'babel-loader',
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
    ],
    optimization: {
        usedExports: true,
        splitChunks: {
            chunks: "all"
        }
    },
    output: {
        filename: '[name].js',
        chunkFilename: "[name].chunk.js",
        path: path.resolve(__dirname, '../dist')
    }
};