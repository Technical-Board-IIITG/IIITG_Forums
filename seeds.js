var mongoose=require("mongoose");
var Forum=require("./models/forum");
var Thread=require("./models/thread");
var data=[
    {
        Forum_name: "Employbility Journey",
        Forum_description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    },
    {
        Forum_name: "Hostel Diaries",
        Forum_description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    },
    {
        Forum_name: "Computer Hardware",
        Forum_description: "XYZ"
    }
]
function seedDB(){
    //Remove all forums first
    /*
    Forum.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("Removed Forums");
        */
        //Add a few forums
        data.forEach(function(seed){
            Forum.create(seed, function(err, forum){
                if(err){
                    console.log(err);
                }else{
                    console.log("Added A forum");
                    //Create threads
                    Thread.create(
                        {
                            Thread_name: "Intel PC sucks",
                        }, function(err, thread){
                            if(err){
                                console.log(err);
                            }else{
                                forum.thread.push(thread);
                                forum.save();
                                console.log("Added A new thread");
                            }
                        });
                }
            });
        });
    //});
}
module.exports=seedDB;