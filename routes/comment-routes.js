const mongoose= require('mongoose');
var express = require('express');
var router = express.Router();


const UserComment = require('../models/comment-model');
const Forum = require('../models/forum-model');

router.post('/forum/:id/comment', (req, res, next) => {
  console.log("req.params.id: ", req.params.id)
  Forum.findById(req.params.id, (err, post) => {
    if (err) {
      res.status(500).json({ message: 'Some weird error from DB '});
      return;
    }

    const newComment = new UserComment ({
      owner: req.user._id,
      text: req.body.text
    });

    post.comments.push(newComment);

    post.save((err) => {
      if (err) { return next(err) }

      res.status(200).json(post);
    });
  });
});

module.exports = router;