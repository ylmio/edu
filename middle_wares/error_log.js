import Error from "./../models/error"

export default (error,req,res,next)=>{
    const error_log = new Error({
        //错误名称
        error_name :error.name,
        //错误消息
        error_message :error.message,
        //错误堆栈
        error_stack :error.stack,
    });
    //保存数据
    error_log.save((err,result)=>{
        res.json({
            status:"500",
            result:"服务器内部错误",
            message:error.message//如果不想用户看到可以不写
        });
    });
};
