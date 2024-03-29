import { Schema, model } from 'mongoose';

const commentSchema = new Schema({
  text: {
    type: String,
    required: [true, "Comment can't be empty"],
    minLength: 3,
    maxLength: 500,
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: [true, 'Comment belongs to a user'],
  },
  blog: {
    type: Schema.ObjectId,
    ref: 'Blog',
    required: [true, 'Where are you writing the comment if not on blog'],
  },
  // replies: [
  //   {
  //     type: Schema.ObjectId,
  //     ref: 'Comment',
  //   },
  // ],
  parentId: {
    type: Schema.ObjectId,
    ref: 'Comment',
  },
  isEdited: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

commentSchema.pre(/^find|^findById/, function (next) {
  this.populate({
    path: 'user',
    select: 'name image',
  });

  next();
});

const Comment = model('Comment', commentSchema);
export default Comment;
