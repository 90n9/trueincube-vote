var mongoose = require('mongoose');

var schema = mongoose.Schema({
  username: { type: String , required: true},
  firstname: String,
  lastname: String,
  email: { type: String , required: true},
  password: { type: String , required: true},
  create_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', schema, 'user');