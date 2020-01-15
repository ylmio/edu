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
    const user_pwd = md5(req.body.user_pwd + S_KEY) || '';

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

/*
* 用户名和密码进行登陆 接口
* */
router.post('/user/api/login',(req,res,next)=>{
    //1.获取用户传过来的数据
    const user_name = req.body.user_name;
    const user_pwd = req.body.user_pwd;

    console.log("------------------------------------------");
    console.log(req.body);
    console.log("------------------------------------------");

    //2.查询数据
    User.findOne({user_name:user_name},(err,user)=>{
        if(err){
            return next(err);
        }

        //2.1如果用户存在
        if(user !== null){
            //2.2判断密码
            if(user.user_pwd === user_pwd){//密码匹配成功
                //session中存token
                req.session.token = user._id;
                console.log(req.session);
                res.json({
                    status:200,
                    result:{
                        token:user._id,
                        message:"登陆成功！"
                    }
                });
            }else{
                res.json({
                    status:1,
                    result:"输入密码有误"
                });
            }
        }else{
            res.json({
                status:1,
                result:"输入的口令不存在！"
            });
        }
    });

});

/*
* 退出登陆
* */
router.get("/back/user/api/logout",(req,res,next)=>{
    //方法一：将cookie的时间设置为0，只有cookie中携带的信息通过客户端请求传到服务器，由对应的session接收session才起作用，cookie没了session自然而然的将不起作用
    req.session.cookie.originalMaxAge = 0;
    //方式二：
    // req.session.destroy((err)=>{
    //     console.log(err);
    //     return next(err);
    // });

    //提示用户
    res.json({
        status:200,
        result:"退出登陆成功！"
    });

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
