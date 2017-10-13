var mongoose = require('mongoose');

var schema = mongoose.Schema({
  username: { type: String , required: true, index: { unique: true }, lowercase: true, trim: true},
  firstname: String,
  lastname: String,
  email: { type: String , required: true, lowercase: true, trim: true},
  password: { type: String , required: true, trim: true},
  create_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', schema, 'user');