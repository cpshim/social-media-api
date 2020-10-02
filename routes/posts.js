var express = require('express');
var router = express.Router();
var passport = require('passport');
var PostModel = require('../models/post.js');
var myPassport = require('../config/passport')(passport);

/* GET users listing. */
router.get('/', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  PostModel.find({}, (err, docs) => {
    res.json(docs);
  });
});

router.get('/:username', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    PostModel.find({username: `${req.params.username}`}, (err, docs) => {
    res.json(docs);
  });
});

router.post('/create', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  const post = new PostModel({
    username: req.body.username,
    text: req.body.text,
  });
  
  post.save(err => {
    if (err) {
      return next(err);
    };
    res.redirect('/');
  });
});

module.exports = router;
