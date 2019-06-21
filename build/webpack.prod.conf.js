const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');

const prodConfig = {
    mode: 'production',
    //devlopment devtool:'cheap-module-eval-source-map'
    //production devtool:'cheap-module-source-map'
    devtool: "cheap-module-source-map",//sourcemap src与 dist 文件中的映射关系
};

module.exports = merge(baseConfig , prodConfig);