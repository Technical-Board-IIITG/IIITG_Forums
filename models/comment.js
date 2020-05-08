var mongoose=require("mongoose");
var CommentSchema=new mongoose.Schema({
    text: String,
    //Each Comment has an author
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        Name: String
    }
});
module.exports=mongoose.model("Comment", CommentSchema);