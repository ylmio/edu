//引入path中的join方法
import {join} from "path"
//输出全路径
export default {
    // views全路径
    viewsPath:join(__dirname,"../views"),
    //public全路径
    publicPath:join(__dirname,"../public"),
    //上传文件、图片路径
    uploadPath:join(__dirname,"../public/uploads"),
    port:parseInt(process.env.PORT,10) || 3040
}
