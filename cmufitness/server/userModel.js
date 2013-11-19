var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username:  { type: String, index: true, unique: true },
  password: String,
  email:   { type: String, unique: true }
  },  
{ _id: false }); ///do this????

UserSchema.set('autoIndex', false);

module.exports = UserSchema;
