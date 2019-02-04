const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load Profile Model
const Profile = require('../../models/Profile');
//Load User Model
const User = require('../../models/User');

// @route GET api/profile/test
// @desc Test profile route
// @access Public
router.get('/test', (req,res) => res.json({msg: "Profile works"}));

// @route GET api/profile
// @desc Get current user profile
// @access Private
router.get('/', passport.authenticate('jwt', { session: false}), (req, res) => {
    const errors = {};

    Profile.findOne({user: req.user.id})
        .then(profile => { 
            if(!profile){
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => {
            res.status(404).json(err);
        })
});
/* 04-18 video
// @route POST api/profile
// @desc create user profile
// @access Private
router.post('/', passport.authenticate('jwt', { session: false}), (req, res) => {
    const profileFields = {};
    profileFields.user = req.user.id;

    Profile.findOne({user: req.user.id})
        .then(profile => {
            if(profile){
                //Update
                Profile.findOneAndUpdate(
                    {user: req.user.id},
                    {$set: profileFields},
                    {new: true}
                )
                .then(profile => {
                    res.json(profile);
                });
            } else {
                new Profile
            }
        })
});*/

module.exports = router;