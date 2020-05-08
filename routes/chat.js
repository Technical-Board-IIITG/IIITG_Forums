var express=require("express");
var router=express.Router();
var middleware =require("../middleware/index");
var Users=require("../models/user");
router.get("/", middleware.isLoggedIn,function(req,res){
    //console.log(req.session);
    Users.find({}, function(err, allUsers){
        if(err){
            console.log(err);
        }else{
            res.render("messenger/home",{Users: allUsers});
        }
    });
});
router.get("/:id", middleware.isLoggedIn,function(req,res){
    //console.log(req.params.id);
    Users.find({}, function(err, allUsers){
        if(err){
            console.log(err);
        }else{
            Users.findById(req.params.id,function(err, foundUser){
                if(err){
                    console.log(err)
                }else{
                    res.render("messenger/chat",{Users: allUsers, chattingTo:foundUser});
                }
            });
        }
    });
});
module.exports=router;