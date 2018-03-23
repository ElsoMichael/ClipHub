const mongoose = require("mongoose");
var express = require('express');
var router = express.Router();

const Forum = require('../models/forum-model');

/* GET Forum listing. */
router.get('/forum', (req, res, next) => {
  Forum.find((err, forumList) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(forumList);
  });
});

/* CREATE a new Post. */
router.post('/forum', (req, res, next) => {
  console.log("im in the route")
  const newPost = new Forum({
    owner: req.user._id,
    title: req.body.title,
    details: req.body.details
  });

  newPost.save((err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'New Post created!',
      id: newPost._id
    });
  });
});

/* GET a single Post. */
router.get('/forum/:id', (req, res) => {
  // if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
  //   res.status(400).json({ message: 'Specified id is not valid' });
  //   return;
  // }
  
  Forum.findById(req.params.id, (err, thePost) => {
      if (err) {
        res.json(err);
        return;
      }

      res.json(thePost);
    });
});

/* EDIT a Post. */
router.put('/forum/:id', (req, res) => {
  // if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
  //   res.status(400).json({ message: 'Specified id is not valid' });
  //   return;
  // }

  const updates = {
    title: req.body.title,
    details: req.boby.details
  };
  
  Forum.findByIdAndUpdate(req.params.id, updates, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'Post updated successfully'
    });
  });
})

/* DELETE a Post. */
router.delete('/forum/:id', (req, res) => {
  // if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
  //   res.status(400).json({ message: 'Specified id is not valid' });
  //   return;
  // }
  
  Forum.remove({ _id: req.params.id }, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    return res.json({
      message: 'Post has been removed!'
    });
  })
});

module.exports = router;