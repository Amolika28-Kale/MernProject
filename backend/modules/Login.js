var mongoose=require("mongoose");

const LoginSchema=new  mongoose.Schema({
    username:{type:String},
    userpassword:{type:String}

});

const Login=mongoose.model("Login",LoginSchema,"Login");

module.exports=Login;
