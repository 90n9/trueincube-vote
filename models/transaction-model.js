var mongoose = require('mongoose');

var transactionSchema = mongoose.Schema({
    "project_id":{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }, 
    "user": { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    "activity":  String ,
    "create_date": { type: Date, default: Date.now },
    "update_date": { type: Date, default: Date.now }

});

module.exports = mongoose.model('Transaction', transactionSchema, 'transaction');