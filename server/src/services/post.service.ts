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

  createPost(
    userID: number,
    content: string,
    timestamp: Date,
    parent: Post,
  ): Post {
    return this._postRepository.getByID(
      this._postRepository.createPost(userID, content, timestamp, parent),
    );
  }

  getParentPost(parentID: number): Post {
    return this._postRepository.getByID(parentID);
  }

  getPaginatedPosts(start: number, end: number): PostResponse[] {
    const posts: Record<string, string | number>[] =
      this._postRepository.getParentPosts(start, end);
    const newPosts: PostResponse[] = [];
    const n: number = posts.length;
    let i = 0;
    while (i < n) {
      const post: Record<string, string | number> = posts[i];
      if (typeof post !== 'undefined') {
        const newPost: PostResponse = {
          author: this._userRepository.getProfileByID(post.author as number)
            .name,
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

  getReplies(
    postId: number,
    start: number,
    end: number,
  ): Record<string, string | number>[] {
    const posts: Record<string, string | number>[] =
      this._postRepository.getReplies(postId, start, end);
    const newPosts: PostResponse[] = [];
    const n: number = posts.length;
    let i = 0;
    while (i < n) {
      const post: Record<string, string | number> = posts[i];
      if (typeof post !== 'undefined') {
        const newPost: PostResponse = {
          author: this._userRepository.getProfileByID(post.author as number)
            .name,
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
