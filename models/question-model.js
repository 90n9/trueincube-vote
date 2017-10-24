var mongoose = require('mongoose');

var questionSchema = mongoose.Schema({
    "project_id":{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    "title": String,
    "choice_type": String,
    "choice": [String],
    "create_date": { type: Date, default: Date.now },
    "update_date": { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', questionSchema, 'question');