const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router = express.Router();
const mongoose = require('mongoose');

const Trip = require('../models/trip');

router.get('/', (req, res, next) => {
    Trip.find().exec().then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    }).catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    })

});

router.post('/', (req, res, next) => {
    const trip = new Trip({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        destination: req.body.destination,
        date: req.body.date,
        riskAssement: req.body.riskAssement,
        comment: req.body.comment
    });
    console.log(trip);
    trip.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'trip created',
            trip: result
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

});

router.get('/:tripID', (req, res, next) => {
    const id = req.params.tripID;
    Trip.findById(id).exec().then(result => {
        console.log(result);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                message: 'Geting trip by ID',
                trip: 'No valid entry found'
            });
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    });

});

router.delete('/:tripId', (req,res,next) =>{
    const id = req.params.tripId;
    Trip.remove({_id: id}).exec().then(result => {
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

router.patch('/:tripID', (req, res, next) => {
    const id = req.params.tripID;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    Trip.updateOne({_id: id}, {$set: updateOps}).exec().then(result =>{
        console.log(result);
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })

});

module.exports = router;