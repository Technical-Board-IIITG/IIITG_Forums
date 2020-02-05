var mongoose=require("mongoose");
var ThreadSchema=new mongoose.Schema({
    Thread_name: String,
    Thread_Description: String,
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]   
});
module.exports=mongoose.model("Thread", ThreadSchema);