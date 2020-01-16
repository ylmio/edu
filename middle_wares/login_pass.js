export default (req,res,next)=>{
    console.log(req.path);
    //1.过滤所有非后端请求
    if(req.path.indexOf('/back/') === -1){
        return next();
    }

    //2.判断是否处于有效登陆失效
    if(req.session.token){
        return next();
    }

    //3.没有登陆 登陆失效
    //3.1 如果是接口相关（直接访问接口）
    if(req.path.indexOf('/api/')!==-1){
        return next(new Error("非法访问！"));
    }
    //3.2 如果是访问页面 （页面相关）
    res.render('back/login.html');

}
