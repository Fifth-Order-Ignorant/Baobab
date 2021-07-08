import { PostDAO } from '../posts';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from '../../entities/post.entity';

export class PostMongoDAO implements PostDAO {
  constructor(@InjectModel(Post.name) private _posts: Model<Post>) {}

  async createPost(
    userID: number,
    content: string,
    timestamp: Date,
    parent: Post,
  ): Promise<number> {
    const id = await this._posts.countDocuments();
    await this._posts.create(new Post(id, userID, content, timestamp, parent));
    return id;
  }

  async getChilds(id: number): Promise<Post[]> {
    return this._posts.find(this._posts.translateAliases({ parent: id }));
  }
  async getByID(id: number): Promise<Post> {
    return this._posts.findById(id);
  }

  async getParentPosts(
    start: number,
    end: number,
  ): Promise<Record<string, string | number>[]> {
    const posts: Post[] = await this._posts
      .find(this._posts.translateAliases({ parent: null }))
      .sort(this._posts.translateAliases({ timestamp: 'asc' }))
      .skip(start)
      .limit(end - start);
    return this.postsToRecords(posts);
  }

  async getReplies(
    postId: number,
    start: number,
    end: number,
  ): Promise<Record<string, string | number>[]> {
    const posts: Post[] = await this._posts
      .find(this._posts.translateAliases({ parent: postId }))
      .sort(this._posts.translateAliases({ timestamp: 'asc' }))
      .skip(start)
      .limit(end - start);
    return this.postsToRecords(posts);
  }

  async getRepliesOfUser(
    userId: number,
    start: number,
    end: number,
  ): Promise<Record<string, string | number>[]> {
    const posts: Post[] = await this._posts
      .find(this._posts.translateAliases({ userID: userId }))
      .where('_parent')
      .ne(null)
      .sort(this._posts.translateAliases({ timestamp: 'asc' }))
      .skip(start)
      .limit(end - start);
    return this.postsToRecords(posts);
  }

  async getPostsOfUser(
    userId: number,
    start: number,
    end: number,
  ): Promise<Record<string, string | number>[]> {
    const posts: Post[] = await this._posts
      .find(this._posts.translateAliases({ userID: userId }))
      .sort(this._posts.translateAliases({ timestamp: 'asc' }))
      .skip(start)
      .limit(end - start);
    return this.postsToRecords(posts);
  }

  // TODO: Records should be refactored into the controller.
  private postsToRecords(posts: Post[]) {
    const records: Record<string, string | number>[] = [];
    for (let i = 0; i < posts.length; i++) {
      records.push(
        Object({
          author: posts[i].userID,
          timestamp: posts[i].timestamp.toISOString(),
          content: posts[i].content,
          postId: posts[i].id,
        }),
      );
    }
    return records;
  }
}
