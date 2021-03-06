const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('../models/User');
const User = mongoose.model('User');
const keys = require('../config/keys');

//create options for jwt-strategy
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            //console.log(jwt_payload);
            User.findById(jwt_payload.id)
                .then(user => {
                    if(user){
                        return done(null, user); //done(error, user)
                    }
                    return done(null, false);
                })
                .catch(err => {
                    console.log(err);
                })

    }));
}