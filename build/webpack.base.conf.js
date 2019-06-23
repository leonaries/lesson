const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry: {
        // lodash:'./src/lodash.js',
        main: './src/index.js'
    },
    module: {
        rules: [
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:'babel-loader',
                // options:{
                // 	//业务代码时配置 polifill 会污染全局环境
                // 	presets:[
                // 		["@babel/preset-env",
                // 			{
                // 				useBuiltIns:'usage',
                //                 targets: {
                //                     edge: "17",
                //                     firefox: "60",
                //                     chrome: "67",
                //                     safari: "11.1",
                //                 },}
                //          ]
                // 	]
                // 	//编写类库时  利用闭包避免污染全局变量
                // 	// "plugins":[
                // 	// 	[
                // 	// 		"@babel/plugin-transform-runtime",
                //     //         {
                //     //             "absoluteRuntime": false,
                //     //             "corejs": 2,
                //     //             "helpers": true,
                //     //             "regenerator": true,
                //     //             "useESModules": false
                //     //         }
                // 	// 	]
                // 	// ]
                // }
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
                test: /\.scss|css$/,
                use: [
                    'style-loader',
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
        splitChunks: {
            chunks: "all"
        }
    },
    output: {
        publicPath: "./",
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist')
    }
};