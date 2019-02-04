const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Post = require('../../models/Post');

//Post Validation
const validatePostInput = require('../../validation/postValidation');

// @route GET api/posts/test
// @desc Test post route
// @access public
router.get('/test', (req,res) => res.json({msg: "Posts works"}));

// @route GET api/posts
// @desc Get posts
// @access public
router.get('/', (req,res) => {
    Post.find()
        .sort({date: -1})
        .then(posts => res.json(posts))
        .catch(err => res.status(404).jason({nopostsfound: 'No posts found'}));
});

// @route GET api/posts/:id
// @desc Get single post by id
// @access public
router.get('/:id', (req,res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(404).json({nopostfound: 'No post found with that ID'}));
});



// @route POST api/posts
// @desc Create a post
// @access Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isValid} = validatePostInput(req.body);

    //Check Validation
    if(!isValid) {
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        user: req.user.id,
        title: req.body.title,
        description: req.body.description,
    });

    newPost.save().then(post => {
        res.json(post);
    })
});

// @route DELETE api/posts/:id
// @desc Delete a post
// @access Private
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req,res) => {
    Post.findById(req.params.id)
        .then(post => {
            //Check for post owner
            if(post.user.toString() !== req.user.id) {
                return res.status(401).json({notauthorized: 'User not authorized to delete this post'});
            }

            //Delete a post
            post.remove().then(()=> {
                res.json({success: true});
            }).catch(err => res.status(404).json({postnotfound: "No post found"}));
        })
});

/* TODO: post comment
// @route POST api/posts/comment/:id
// @desc Add comment to post
// @access Private
router.post('/comment/:id', passport.authenticate('jwt', {session: false}), (req,res) => {
    const {errors, isValid} = validatePostInput(req.body);

    //Check Validation
    if(!isValid) {
        return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
        .then(post => {
            const newComment = {
                user: req.user.id,
                name: req.body.name,
                text: req.body.text
            }

            //Add to comment list
            post.comments.unshift(newComment);

            //Save comment
            post.save()
                .then(post => res.json(post))
                .catch(err => res.status(404).json({postnotfound: 'No post found'}));
        })
});
*/

module.exports = router;