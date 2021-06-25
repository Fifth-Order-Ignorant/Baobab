import { Inject, Injectable } from '@nestjs/common';
import { PostDAO } from '../dao/posts';
import { Post } from '../entities/post.entity';
import { UserProfileDAO } from '../dao/userprofiles';
import { UnsubscriptionError } from 'rxjs';

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

  getPaginatedPosts(
    start: number,
    end: number,
  ): Record<string, string | number>[] {
    const posts: Record<string, string | number>[] =
      this._postRepository.getParentPosts(start, end);
    posts.forEach((element) => {
      element.author = this._userRepository.getProfileByID(
        element.author as number,
      ).name;
    });
    return posts;
  }

  getReplies(
    postId: number,
    start: number,
    end: number,
  ): Record<string, string | number>[] {
    const posts: Record<string, string | number>[] =
      this._postRepository.getReplies(postId, start, end);
    posts.forEach((element) => {
      element.author = this._userRepository.getProfileByID(
        element.author as number,
      ).name;
    });
    return posts;
  }
}
