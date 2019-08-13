import express from "express";
const router = express.Router({});

router.get("/back",(req,res)=>{
    res.render("back/index.html")
});

module.exports = router;
export default router;