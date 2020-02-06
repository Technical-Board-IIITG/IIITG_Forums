var express=require("express");
var router=express.Router();
var Forums=require("../models/forum");
//Index Show all forums 
router.get("/", function(req,res){
    Forums.find({}, function(err, allForums){
        if(err){
            console.log(err);
        }else{
            res.render("Forums/index",{forums:allForums});
        }
    });
});
//Create- Add new campgroud to the database
router.post("/", function(req,res){
    console.log(req.body);
    var Forum_name=req.body.Forum_name;
    var Forum_description=req.body.Forum_description;
    var newForum={Forum_name: Forum_name, Forum_description:Forum_description};
    //Adding new forum to the Database
    Forums.create(newForum, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            console.log(newlyCreated);
            res.redirect("/forum");
        }
    });
});



//New- Show form to create new forum
router.get("/new", function(req,res){
    res.render("Forums/new");
});
module.exports=router;