var express=require("express");
var router=express.Router({mergeParams: true});
var Comment=require("../models/comment");
var Thread=require("../models/thread");
//var forum=require("../models/forum");

/*=========================================
    Saving New Comments in the DataBase
===========================================*/
router.post("/", function(req,res){
    //Find the thread
    //console.log("Base URL is "+req.baseUrl);
    var str=req.baseUrl;
    var redirectURL=str.replace("comments","show");
    Thread.findById(req.params.id, function(err, thread){
        if(err){
            console.log(err);
            res.send("Failed to Find the thread");
        } else{
            //console.log(req.body);
            Comment.create(req.body, function(err, comment){
                if(err){
                    console.log(err);
                    res.send("Failed to add comment");
                }else{
                    //console.log("Comment to be saved is\n(PS check spellings)");
                    //console.log(comment);
                    comment.save();
                    thread.comments.push(comment);
                    thread.save();
                    res.redirect(redirectURL);
                }
            })
        }
    });
});
module.exports=router;