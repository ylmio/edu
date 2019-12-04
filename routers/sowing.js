import express from "express"
import Sowing from "./../routers/sowing"
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
    });
});


export default router;
