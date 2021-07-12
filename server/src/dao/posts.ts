import { Post } from '../entities/post.entity';
import { Tag } from '../entities/tag.entity';

export interface PostDAO {
  createPost(
    userID: number,
    content: string,
    timestamp: Date,
    parent: Post,
    tags: Tag[],
  ): Promise<number>;
  getChilds(id: number): Promise<Post[]>;
  getByID(id: number): Promise<Post>;
  getParentPosts(
    start: number,
    end: number,
  ): Promise<Post[]>;
  getReplies(
    postId: number,
    start: number,
    end: number,
  ): Promise<Post[]>;
  getRepliesOfUser(
    userId: number,
    start: number,
    end: number,
  ): Promise<Post[]>;
  getPostsOfUser(
    userId: number,
    start: number,
    end: number,
  ): Promise<Post[]>;
}
