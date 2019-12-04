import express from "express";
const router = express.Router({});

/***********后端页面路由配置***********************************/
router.get("/back",(req,res)=>{
    //使用res.render来渲染 渲染back下面的index.html页面
    res.render("back/index.html")
});

/***********前端页面路由配置***********************************/
router.get("/web",(req,res)=>{
    //使用res.render来渲染 渲染back下面的index.html页面
    res.render("web/index.html");
});





//渲染完毕，需要输出
module.exports = router;
export default router;
