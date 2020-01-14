import express from "express"
import User from "./../models/User"
import md5 from "blueimp-md5"
const router = express.Router({});

//固定加盐的字符串
const S_KEY = '@Walk1314?.ItE.Com#';

/***********************数据接口API-start*******************************************/
/*
* 生成后台管理员
*
* */
router.post('/user/api/add',(req,res,next)=>{
    const user_name = req.body.user_name || '';
    const user_pwd = md5(req.body.user_pwd) + S_KEY || '';

    //操作数据库
    const user = new User({
        //用户名
        user_name:user_name,
        //密码
        user_pwd:user_pwd
    });

    //存储
    user.save((err,result)=>{
        if(err){
            return next(err)
        }
        res.json({
            status:200,
            result:"添加管理员成功"
        });
    })

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
