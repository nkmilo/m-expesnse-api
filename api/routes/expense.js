const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router = express.Router();
const mongoose = require('mongoose');
const Expense = require('../models/expense');
const Trip = require('../models/trip');

router.get('/', (req, res, next) => {
    Expense.find().populate('trip').exec().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({error: err});
    });

});

router.get('/:tripId', (req, res, next) => {
    const id = req.params.tripId;
    console.log(id);
    Expense.find().where('trip').equals(id).exec().then(result => {
        console.log(result);
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                message: 'no entries found!'
            });
        }
    }).catch(err => {
        res.status(500).json(err);
    });
});

router.post('/', (req, res, next) => {
    Trip.findById(req.body.tripId).then(trip => {
        if (!trip) {
            return res.status(404).json({message: 'trip not found'});
        }
        const expense = new Expense({
            _id: new mongoose.Types.ObjectId(),
            expenseType: req.body.expenseType,
            amount: req.body.amount,
            date: req.body.date,
            comment: req.body.comment,
            trip: req.body.tripId
        });
        console.log(expense);
        return expense.save().then(result => {
            res.status(200).json({
                message: 'handling Post expense requests',
                createdExpense: result
            });
        }).catch(err => {
            res.status(500).json({
                error: err
            });
        });
    }).catch(err => {
        res.status(500).json({
            message: 'trip not available',
            error: err
        });
    });


});

router.patch('/:expenseID', (req, res, next) => {
    res.status(200).json({
        message: "expense patched!"
    });
});

router.delete('/:expenseID', (req, res, next) => {
    const id = req.params.expenseID;
    Expense.remove({_id: id}).exec().then(result => {
        if (result) {
            console.log(result);
            res.status(200).json(result);
        }else {
            res.status(404).json({
                message: 'no entries found'
            });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).status({
            error: err
        });
    });

});

module.exports = router;