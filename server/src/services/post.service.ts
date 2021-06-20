import { Inject, Injectable } from '@nestjs/common';
import { PostDAO } from '../dao/posts';
import { Post } from '../entities/post.entity';
import { UserProfileDAO } from '../dao/userprofiles';

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
      this._postRepository.getPosts(start, end);
    posts.forEach((element) => {
      element.author = this._userRepository.getProfileByID(
        element.author as number,
      ).name;
    });
    return posts;
  }
}
