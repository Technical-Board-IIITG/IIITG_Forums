var express=require("express");
var router=express.Router();
var middleware =require("../middleware/index");
var Users=require("../models/user");
var Message=require("../models/user");
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
            //receiver
            Users.findById(req.params.id,function(err, foundUser){
                if(err){
                    console.log(err)
                }else{
                    console.log("Author Roll Number"+ req.session.user.EnrollNumber+"\nReceiver Roll Number"+foundUser.EnrollNumber);
                    Message.find({"author.EnrollNumber": req.session.user.EnrollNumber, "receiver.EnrollNumber": foundUser.EnrollNumber}, function(err, foundmessages){
                        if(err){
                            console.log("No messages were found");
                        }else{
                            console.log(foundmessages);
                        }
                    });
                    res.render("messenger/chat",{Users: allUsers, chattingTo:foundUser});
                }
            });
        }
    });
});
//Saving chat into the databse
router.post("/:id",middleware.isLoggedIn, function(req,res){
    console.log("Data received from AJAX is");
    console.log(req.body);
});
module.exports=router;