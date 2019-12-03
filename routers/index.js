import express from "express";
const router = express.Router({});
//访问路由，访问后端界面
router.get("/back",(req,res)=>{
    //使用res.render来渲染 渲染back下面的index.html页面
    res.render("back/index.html")
});

module.exports = router;
export default router;
