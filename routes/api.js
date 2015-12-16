// /api
'use strict';

var colors = require('colors');

var express = require('express');
var config = require('../appconfig.js')
var mongoose = require('mongoose');
// connect to our database
mongoose.connect(config.DB_CONNECTION_STRING);

// require body-parser
var bodyParser = require('body-parser');
// get a json body parser to parse body of the request
var jsonParser = bodyParser.json();

var Cat = require('../models/cats.js');

// get an instance of the express Router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.'.red);
  // make sure we go to the next routes and don't stop here
  next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/cats')

  //create a cat
  .post(jsonParser, function(req, res) {

    // create a new Cat object
    var cat = new Cat();
    // set the cat's name, breed and color with data from the request
    cat.name = req.body.cat.name;
    cat.breed = req.body.cat.breed;
    cat.color = req.body.cat.color;
    console.log(cat);

    // save the cat to the db
    cat.save(function(error) {
      if(error)
        res.json(error);

      res.json({ message : 'Cat created successfully'});
    });

  })

  // get all the cats
  .get(function(req, res) {
      Cat.find(function(err, cats) {
          if (err)
              res.send(err);

          res.json(cats);
      });
  });

router.route('/cats/:cat_id')

    // get the cat with that id (accessed at GET http://localhost:8080/api/cats/:cat_id)
    .get(function(req, res) {
        Cat.findById(req.params.cat_id, function(err, cat) {
            if (err)
                res.send(err);
            res.json(cat);
        });
    })

    // update the cat with this id (accessed at PUT http://localhost:8080/api/cats/:cat_id)
    .put(function(req, res) {

        // use our cat model to find the cat we want
        Bear.findById(req.params.bear_id, function(err, bear) {

            if (err)
                res.send(err);

            // update the cats info
            cat.name = req.body.name;
            cat.breed = req.body.breed;
            cat.color = req.body.color;

            // save the cat
            cat.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Cat updated!' });
            });
        });
    })

    // delete the cat with this id (accessed at DELETE http://localhost:8080/api/cat/:cat_id)
    // .delete(function(req, res) {
    //     Cat.remove({
    //         _id: req.params.cat_id
    //     }, function(err, cat) {
    //         if (err)
    //             res.send(err);
    //
    //         res.json({ message: 'Successfully deleted' });
    //     });
    // });

module.exports = router;
