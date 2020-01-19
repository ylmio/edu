//引入
import express from "express"
import Source from "./../models/Source"
import formidable from "formidable"
import {basename} from "path"
import config from "./../src/config"
const router = express.Router({});
/*******************************接口api-start***************************************/

/*******************************接口api-end***************************************/



/*******************************页面路由-start***************************************/
/*
* 加载资源文章列表
*
* **/
router.get("/back/source_list",(req,res,next)=>{
    //查询所有的数据
    Source.find((err,sources)=>{
        if(err){
            return next(err);
        }
        //sources,是接收到的数据。nunjuncks模板方式
        res.render("back/source_list.html",{sources});
    })
});
/*******************************页面路由-end***************************************/

//输出
export default router;
