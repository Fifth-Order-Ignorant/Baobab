import { Schema } from 'mongoose';
import { Post } from '../../../entities/post.entity';
import { Tag } from '../../../entities/tag.entity';

export const PostSchema = new Schema<Post>(
  {
    _id: {
      type: Number,
      alias: 'id',
    },
    _userId: {
      type: Number,
      alias: 'userId',
    },
    _content: {
      type: String,
      alias: 'content',
    },
    _parent: {
      type: Number,
      alias: 'parent',
      ref: Post.name,
      autopopulate: true,
    },
    _timestamp: {
      type: Date,
      required: true,
      alias: 'timestamp',
    },
    _tags: {
      type: [String],
      alias: 'tags',
      enum: Object.values(Tag),
      required: true,
    },
  },
  { id: false },
);

// eslint-disable-next-line @typescript-eslint/no-var-requires
PostSchema.plugin(require('mongoose-autopopulate'));

PostSchema.loadClass(Post);
