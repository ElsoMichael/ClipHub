const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserComment = require('./comment-model');

const ForumSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title: {
    type: String
  },
  details: {
    type: String
  },
  comments: [ UserComment.schema ]
}, {
  timestamps: true
});

const Forum = mongoose.model('Forum', ForumSchema);

module.exports = Forum;
