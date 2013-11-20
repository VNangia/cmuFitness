var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  _id : Number, 
  username:  { type: String, index: true, unique: true },
  password: String,
  email:   { type: String, unique: true }
  });

UserSchema.set('autoIndex', false);

module.exports = UserSchema;
