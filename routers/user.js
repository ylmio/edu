import express from "express"
import User from "./../models/User"
import md5 from "blueimp-md5"
import formidable from "formidable"
import config from "./../src/config"
import {basename} from "path"
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

/*
* 获取用户信息 - 部分
* */
router.get('/back/user/api/u_msg/:token',(req,res,next)=>{
    console.log(req);
    //查询用户信息
    User.findById(req.params.token,"-_id real_name user_img intro_self points rank gold",(err,user)=>{
        if(err){
            return next(err);
        }
        if(user){//如果查到，返回user信息
            res.json({
                status:200,
                result:user
            });
        }else{//如果没有查到(几乎不会出现) 销毁token
            req.session.cookie.maxAge = 0;
        }
    });
});

/*
* 获取用户信息 - 所有
* */
router.get('/back/user/api/u_msg_all/:token',(req,res,next)=>{
    console.log(req);
    //查询用户信息
    User.findById(req.params.token,"-_id -user_name -user_pwd -l_time -c_time",(err,user)=>{
        if(err){
            return next(err);
        }
        if(user){//如果查到，返回user信息
            res.json({
                status:200,
                result:user
            });
        }else{//如果没有查到(几乎不会出现) 销毁token
            req.session.cookie.maxAge = 0;
        }
    });
});

/**
 * 根据id（token）去修改一条用户信息
 *
 * */
router.post("/back/user/api/edit",(req,res,next)=>{
    const form = new formidable.IncomingForm();
    form.uploadDir = config.uploadPath;//上传图片放置的文件夹
    form.keepExtensions = true;//保持文件的原始扩展名
    form.parse(req,(err,fields,files)=>{
        if(err){
            return next(err);
        }
        //1.取出普通字段
        let body = fields;
        console.log(body);
        //2.根据id查询文档
        User.findById(body.token,(err,user)=>{
            if(err){
                return next(err);
            }
            //2.1修改文档的内容
            user.real_name = body.real_name;
            user.user_img = body.user_img || basename(files.user_img.path);
            user.phone = body.phone;
            user.email = body.email;
            user.join_time = body.join_time;
            user.intro_self = body.intro_self;

            //2.2保存
            user.save((err,result)=>{
                if(err){
                    return next(err);
                }
                res.json({
                    status:200,
                    result:"用户信息修改成功"
                });

            })
        });

    })
});

/*
* 根据token修改密码
* */
router.post("/back/user/api/reset",(req,res,next)=>{
    //1.获取数据
    const token = req.body.token;
    const old_pwd = req.body.old_pwd;
    const new_pwd = req.body.new_pwd;
    //2.根据token查询用户
    User.findById(token,(err,user)=>{
        if(err){//如果错误，进入错误的中间件
            return next(err);
        }
        //2.1查询有
        if(user){//
            //2.2取出散列
            if(user.user_pwd !== old_pwd){
                res.json({//没有
                    status:1,
                    result:"原密码不正确！"
                });
            }
            //2.3更换密码
            user.user_pwd = new_pwd;
            //2.4保存到数据库
            user.save((err,result)=>{
                if(err){//如果错误，进入错误的中间件
                    return next(err);
                }
                //2.5告诉客户端
                res.json({
                    status:200,
                    result:"密码修改成功"
                });
            })
        }else{
            res.json({//没有
                status:1,
                result:"非法用户"
            });
        }

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
