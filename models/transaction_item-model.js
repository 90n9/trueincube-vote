var mongoose = require('mongoose');

var transactionItemSchema = mongoose.Schema({

    "transaction_id": { type:  mongoose.Schema.Types.ObjectId, ref: 'Transaction' }, 
    "question": { type:  mongoose.Schema.Types.ObjectId, ref: 'Question' },
    "answer": { 
      "choices_id": {type:  mongoose.Schema.Types.ObjectId, ref: 'Question.choice'},
      "choice_detail": String
    }

});

module.exports = mongoose.model('Transaction_item', transactionItemSchema, 'transaction_item');