//1.引入express
/*
* es5
* const express = require("express");
* */

/*
* es6
* */
import express from "express";

//2.创建服务器app
const app = express();

//3. 匹配路径
app.get("/",(req,res)=>{
    res.end("<h1>hello,itLike!<h1/>");
});

//4.监听
app.listen(3000,()=>{
   console.log("服务器已启动!")
});