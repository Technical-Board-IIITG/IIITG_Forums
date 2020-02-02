var mongoose=require("mongoose");
var CommentSchema=new mongoose.Schema({
    name: String,
});
module.exports=mongoose.model("Comment", CommentSchema);