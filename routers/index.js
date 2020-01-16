import express from "express";
import Sowing from "./../models/Sowing"
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
    //使用res.render来渲染 渲染web下面的index.html页面
    res.render("web/index.html");
});

router.get("/web/res",(req,res)=>{
    //查询所有的数据
    Sowing.find((err,sowings)=>{
        if(err){
            return next(err);
        }
        //追加一个字段
        let tag = ["one","two","three","four"];
        for(let i=0;i<tag.length;i++){
            let sowing = sowings[i];
            sowing["image_tag"] = tag[i];
        }

        //使用res.render来渲染 渲染web下面的resources.html页面
        res.render("web/resources.html",{sowings});
    })
});

router.get("/web/res_c",(req,res)=>{
    //使用res.render来渲染 渲染web下面的resources_content.html页面
    res.render("web/resources_content.html");
});
//渲染完毕，需要输出
module.exports = router;
export default router;
