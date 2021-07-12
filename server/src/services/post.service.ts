import { Inject, Injectable } from '@nestjs/common';
import { PostDAO } from '../dao/posts';
import { Post } from '../entities/post.entity';
import { Tag } from '../entities/tag.entity';
import { UserProfileDAO } from '../dao/userprofiles';
import { PostResponse } from 'baobab-common';

@Injectable()
export class PostService {
  constructor(
    @Inject('UserProfileDAO') private _userRepository: UserProfileDAO,
    @Inject('PostDAO') private _postRepository: PostDAO,
  ) {}

  async createPost(
    userID: number,
    content: string,
    timestamp: Date,
    parent: Post,
    tags: Tag[]
  ): Promise<Post> {
    return await this._postRepository.getByID(
      await this._postRepository.createPost(userID, content, timestamp, parent, tags),
    );
  }

  async getParentPost(parentID: number): Promise<Post> {
    return this._postRepository.getByID(parentID);
  }

  async getPaginatedPosts(start: number, end: number): Promise<PostResponse[]> {
    const posts: Post[] =
      await this._postRepository.getParentPosts(start, end);
    return this.changeIdToAuthor(posts);
  }

  async getReplies(
    postId: number,
    start: number,
    end: number,
  ): Promise<PostResponse[]> {
    const posts: Post[] =
      await this._postRepository.getReplies(postId, start, end);
    return this.changeIdToAuthor(posts);
  }

  async getUserReplies(
    userId: number,
    start: number,
    end: number,
  ): Promise<PostResponse[]> {
    const posts: Post[] =
      await this._postRepository.getRepliesOfUser(userId, start, end);
    return this.changeIdToAuthor(posts);
  }

  async getUserPosts(
    userId: number,
    start: number,
    end: number,
  ): Promise<PostResponse[]> {
    const posts: Post[] =
      await this._postRepository.getPostsOfUser(userId, start, end);
    return this.changeIdToAuthor(posts);
  }

  async changeIdToAuthor(
    lst: Post[],
  ): Promise<PostResponse[]> {
    const posts: Post[] = lst;
    const newPosts: PostResponse[] = [];
    const n: number = posts.length;
    let i = 0;
    while (i < n) {
      const post: Post = posts[i];
      if (typeof post !== 'undefined') {
        const authorName = (
          await this._userRepository.getProfileByID(post.userId)
        ).name;
        const newPost: PostResponse = {
          author: authorName,
          timestamp: post.timestamp.toString(),
          content: post.content,
          postId: post.id,
          authorId: post.userId,
          tags: post.tags,
        };
        newPosts.push(newPost);
      }
      i++;
    }
    return newPosts;
  }
}
