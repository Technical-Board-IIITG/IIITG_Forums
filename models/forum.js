var mongoose=require("mongoose");
var Thread=require("./thread");

var forumSchema=new mongoose.Schema({
    Forum_name: String,
    Forum_description: String,
    //Each forum has an author
    author: {
        id: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "User"
        },
        Name: String
     },
    //Since A forum will contain multiple threads
    thread:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Thread"
        }
    ]   
});
//Implement on delete cascade
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