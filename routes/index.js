var express=require("express");
var router=express.Router();
var User=require("../models/user");
router.get("/", function(req,res){
    res.render("landing");
});
router.get("/signup", function(req,res){
    res.render("signup");
});
router.get("/login", function(req,res){
    res.render("login");
});
/*===================================================================
        THIS ROUTE IS FOR SAVING THE USERS(Handling Registerations) 
=====================================================================*/
router.post("/signup", function(req,res){
    let registered_user=new User(req.body);
    console.log(registered_user);
    registered_user.save(function(err, doc){
        if(err){
            console.log("Something went Wrong");
        }
    });
    res.redirect("/");
});


module.exports=router;