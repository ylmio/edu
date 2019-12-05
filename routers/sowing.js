import express from "express"
import Sowing from "./../models/sowing"
const router = express.Router({});
/*
* 往数据库中插入一条数据
* */
router.get("/sowing/api/add",(req,res)=>{
    //操作数据库
    const sowing = new Sowing({
        //图片名称
        image_title:"我是轮播图 ",
        //图片地址
        image_url:"like.com/address.com",
        //跳转链接
        image_link:"www.baidu.complete",
        //上架时间
        s_time:"2019-11-12",
        //下架时间
        e_time:"2019-12-12",
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
