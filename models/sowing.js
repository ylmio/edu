//引入mongoose
import mongoose from "mongoose"
//连接 协议:主机地址 localhost上线后改成线上的服务器地址;college为数据库名称
mongoose.connect("mongodb://localhost/college",{useNewUrlParse:true});
//监听 成功
mongoose.connection.on("open",()=>{
    console.log("数据库连接成功!")
});
//监听 失败
mongoose.connection.on("error",(err)=>{
    throw err;
});

//创建轮播图模式
const sowingSchema = mongoose.Schema({
    //图片名称
    image_title:{type:String,required:true},
    //图片地址
    image_url:{type:String,required:true},
    //跳转链接
    image_link:{type:String,required:true},
    //上架时间
    s_time:{type:String,required:true},
    //下架时间
    e_time:{type:String,required:true},
    //最后编辑 不须填写 默认当前时间
    l_edit:{type:Date,default:Date.now()},
    //添加时间 不须填写 默认当前时间
    c_time:{type:Date,default:Date.now()},
});

//输出sowingSchema模式 添加 修改轮播图遵循这一模式
const Sowing = mongoose.model("sowing",sowingSchema);
export default Sowing;

