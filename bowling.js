var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var isEqual = require('lodash.isequal');
var bowlingpoints = require('../model/bowlingpoints');
var randToken = require("../bin/bowlingapp/randtoken");
var dbURL = require('../config/database').database;
const auth = require('./auth');
monDB = mongoose.connect(dbURL, { useNewUrlParser: true });


//GET bowling points to be calculated
router.get('/api/points', function(req,res){
    bowlingpoints.countDocuments( function (err, count){
        
        var randomNum = Math.floor(Math.random() * count)

        bowlingpoints.findOne().skip(randomNum).exec(function (err, docres) {
            if(err){
                res.status(500).send({error: "Failed to fetch a bowling score"})
            } else {
                res.status(200).send({points: docres.points, token: docres.token })
            }
        })
    })

})

//POST calculated bowling score
router.post('/api/points', function (req, res){

    var userToken = req.body.token;
    var userPoints = req.body.points

    bowlingpoints.findOne({token: userToken},function(err,bowlingscore){
        if(err){
            res.status(500).send({error: "Failed to compare the provided user results"})
        } else {
            console.log(bowlingscore.result)
            if(isEqual(userPoints, bowlingscore.result)){
                res.status(200).send({success: true, input: userPoints});
            } else {
                res.status(500).send({success: false, input: userPoints});
            }
        }
    })
})

//Add new bowling new bowling points scores that can be retrieved and calculated
//Note: Requires authentication 
router.post('/api/add', auth.required, function(req, res){

    var points = req.body.points
    var result = req.body.result
    var newRandomToken = randToken.getRandomToken();

    var newBowlingPoint = new bowlingpoints({token: newRandomToken, points: points, result: result})

    newBowlingPoint.save(function (err,data){
        if(err){
            console.log(err)
            res.status(500).send({error: "Bowling Score not registered!"})
        } else {
            res.status(200).send({status: true, msg: "Bowling Score successfully registered", entry:data} )
        }
    }
)
})

//GET status of the API
router.get('/api/status', function(req,res){

    res.status(200).send({succes: true, msg: "Bowling is running!"})

}) 

module.exports = router;