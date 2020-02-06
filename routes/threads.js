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
//Show new thread route
router.get("/new", function(req,res){
    //res.send("New Thread will be made here");
    var forum_id=req.params.id;
    res.render("Threads/new",{forum_id:forum_id});

});

//Adding new thread to the forum
router.post("/", function(req,res){
    var Thread_name=req.body.Thread_name;
    var Thread_description=req.body.Thread_description;
    var newThread={Thread_name:Thread_name, Thread_description:Thread_description};
    //console.log(req.params.id);
    //Lookup forum Using ID
    forum.findById(req.params.id, function(err, foundforum){
        if(err)
        {
            console.log(err);
            res.redirect("/forum");
        }
        else{
            //console.log(req.body);
            threads.create(newThread, function(err, thread){
                if(err){
                    console.log(err);
                }else{
                    foundforum.thread.push(thread);
                    foundforum.save();
                    res.redirect("/forum/"+foundforum._id+"/thread");
                }
            });
        }
    });
});

module.exports=router;