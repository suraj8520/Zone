import mongoose, { Schema } from 'mongoose';

const blogSchema = new Schema(
  {
    title: {
      type: String,
      // required: [true, 'Title is required'],
    },
    numberOfComments: {
      type: Number,
      default: 0,
    },
    numberOfLikes: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    coverImage: {
      type: String,
      // handle default in frontend
      // default:
      //   'https://firebasestorage.googleapis.com/v0/b/filmymind-apersonalproject.appspot.com/o/placeholder%20img.webp?alt=media&token=e722ebc4-7d22-46ae-853d-11425c6c340c',
    },
    content: {
      type: String,
    },
    description: {
      type: String,
    },
    author: {
      type: Schema.ObjectId,
      ref: 'User',
      required: [true, 'Blog must belong to a author'],
    },
    category: {
      type: String,
      // enum: { values: ['tv', 'movies'], message: '{VALUE} is not supported' },
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
    createdAt: {
      type: Date,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

blogSchema.pre(/^find|^findById/, function (next) {
  this.populate({
    path: 'author',
    select: 'name image',
  });

  next();
});

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
