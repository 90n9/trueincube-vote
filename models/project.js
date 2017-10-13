var mongoose = require('mongoose');

var projectSchema = mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String , required: true},
  desc: String,
  price: Number,
  photo: String,
});

module.exports = mongoose.model('Project', categorySchema, 'project');