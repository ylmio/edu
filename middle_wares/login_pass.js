export default (req,res,next)=>{
    console.log(req.path);
    next();
}
