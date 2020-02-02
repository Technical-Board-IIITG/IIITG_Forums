var express=require("express");
var router=express.Router({mergeParams: true});
var threads=require("../models/thread");
var forum=require("../models/forum");
router.get("/", function(req,res)
{
   console.log(req.params.id);
   forum.findById(req.params.id).populate("thread").exec(function(err, foundforum){
        if(err){
            console.log(err);
        } else{
            console.log(foundforum);
            //res.send("Hi");
            res.render("Threads/index",{forum:foundforum});
        }
   });    
});
module.exports=router;