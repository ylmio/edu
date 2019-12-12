import querystring from "querystring";
//处理post请求
export default (req,res,next)=> {
    // console.log(req.method.toLocaleString());
    //1.过滤get请求,如果请求方法为get,则直接执行下一步操作
    if(req.method.toLocaleString()==="get"){
        return next();
    }
    //2.如果是普通的表单提交，要处理application/x-www-form-urlencoded
    //如果有文件（图片，音视频...）不要处理，交给multipart/form-data
    //console.log(req.headers["content-type"]); //在postman中请求测试
    if(req.headers["content-type"].startsWith("multipart/form-data")){
        return next();
    }

    //3.数据流的拼接
    let data = '';
    req.on("data",(chunk)=>{
        data +=chunk;
    });
    req.on("end",()=>{
        console.log(data);
        req.body = querystring.parse(data);
        next();
    })
}
