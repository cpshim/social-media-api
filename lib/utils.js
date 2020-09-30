const jwt = require('jsonwebtoken');
const passport = require('passport');

function issueJWT(user) {
    const _id = user._id;

    const expiresIn = '1d';

    const payload = {
        sub: _id,
        iat: Date.now()
    }

    const signedToken = jwt.sign(payload, '+heSup3rS3cr3+K3y', {expiresIn: expiresIn});

    return {
        token: "Bearer " + signedToken,
        expires: expiresIn
    }
}

module.exports.issueJWT = issueJWT;