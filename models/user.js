var mongoose=require("mongoose");
var UserSchema=new mongoose.Schema({
    Name: {
        type:String,
        required: true
    },
    Email: {
        type:String,
        required: true,
        unique: true
    },
    Role: {
        type:String,
        required: true
    },
    EnrollNumber: {
        type:Number,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true
    },
    Department: {
        type:String,
        required: true
    },
    Gender: {
        type:String,
        required: true
    }
});
module.exports=mongoose.model("User", UserSchema);