const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = {
	mode: 'development',
	entry: {
		main: './src/index.js',
        sub: './src/index.js',
	},
	module: {
		rules: [
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
		new CleanWebpackPlugin()
	],
	output: {
        publicPath: "http://cdn.com.cn", //如果要把js文件放到cdn服务器上，就需要配置 路径
        filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	}
}