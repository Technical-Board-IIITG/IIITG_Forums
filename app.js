var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var seedDB = require("./seeds");

//Requiring Routes
var forumRoutes = require("./routes/forums");
var threadRoutes = require("./routes/threads");
var indexRoutes = require("./routes/index");
var commentRoutes= require("./routes/comments");

mongoose.connect("mongodb://localhost/Project_forum");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
//seed the database
//seedDB();

app.use("/", indexRoutes);
app.use("/forum", forumRoutes);
app.use("/forum/:id/thread", threadRoutes);
app.use("/forum/:id/thread/:id/comments", commentRoutes);


app.listen(8000, function () {
   console.log("The forum Server Has Started!");
});