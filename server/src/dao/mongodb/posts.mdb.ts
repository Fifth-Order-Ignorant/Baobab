import { PostDAO } from '../posts';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from '../../entities/post.entity';
import { Tag } from '../../entities/tag.entity';

export class PostMongoDAO implements PostDAO {
  constructor(@InjectModel(Post.name) private _posts: Model<Post>) {}

  async createPost(
    userID: number,
    content: string,
    timestamp: Date,
    parent: Post,
    tags: Tag[],
  ): Promise<number> {
    const id = await this._posts.countDocuments();
    await this._posts.create(
      new Post(id, userID, content, timestamp, parent, tags),
    );
    return id;
  }

  async getChilds(id: number): Promise<Post[]> {
    return this._posts.find(await this._posts.translateAliases({ parent: id }));
  }
  async getByID(id: number): Promise<Post> {
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
      .find(await this._posts.translateAliases({ userID: userId }))
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
      .find(await this._posts.translateAliases({ userID: userId }))
      .sort(await this._posts.translateAliases({ timestamp: 'asc' }))
      .skip(start)
      .limit(end - start);
    return posts;
  }

  // TODO: Records should be refactored into the controller.
  private postsToRecords(posts: Post[]) {
    const records: Record<string, string | number>[] = [];
    for (let i = 0; i < posts.length; i++) {
      records.push(
        Object({
          author: posts[i].userId,
          timestamp: posts[i].timestamp.toISOString(),
          content: posts[i].content,
          postId: posts[i].id,
        }),
      );
    }
    return records;
  }
}
