const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 
const passportLocalMongoose = require('passport-local-mongoose'); 
  
  
const userSchema = new Schema({    
  email: {type: String, required:true, unique:true}, 
  username : {type: String, unique: true, required:true}
}, {
  timestamps: true
}); 
  
// plugin for passport-local-mongoose 
userSchema.plugin(passportLocalMongoose); 
  
// export userschema
const User = mongoose.model("User", userSchema); 
module.exports = User;