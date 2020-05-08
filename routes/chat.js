var express=require("express");
var router=express.Router();
router.get("/", function(req,res){
    res.render("messenger/home");
});
module.exports=router;