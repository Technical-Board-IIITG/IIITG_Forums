var express=require("express");
var router=express.Router({mergeParams: true});
var comments=require("../models/comment");
var threads=require("../models/thread");
var forum=require("../models/forum");
var middleware=require("../middleware/index");
/*=====================================================
    To display all threads associated with a forum
=======================================================*/
router.get("/", middleware.isLoggedIn,function(req,res)
{
   forum.findById(req.params.id).populate("thread").exec(function(err, foundforum){
        if(err){
            console.log(err);
        } else{
            res.render("Threads/index",{forum:foundforum});
        }
   });    
});
/*========================================
        Show new thread creation form
==========================================*/

router.get("/new",middleware.isLoggedIn, function(req,res){
    var forum_id=req.params.id;
    res.render("Threads/new",{forum_id:forum_id});

});

/*========================================
    Adding new thread to the forum
==========================================*/
router.post("/", middleware.isLoggedIn,function(req,res){
    //console.log(req.body);
    var Thread_name=req.body.Thread_name;
    var Thread_Description=req.body.Thread_Description;
    var newThread={Thread_name:Thread_name, Thread_Description:Thread_Description};
    //console.log("The new Thread Created\n");
    //console.log(newThread);
    //Lookup forum Using ID
    forum.findById(req.params.id, function(err, foundforum){
        if(err){
            console.log(err);
            res.redirect("/forum");
        }
        else{
            //console.log(req.body);
            threads.create(newThread, function(err, newlyCreated){
                if(err){
                    console.log(err);
                }else{
                    //console.log(newlyCreated);
                    //var merged={...newlyCreated, ...newThread};
                    //console.log(merged);
                    foundforum.thread.push(newlyCreated);
                    foundforum.save();
                    res.redirect("/forum/"+foundforum._id+"/thread");
                }
            });
        }
    });
});
/*=====================================
        Show a particular thread
=======================================*/
router.get("/:id/show", middleware.isLoggedIn,function(req,res){
    //res.send("Thread Deatils will be shown here");
    //console.log(req.params);
    //console.log(req.baseUrl);
    var baseUrl=req.baseUrl;
    threads.findById(req.params.id).populate("comments").exec(function(err, foundthread){
        if(err){
            console.log(err);
        }
        else{
            //console.log(foundthread);
            res.render("Threads/show",{thread:foundthread, baseURL:baseUrl});
        }
    });
});
/*====================================
        ShHOW EDIT THREAD PAGE
======================================*/
router.get("/:id/edit", middleware.isLoggedIn,function(req,res){
    //console.log(req.baseUrl);
    threads.findById(req.params.id, function(err, foundThread){
        if(err){
            console.log("Thread Could not be found");
        }else{
            res.render("Threads/edit.ejs",{thread: foundThread, baseUrl: req.baseUrl});
        }
    });
});
/*====================================
         EDIT THREAD INSIDE DATABASE
======================================*/
router.put("/:id",middleware.isLoggedIn,function(req,res){
    threads.findByIdAndUpdate(req.params.id,req.body,function(err, updatedThread){
        if(err){
            console.log(err);
            res.redirect("/forums");
        }else{
            res.redirect(req.baseUrl+"/"+req.params.id+"/show");
        }
    });
});
/*===================================
    DELETE A THREAD FROM DATABSE
=====================================*/
router.delete("/:id", middleware.isLoggedIn,function(req,res){
    threads.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        }
        res.redirect(req.baseUrl);
    });
});
module.exports=router;