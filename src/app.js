//1.引入express
/*
* es5
* const express = require("express");
* */

/*
* es6
* */
import express from "express";
import config from "./config";
import nunjucks from "nunjucks"

//3.引入路由
import indexRoute from "./../routers/index"

//2.创建服务器app
const app = express();

//2.1.配置公共资源访问路径
app.use(express.static(config.publicPath));

//2.2 配置中间件(nunjucks模板引擎作用到views文件夹中的模板)
nunjucks.configure(config.viewsPath, {
    autoescape: true,
    express: app,
    noCache: true//不使用缓存,,模板每次都会重新编译
});

//3. 挂载路由
app.use(indexRoute);

//匹配路径
app.get("/",(req,res)=>{
    res.end("<h1>hello,world<h1/>");
});

//4.监听
app.listen(3000,()=>{
   console.log("服务器已启动!")
});
