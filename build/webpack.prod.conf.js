const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require('./webpack.base.conf');

const prodConfig = {
    mode: 'production',
    //devlopment devtool:'cheap-module-eval-source-map'
    //production devtool:'cheap-module-source-map'
    // devtool: "cheap-module-source-map",//sourcemap src与 dist 文件中的映射关系
    module:{
        rules:[
            {
                test: /\.scss|css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader:'css-loader',
                        options:{
                            importLoaders:2, //在@import引入前 继续走前面2个loader处理器
                            modules:false
                        }
                    },
                    'sass-loader',
                    'postcss-loader'
                ]//css-loader会分析css文件之间的引用关系，然后style-loader会解析css-loader处理后的css文件  从数组末尾开始使用loader解析
            },
        ]
    },
    optimization:{
        minimizer:[
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins:[
       new MiniCssExtractPlugin({
           filename:'[name].css',
           chunkFilename:'[name].chunk.css'
       })
    ]
};

module.exports = prodConfig;