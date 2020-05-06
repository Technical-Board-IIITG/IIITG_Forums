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
        if (err) {
            if (err.code === 11000) {
                console.log('User was already registered');
            }
        }
    });
    res.redirect("/");
});
/*=================================================
    This Method is for looging in users
===================================================*/
router.post("/login", function(req,res){
    User.findOne({EnrollNumber: req.body.EnrollNumber}, function(err, user){
        if(err|| !user ||req.body.password!== user.password){
            console.log("Incorrect Email Password");
        }else{
            console.log("Login is successfull");
        }
    });
    res.redirect("/");
});
module.exports=router;