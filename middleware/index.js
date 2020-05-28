//All the middleware Pertaining to login/signup goes here
var User= require("../models/user");
var Forums=require("../models/forum");
var Threads=require("../models/thread");
var Comments=require("../models/comment");
var middlewareObj ={}

middlewareObj.isLoggedIn= function(req,res,next){
    if(req.session.isLoggedIn){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}
middlewareObj.checkForumOwnership= function(req,res,next){
    if(req.session.isLoggedIn){
        Forums.findById(req.params.id, function(err, foundForum){
            if(err){
                req.flash("error", "Forum Not Found");
                res.redirect("back");
            } else{
                //If Forum Author and and logged in user are same then delete.
                if(foundForum.author.id.equals(req.session.user._id)){
                    next();
                }else{
                    req.flash("error", "You are not the creator of this forum");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("/login");
    }
};
middlewareObj.checkThreadOwnership= function(req,res,next){
    if(req.session.isLoggedIn){
        Threads.findById(req.params.id, function(err, foundThread){
            if(err){
                req.flash("error", "Thread Not Found");
                res.redirect("back");
            } else{
                if(foundThread.author.id.equals(req.session.user._id)){
                    next();
                }else{
                    req.flash("error", "You are not the creator of this Thread");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("/login");
    }
};
middlewareObj.checkCommentOwnership= function(req,res,next){
    if(req.session.isLoggedIn){
        Comments.findById(req.params.id, function(err, foundComment){
            if(err){
                req.flash("error", "Thread Not Found");
                res.redirect("back");
            } else{
                if(foundComment.author.id.equals(req.session.user._id)){
                    next();
                }else{
                    req.flash("error", "You are not the creator of this Thread");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("/login");
    }
};
module.exports = middlewareObj;