//All the middleware Pertaining to login/signup goes here
var User= require("../models/user");
var middlewareObj ={}

middlewareObj.isLoggedIn= function(req,res,next){
    console.log("My Session variable is");
    console.log(req.session);
    if(req.session.isLoggedIn){
        console.log("Session variable is set");
        return next();
    }
    //req.flash("error", "You need to be logged in to do that");
    //console.log(req.session);
    console.log("User is not logged in");
    res.redirect("/login");
}
module.exports = middlewareObj;