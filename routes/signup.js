var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var UserModel = require('../models/user.js');
var utils = require('../lib/utils');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render("signup");
})

router.post('/', function(req, res, next) {
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) {
          next(err);
        }
        else{
          const user = new UserModel({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            handle: req.body.handle,
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword
          })
          
          user.save(err => {
            if (err) {
              return next(err);
            };
            res.redirect('/');
          });
        }
    });
});

module.exports = router;
