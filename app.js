var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var cookieParser = require('cookie-parser');
var session = require('express-session');
var seedDB = require("./seeds");

//Requiring Routes
var forumRoutes = require("./routes/forums");
var threadRoutes = require("./routes/threads");
var indexRoutes = require("./routes/index");
var commentRoutes= require("./routes/comments");

mongoose.connect("mongodb://localhost/Project_forum");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(session({
   resave: false, // don't save session if unmodified
   saveUninitialized: false, // don't create session until something stored
   secret: 'shhhh, very secret lubba wubba dubba etc'
 }));
//To have a global variable across
app.use(function(req,res,next){
   if(req.session.isLoggedIn){
      res.locals.currentUser=req.session.user;   
   }else{
      res.locals.currentUser=null;
   }
   next();
});
//seed the database
//seedDB();

app.use("/", indexRoutes);
app.use("/forum", forumRoutes);
app.use("/forum/:id/thread", threadRoutes);
app.use("/forum/:id/thread/:id/comments", commentRoutes);


app.listen(8000, function () {
   console.log("The forum Server Has Started!");
});