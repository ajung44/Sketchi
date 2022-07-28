const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  drawings: [
    {
      type: Schema.Types.ObjectId,
      ref: 'drawing',
    },
  ],
});

const User = mongoose.model('user', userSchema);

const drawingSchema = new Schema({
  fileName: String,
  point: Array,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
});

const postingSchema = new Schema({
  image: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

const Drawing = mongoose.model('drawing', drawingSchema);
const Post = mongoose.model('post', postingSchema);

module.exports = { User, Drawing, Post };
