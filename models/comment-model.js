const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserCommentSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  text: {
    type: String,
    required: true
  }
},
{
  timestamps: true
});

const UserComment = mongoose.model('UserComment', UserCommentSchema);

module.exports = UserComment;