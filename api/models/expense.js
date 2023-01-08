const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    trip: {type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true},
    expenseType: {type: String, required: true},
    amount: {type: Number, required: true},
    date: {type: Date, required: true},
    comment: String,

});

module.exports = mongoose.model('Expense', expenseSchema);
