import { Schema, Types } from 'mongoose';
import { Post } from '../../../entities/post.entity';

export const PostSchema = new Schema<Post>(
  {
    _id: {
      type: Number,
      alias: 'id',
    },
    _userID: {
      type: Number,
      alias: 'userID',
    },
    _content: {
      type: String,
      alias: 'content',
    },
    _parent: {
      type: Number,
      alias: 'parent',
      ref: Post.name,
    },
    _timestamp: {
      type: Date,
      required: true,
      alias: 'timestamp',
    },
  },
  { id: false },
);
// PostSchema.virtual('posts', {ref: 'posts', localField: 'parent', foreignField: 'id'}).loadClass(Post);
PostSchema.loadClass(Post);
