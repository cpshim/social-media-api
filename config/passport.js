const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const UserModel = require('../models/user.js');
var utils = require('../lib/utils');
//require('mongoose').model('User');

const options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: '+heSup3rS3cr3+K3y'
};

const strategy = new JWTStrategy(options, (payload, done) => {
    UserModel.findOne({_id: payload.sub})
        .then((user) => {
            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        })
        .catch((err) => {
            return done(err, null);
        })
})

module.exports = (passport) => {
    passport.use(strategy);
}