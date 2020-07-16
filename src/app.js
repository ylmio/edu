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
import loginPass from "./../middle_wares/login_pass"

//引入express-session
import session from 'express-session'
//引入connect-mongo用于express连接数据库存储session
const MongoStore = require('connect-mongo')(session);

//3.引入路由
import indexRoute from "./../routers/index"
import sowingRouter from "./../routers/sowing"
import userRouter from "./../routers/user"
import sourceRouter from "./../routers/source"


//2.创建服务器app
const app = express();

//使用session
app.use(session({
    secret: 'itlike',//加密字符串
    name:'like_id',//返回客户端key的名称，默认为connect_sid
    resave: false, //强制保存session,即使它没有变化
    saveUninitialized: true, // 强制将未初始化的session存储。当新建一个session且未设定属性或值时，它就处于未初始化状态。在设定cookie前，这对于登陆验证，减轻服务器存储压力，权限控制是有帮助的，默认为true
    cookie:{maxAge:1800000},
    rolling:true,//在每次请求时进行设置cookie，将重置cookie过期时间
    store: new MongoStore({
        url: 'mongodb://127.0.0.1/college',//数据库地址
        touchAfter: 24 * 3600 // 多长时间往数据库中更新存储一次，除了在会话数据上更改了某些数据外
    })
}));




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


//配置后端拦截中间件
app.use(loginPass);




//3. 挂载路由
app.use(indexRoute);
app.use(sowingRouter);
app.use(userRouter);
app.use(sourceRouter);

//4.挂载错误中间件
app.use(errorLog);

//上面的页面都没有每找到，渲染404页面
app.use((req,res)=>{
    res.render("404.html")
});


//4.监听

app.listen(config.port,()=>{
    console.log(`服务器已启动，端口是${config.port}`)
})
