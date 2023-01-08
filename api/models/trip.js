const mongoose = require('mongoose');

const tripSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    destination: String,
    date: Date,
    riskAssement: String,
    comment: String
});

module.exports = mongoose.model('Trip', tripSchema);