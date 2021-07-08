import { Inject, Injectable } from '@nestjs/common';
import { PostDAO } from '../dao/posts';
import { Post } from '../entities/post.entity';
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
  ): Promise<Post> {
    return await this._postRepository.getByID(
      await this._postRepository.createPost(userID, content, timestamp, parent),
    );
  }

  async getParentPost(parentID: number): Promise<Post> {
    return this._postRepository.getByID(parentID);
  }

  async getPaginatedPosts(start: number, end: number): Promise<PostResponse[]> {
    const posts: Record<string, string | number>[] =
    await this._postRepository.getParentPosts(start, end);
    return this.changeIdToAuthor(posts);
  }

  async getReplies(
    postId: number,
    start: number,
    end: number,
  ): Promise<PostResponse[]> {
    const posts: Record<string, string | number>[] =
    await this._postRepository.getReplies(postId, start, end);
    return this.changeIdToAuthor(posts);
  }

  async getUserReplies(
    userId: number,
    start: number,
    end: number,
  ): Promise<PostResponse[]> {
    const posts: Record<string, string | number>[] =
    await this._postRepository.getRepliesOfUser(userId, start, end);
    return this.changeIdToAuthor(posts);
  }

  async getUserPosts(
    userId: number,
    start: number,
    end: number,
  ): Promise<PostResponse[]> {
    const posts: Record<string, string | number>[] =
      await this._postRepository.getPostsOfUser(userId, start, end);
    return this.changeIdToAuthor(posts);
  }

  async changeIdToAuthor(
    lst: Record<string, string | number>[],
  ): Promise<PostResponse[]> {
    const posts: Record<string, string | number>[] = lst;
    const newPosts: PostResponse[] = [];
    const n: number = posts.length;
    let i = 0;
    while (i < n) {
      const post: Record<string, string | number> = posts[i];
      if (typeof post !== 'undefined') {
        const newPost: PostResponse = {
          author: (
            await this._userRepository.getProfileByID(post.author as number)
          ).name,
          timestamp: post.timestamp as string,
          content: post.content as string,
          postId: post.postId as number,
        };
        newPosts.push(newPost);
      }
      i++;
    }
    return newPosts;
  }
}
