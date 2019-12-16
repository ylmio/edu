import express from "express"
import Sowing from "./../models/Sowing"
const router = express.Router({});
/*******************************接口api***************************************/
/*
* 往数据库中插入一条数据
* */
router.post("/sowing/api/add",(req,res)=>{
    //1.获取数据
    const body = req.body;
    //操作数据库
    const sowing = new Sowing({
        //图片名称
        image_title:body.image_title,
        //图片地址
        image_url:body.image_url,
        //跳转链接
        image_link:body.image_link,
        //上架时间
        s_time:body.s_time,
        //下架时间
        e_time:body.e_time,
    });
    //保存数据
    sowing.save((err,result)=>{
        //如果出错，返回错误信息
        if(err){
            throw err;
        }
        //否则，以json的形式将数据返回出去
        res.json({
            status:"200",
            result:"添加轮播图成功"
        });
    });
});


export default router;
