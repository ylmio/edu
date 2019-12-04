import express from "express";
const router = express.Router({});

/***********后端页面路由配置***********************************/
router.get("/back",(req,res)=>{
    //使用res.render来渲染 渲染back下面的index.html页面
    res.render("back/index.html")
});

/***********前端页面路由配置***********************************/
router.get("/",(req,res)=>{
    //使用redirect将直接访问localhost:3000页面重定向到前端主页面
    res.redirect("/web")
});

router.get("/web",(req,res)=>{
    //使用res.render来渲染 渲染back下面的index.html页面
    res.render("web/index.html");
});

/***********默认页面路由配置***********************************/




//渲染完毕，需要输出
module.exports = router;
export default router;
