var mongoose=require("mongoose");
var forumSchema=new mongoose.Schema({
    Forum_name: String,
    Forum_description: String,
    thread:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Thread"
        }
    ]   
});
module.exports=mongoose.model("Forum", forumSchema);