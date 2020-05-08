var mongoose=require("mongoose");
var messageSchema=new mongoose.Schema({
    text: String,
    //Each Message has an author
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        Name: String
    },
    //Each Message has an receiver
    reciever: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        Name: String
    }
});
module.exports=mongoose.model("Message", messageSchema);