var mongoose=require("mongoose");
var messageSchema=new mongoose.Schema({
    text: String,
    //Each Message has an author
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        Name: String,
        EnrollNumber: Number
    },
    //Each Message has an receiver
    receiver: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        Name: String,
        EnrollNumber: Number
    }
},{timestamps: true});
module.exports=mongoose.model("Message", messageSchema);