var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var UserModel = require('../models/user.js');
var utils = require('../lib/utils');
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render("signup");
})

router.post('/', function(req, res, next) {
    UserModel.findOne({username: req.body.username})
        .then((user) => {
            if (!user) {
                res.status(401).json({success: false, message: "Cannot find user"});
            }
            console.log(user);
            bcrypt.compare(req.body.password, user.password, (err, response) => {
                if (response) {
                  // passwords match! log user in
                  const tokenObject = utils.issueJWT(user);

                  res.status(200).json({success: true, user: user, token: tokenObject, message: "User logged in"});
                  //return done(null, user);
                } else {
                  // passwords do not match!
                  res.status(401).json({success: false, message: "Wrong password"});
                  //return done(null, false, {msg: "Incorrect password"});
                }
            })      
        });
});

module.exports = router;
