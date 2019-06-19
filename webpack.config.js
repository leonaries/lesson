const path = require('path');

module.exports = {
	mode: 'development',
	entry: {
		main: './src/index.js'
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
                        	importLoaders:2 //在@import引入前 继续走前面2个loader处理器
						}
                    },
					'sass-loader',
					'postcss-loader'
				]//css-loader会分析css文件之间的引用关系，然后style-loader会解析css-loader处理后的css文件  从数组末尾开始使用loader解析
            }
		]
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
}