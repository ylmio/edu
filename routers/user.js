import express from "express"

const router = express.Router({});



/***********************数据接口API-start*******************************************/
/*
* 生成后台管理员
*
* */
router.post('/user/api/add',(req,res,next)=>{

});

/***********************数据接口API-end*******************************************/





/***********************页面的路由-start*******************************************/
router.get("/back/login",(req,res,next)=>{
    res.render("back/login.html");
});

router.get("/back/u_center",(req,res,next)=>{
    res.render("back/user_center.html");
});

router.get("/back/u_set",(req,res,next)=>{
    res.render("back/user_message.html");
});

router.get("/back/u_reset_pwd",(req,res,next)=>{
    res.render("back/reset_pwd.html");
});
/***********************页面的路由-end*******************************************/


export default router;//输出
