const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config');
const complier = webpack(config);//webpack 编译器
const app = express();

app.use(webpackDevMiddleware(complier,{
    publicPath:config.output.publicPath
}))

app.listen(8080,() =>{
    console.log('sever is running')
});