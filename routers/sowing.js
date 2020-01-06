import express from "express"
import Sowing from "./../models/Sowing"
import formidable from "formidable"
import config from "./../src/config"
const router = express.Router({});
/*******************************接口api***************************************/
/*
* 往数据库中插入一条数据
* */
router.post("/sowing/api/add",(req,res,next)=>{
    const form = new formidable.IncomingForm();
    form.uploadDir = config.uploadPath;//上传图片放置的文件夹
    form.keepExtensions = true;//保持文件的原始扩展名
    form.parse(req,(err,fields,files)=>{
        if(err){
            return next(err);
        }
        console.log(fields);
        console.log(files);
    })
});

/*
* 获取所有的轮播图列表
*
* **/
router.get("/sowing/api/list",(req,res,next)=>{
    Sowing.find({},"_id image_title image_url image_link s_time e_time",(error,docs)=>{
        if(error){
            return next(error);
        }
        //返回数据
        res.json({
            status:200,
            result:docs
        });
    });
});

/*
* 获取一条轮播图（根据id）--模糊路径匹配
* /sowing/api/single/:sowingId 模糊匹配
* /sowing/api/single/*
* /sowing/api/single/111
    千万不要
    /sowing/api/single/a/b
 */

router.get("/sowing/api/single/:sowingId",(req,res,next)=>{
    Sowing.findById(req.params.sowingId,"_id image_title image_url image_link s_time e_time",(error,docs)=>{
        if(error){
            return next(error);
        }
        //返回数据
        res.json({
            status:200,
            result:docs
        });
    });
});

/**
 * 根据id去修改一条轮播图
 *
 * */
router.post("/sowing/api/edit",(req,res,next)=>{
    //1.根据id查询数据
    Sowing.findById(req.body.id,(err,sowing)=>{
        if(err){
            return next(err);
        }
        //2.修改轮播图数据
        const body = req.body;
        sowing.image_title = body.image_title;
        sowing.image_url = body.image_url;
        sowing.image_link = body.image_link;
        sowing.s_time = body.s_time;
        sowing.e_time = body.e_time;

        //3.保存
        /*
        * ——id  一样的：不会新增一条记录，而是去更新已有的数据
        * */
        sowing.save((err,result)=>{
            if (err){
                return next(err);
            }
            res.json({
                status:200,
                result:"修改数据成功"
            });
        });
    });


});

/*根据id删除一条记录**/
router.get("/sowing/api/remove/:sowingId",(req,res,next)=>{
    Sowing.deleteOne({_id:req.params.sowingId},(error,result)=>{
        if(error){
            return next(error);
        }
        console.log(result);
        //返回数据
        res.json({
            status:200,
            result:"成功删除轮播图！"
        });
    });
});

/*******************************页面路由***************************************/

/*
* 加载轮播图列表
*
*  **/
router.get("/back/s_list",(req,res,next)=>{
    //查询所有的数据
    Sowing.find((err,sowings)=>{
        if(err){
            return next(err);
        }
        //sowings,是接收到的数据。nunjuncks模板方式
        res.render("back/sowing_list.html",{sowings});
    })
});

/*
* 加载添加轮播图
*
*  **/
router.get("/back/s_add",(req,res,next)=>{
    res.render("back/sowing_add.html");
});




export default router;
