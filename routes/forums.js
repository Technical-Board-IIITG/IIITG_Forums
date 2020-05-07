var express=require("express");
var router=express.Router();
var Forums=require("../models/forum");
var middleware =require("../middleware/index");
//Index Show all forums 
router.get("/",middleware.isLoggedIn, function(req,res){
    //console.log(req.session.user.Name);
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
    var Forum_name=req.body.Forum_name;
    var Forum_description=req.body.Forum_description;
    var newForum={Forum_name: Forum_name, Forum_description:Forum_description};
    //Adding new forum to the Database
    Forums.create(newForum, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/forum");
        }
    });
});



//New- Show form to create new forum
router.get("/new", function(req,res){
    res.render("Forums/new");
});
/*=================================
    Showing a edit forum route
===================================*/
router.get("/:id/edit", function(req,res){
    //console.log(req.params.id);
    Forums.findById(req.params.id, function(err, foundforum){
        if(err){
            console.log("Forum not found");
            console.log(err);
        }
        else{
            res.render("Forums/edit", {forum: foundforum});
            //res.send("Edit Route for the forum will Go here");
        }
    })
    
});
/*=============================
    PUT Request to edit forum
===============================*/
router.put("/:id",function(req,res){
    //console.log(req.body);
    //res.send("Update Route");
    Forums.findByIdAndUpdate(req.params.id,req.body,function(err, updatedBlog){
        if(err){
            console.log(err);
            res.redirect("/forums");
        }else{
            res.redirect("/forum/"+req.params.id+"/thread");
        }
    });
});
/*==============================
    Delete a forum
================================*/
router.delete("/:id", function(req,res){
    //Something to happen.
    //res.send("You have reached the destroy route");
    /*
        Delete This Way to make cascading deletion possible 
    */
    Forums.findById(req.params.id, function(err, foundforum)
    {
        if(err){
            console.log(err);
        }else{
            foundforum.remove();
        }
        res.redirect("/forum");
    });
});
module.exports=router;