import { PostDAO } from '../posts';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from '../../entities/post.entity';
import { Tag } from '../../entities/tag.entity';

export class PostMongoDAO implements PostDAO {
  constructor(@InjectModel(Post.name) private _posts: Model<Post>) {}

  async createPost(
    userId: number,
    content: string,
    timestamp: Date,
    parent: Post,
    tags: Tag[],
  ): Promise<number> {
    const id = await this._posts.countDocuments();
    await this._posts.create(
      new Post(id, userId, content, timestamp, parent, tags),
    );
    return id;
  }

  async getChilds(id: number): Promise<Post[]> {
    return this._posts.find(await this._posts.translateAliases({ parent: id }));
  }
  async getById(id: number): Promise<Post> {
    return this._posts.findById(id);
  }

  async getParentPosts(start: number, end: number): Promise<Post[]> {
    const posts: Post[] = await this._posts
      .find(await this._posts.translateAliases({ parent: null }))
      .sort(await this._posts.translateAliases({ timestamp: 'asc' }))
      .skip(start)
      .limit(end - start);
    return posts;
  }

  async getReplies(
    postId: number,
    start: number,
    end: number,
  ): Promise<Post[]> {
    const posts: Post[] = await this._posts
      .find(await this._posts.translateAliases({ parent: postId }))
      .sort(await this._posts.translateAliases({ timestamp: 'asc' }))
      .skip(start)
      .limit(end - start);
    return posts;
  }

  async getRepliesOfUser(
    userId: number,
    start: number,
    end: number,
  ): Promise<Post[]> {
    const posts: Post[] = await this._posts
      .find(await this._posts.translateAliases({ userId: userId }))
      .where('_parent')
      .ne(null)
      .sort(await this._posts.translateAliases({ timestamp: 'asc' }))
      .skip(start)
      .limit(end - start);
    return posts;
  }

  async getPostsOfUser(
    userId: number,
    start: number,
    end: number,
  ): Promise<Post[]> {
    const posts: Post[] = await this._posts
      .find(await this._posts.translateAliases({ userId: userId }))
      .sort(await this._posts.translateAliases({ timestamp: 'asc' }))
      .skip(start)
      .limit(end - start);
    return posts;
  }
}
