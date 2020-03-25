var mongoose=require("mongoose");
var Thread=require("./thread");

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

forumSchema.pre("remove", async function(next){
    try{
        await Thread.remove({
            "_id":{
                $in: this.thread
            }
        });
        next();
    }catch(err){
        next(err);
    }
});
module.exports=mongoose.model("Forum", forumSchema);