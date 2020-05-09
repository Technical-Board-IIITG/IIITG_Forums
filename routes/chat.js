var express=require("express");
var router=express.Router();
var middleware =require("../middleware/index");
var Users=require("../models/user");
var Message=require("../models/message");
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
                    //console.log("Author Roll Number "+ req.session.user.EnrollNumber+"\nReceiver Roll Number"+foundUser.EnrollNumber);
                    //These messages were sent by the author (in Blue color)
                    Message.find({"author.EnrollNumber": req.session.user.EnrollNumber, "receiver.EnrollNumber": foundUser.EnrollNumber}, function(err, found_author_msg){
                        if(err){
                            console.log("No messages were found");
                            console.log(err);
                        }else{
                            //console.log("Here are the messages that are by the author "+req.session.user.EnrollNumber+" & receiver "+foundUser.EnrollNumber);
                            //console.log(found_author_msg);
                            //These messages were sent by the other party to the author (in White Color)
                            Message.find({"author.EnrollNumber": foundUser.EnrollNumber, "receiver.EnrollNumber": req.session.user.EnrollNumber}, function(err, found_receiver_texts){
                                if(err){
                                    console.log(err)
                                }else{
                                    /*
                                    console.log("For this particular chat");
                                    console.log("The following texts were sent by "+ req.session.user.EnrollNumber);
                                    console.log(found_author_msg);
                                    console.log("The following texts were sent by "+ foundUser.EnrollNumber);
                                    console.log(found_receiver_texts);
                                    */
                                   //Assigning Properties to two arrays
                                   var history=found_author_msg.concat(found_receiver_texts);
                                   //Sorting based on TimeStamp
                                   history.sort((a,b) => (a.createdAt > b.createdAt) ? 1 : ((b.createdAt > a.createdAt) ? -1 : 0));
                                   //console.log("Following is the history of chat between the two users");
                                   //console.log(history);
                                   res.render("messenger/chat",{Users: allUsers, chattingTo:foundUser, history: history}); 
                                }
                            });
                        }
                    });
                    
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