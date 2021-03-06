var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var cookieParser = require('cookie-parser');
var session = require('express-session');
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var flash=require("connect-flash");
var Message=require("./models/message");
var Users=require("./models/user");


//Requiring Routes
var forumRoutes = require("./routes/forums");
var threadRoutes = require("./routes/threads");
var indexRoutes = require("./routes/index");
var commentRoutes= require("./routes/comments");
var chatRoutes=require("./routes/chat");

//console.log(process.env.DATABASEURL);
mongoose.connect("mongodb://localhost/Project_forum");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


//mongoose.connect("mongodb+srv://i_rebel_aj:akshayjain123@forums-5jlpv.mongodb.net/test?retryWrites=true&w=majority");
//mongoose.connect(process.env.DATABASEURL);


app.use(flash());
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
   res.locals.error=req.flash("error");
   res.locals.success=req.flash("success");
   next();
});

app.use("/", indexRoutes);
app.use("/forum", forumRoutes);
app.use("/forum/:id/thread", threadRoutes);
app.use("/forum/:id/thread/:id/comments", commentRoutes);
app.use("/chat", chatRoutes);
app.get("*", (req,res)=>{
   res.send("Aww snap (An Error page must go here)");
});
/*================================================
   Handling Socket (i.e the Chatting facility)
==================================================*/
var sockets={};
function getChatSocket(socket){
   return sockets["chat-user-"+socket];
}
function setChatSocket(socket, data){
   sockets["chat-user-"+socket] = data;
}
function deleteChatSocket(socket){
   delete sockets["chat-user-"+socket];
}
//On a Client Connection
io.on('connection', (socket) => {
   console.log('a user connected');
   socket.on('come_online', function (userId) {
      socket.soketid = userId;
      setChatSocket(socket.soketid, socket);
 });
   socket.on('disconnect', () => {
     console.log('user disconnected');
     var userId = socket.soketid;
      deleteChatSocket(socket.soketid);
   });
   socket.on('chat_message', function (message, to, from) {
         if(getChatSocket(to)){
            console.log("User is online and session has been established");
            getChatSocket(to).emit('chat_message',message, from);
         }else{
            console.log("user is not online");
      }
      socket.emit('chat_message',message,from);
      //Saving the message in database
      Users.findOne({EnrollNumber: to}, function(err,receiver){
         if(err){
            console.log(err);
         }else{
            Users.findOne({EnrollNumber: from}, function(err, sender){
                  if(err){
                     console.log(err);
                  }else{
                        var text=message;
                        var author={
                           id: sender._id,
                           Name: sender.Name,
                           EnrollNumber: sender.EnrollNumber
                        };
                        var received={
                           id: receiver._id,
                           Name: receiver.Name,
                           EnrollNumber: receiver.EnrollNumber
                        }
                        Message.create({text: text, author:author, receiver:received}, function(err,message){
                           if(err){
                              console.log("Was Not able to save in database");
                              console.log(err);
                           }
                        });
                  }
            });
         }
      });
  });
});
/*=====================================
      Starting The Server
=======================================*/
http.listen(process.env.PORT||3000, process.env.IP, function () {
   console.log("The forum Server Has Started!");
   //console.log(PORT);
});