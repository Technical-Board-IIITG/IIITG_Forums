var express=require("express");
var router=express.Router({mergeParams: true});
var comments=require("../models/comment");
var threads=require("../models/thread");
var forum=require("../models/forum");
/*=====================================================
    To display all threads associated with a forum
=======================================================*/
router.get("/", function(req,res)
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

router.get("/new", function(req,res){
    var forum_id=req.params.id;
    res.render("Threads/new",{forum_id:forum_id});

});

/*========================================
    Adding new thread to the forum
==========================================*/
router.post("/", function(req,res){
    console.log(req.body);
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
router.get("/:id/show", function(req,res){
    //res.send("Thread Deatils will be shown here");
    //console.log(req.params);
    //console.log(req.baseUrl);
    var baseUrl=req.baseUrl;
    threads.findById(req.params.id).populate("comments").exec(function(err, foundthread){
        if(err){
            console.log(err);
        }
        else{
            console.log(foundthread);
            res.render("Threads/show",{thread:foundthread, baseURL:baseUrl});
        }
    });
});
module.exports=router;