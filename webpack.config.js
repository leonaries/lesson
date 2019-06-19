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
            }
		]
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
}