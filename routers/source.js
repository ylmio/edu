//引入
import express from "express"
import Source from "./../models/Source"
import formidable from "formidable"
import {basename} from "path"
import config from "./../src/config"
const router = express.Router({});
/*******************************接口api-start***************************************/

/*图片上传到uploads文件夹*/
router.post('/back/source/api/add_img',(req,res,next)=>{
    const form = new formidable.IncomingForm();
    form.uploadDir = config.uploadPath;//上传图片放置的文件夹
    form.keepExtensions = true;//保持文件的原始扩展名
    form.parse(req,(err,fields,files)=>{
        if(err){
            return next(err);
        }
        if(files.image_url){//如果有值
            console.log(files.image_url.path);
            let image_url = "http://localhost:3040/uploads/"+basename(files.image_url.path);
            res.json({
                status:200,
                result:image_url
            })
        }else{
            res.json({
                status:1,
                result:"上传图片路径有误！"
            })
        }

    })

});




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

/*
* 加载添加资源文章列表
*
*  **/
router.get("/back/source_add",(req,res,next)=>{
    res.render("back/source_add.html");
});











/*******************************页面路由-end***************************************/

//输出
export default router;
