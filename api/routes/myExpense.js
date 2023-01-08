const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router = express.Router();
const mongoose = require('mongoose');
const MyExpense = require('../models/myExpense');

router.post('/', (req, res, next) => {
    const myExpense = new MyExpense ({
        _id: new mongoose.Types.ObjectId(),
        expenseType: req.body.expenseType,
        amount: req.body.amount,
        date: req.body.date,
        comment: req.body.comment
    });
    console.log(myExpense);
    myExpense.save().then(result => {
        console.log(result);
        res.status(201).json(result
        );
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

});

module.exports = router;