//1.引入express
/*
* es5
* const express = require("express");
* */

/*
* es6
* */
import express from "express"
import config from "./config"
import nunjucks from "nunjucks"
import bodyParser from "./../middle_wares/body_parser"
import errorLog from "./../middle_wares/error_log"

//3.引入路由
import indexRoute from "./../routers/index"
import sowingRouter from "./../routers/sowing"
import userRouter from "./../routers/user"


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

//先配置数据请求中间件，再挂载路由
app.use(bodyParser);

//3. 挂载路由
app.use(indexRoute);
app.use(sowingRouter);
app.use(userRouter);

//4.挂载错误中间件
app.use(errorLog);

//上面的页面都没有每找到，渲染404页面
app.use((req,res)=>{
    res.render("404.html")
});


//4.监听
app.listen(3040,()=>{
   console.log("服务器已启动!")
});
