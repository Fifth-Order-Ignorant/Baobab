import { Post } from '../entities/post.entity';

export interface PostDAO {
  createPost(
    userID: number,
    content: string,
    timestamp: Date,
    parent: Post,
  ): Promise<number>;
  getChilds(id: number): Promise<Post[]>;
  getByID(id: number): Promise<Post>;
  getParentPosts(
    start: number,
    end: number,
  ): Promise<Record<string, string | number>[]>;
  getReplies(
    postId: number,
    start: number,
    end: number,
  ): Promise<Record<string, string | number>[]>;
  getRepliesOfUser(
    userId: number,
    start: number,
    end: number,
  ): Promise<Record<string, string | number>[]>;
  getRepliesOfUser(
    userId: number,
    start: number,
    end: number,
  ): Promise<Record<string, string | number>[]>;
  getPostsOfUser(
    userId: number,
    start: number,
    end: number,
  ): Promise<Record<string, string | number>[]>;
}
