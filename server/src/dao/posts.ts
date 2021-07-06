import { Post } from '../entities/post.entity';

export interface PostDAO {
  createPost(
    userID: number,
    content: string,
    timestamp: Date,
    parent: Post,
  ): number;
  getChilds(id: number): Post[];
  getByID(id: number): Post;
  getParent(id: number): Post;
  getParentPosts(start: number, end: number): Record<string, string | number>[];
  getReplies(
    postId: number,
    start: number,
    end: number,
  ): Record<string, string | number>[];
  getRepliesOfUser(
    userId: number,
    start: number,
    end: number,
  ): Record<string, string | number>[];
  getPostsOfUser(
    userId: number,
    start: number,
    end: number,
  ): Record<string, string | number>[];
}
