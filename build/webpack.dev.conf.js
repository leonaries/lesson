const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');
const devConfig = {
	mode: 'development',
    //devlopment devtool:'cheap-module-eval-source-map'
	//production devtool:'cheap-module-source-map'
    devtool: "cheap-module-eval-source-map",//sourcemap src与 dist 文件中的映射关系
    devServer: {
		contentBase:'./dist',
		open:true,
		port:8094,
		hot:true,
		hotOnly:true
	},
	module:{
		rules:[
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
		]
	},
	plugins:[
		new webpack.HotModuleReplacementPlugin()
	],
    // tree shaking 忽略了@babel/polly-fill 等没有导出的模块 是直接挂在到window对向上的,还有import 引入的css文件
	//此时需要在package.json 中去配置
	// sideEffects：[
    //     "*.css",
    //     "@babel/polly-fill"
    //   ],
    // optimization: {
    //     usedExports: true //导出的模块被引用时才进行打包
    // },

}

module.exports = merge( baseConfig, devConfig );