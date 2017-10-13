var mongoose = require('mongoose');

var projectSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  project_name: { type: String , required: true},
  status: { type: Boolean, default: true },
  closed_date: Date,
  create_date: { type: Date, default: Date.now },
  update_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Project', projectSchema, 'project');