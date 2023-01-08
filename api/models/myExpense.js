const mongoose = require('mongoose');

const myExpenseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    expenseType: {type: String, required: true},
    amount: {type: Number, required: true},
    date: {type: Date, required: true},
    comment: String,

});

module.exports = mongoose.model('MyExpense', myExpenseSchema);