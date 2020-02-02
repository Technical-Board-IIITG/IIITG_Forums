var express=require("express");
var router=express.Router();
var Forums=require("../models/forum");
//Index Show all forums 
router.get("/", function(req,res){
    //res.send("All forms will be rendered here");
    Forums.find({}, function(err, allForums){
        if(err){
            console.log(err);
        }else{
            res.render("Forums/index",{forums:allForums});
        }
    });
});
/*
router.get("/:id", function(req,res){
    console.log(req);
});
*/
module.exports=router;