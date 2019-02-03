const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//User Model
const User = require('../../models/User');

// @route GET api/users/test
// @desc Test users route
// @access Public
router.get('/test', (req,res) => res.json({msg: 'Users works'}));


// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', (req,res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if(user) {
                return res.status(400).json({email: 'Email already exists'});
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        })
});

// @route POST api/users/login
// @desc Login User / returning JWT token
// @access Public
router.post('/login', (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    //Find User by email
    User.findOne({email})
        .then(user => {
            //Check for user
            if(!user) {
                return res.status(404).json({email: 'User not found'});
            }

            //Check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        //create payload
                        const payload = {id: user.id, name: user.name}

                        //Sign Token
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn: 3600 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                });
                            }
                        );   //expire in an hour
                    } else {
                        return res.status(400).json({password: 'Password incorrect'});
                    }
                })
        })
});

/*  protected route example

// @route GET api/users/current
// @desc Return current user
// @access private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});
*/





module.exports = router;