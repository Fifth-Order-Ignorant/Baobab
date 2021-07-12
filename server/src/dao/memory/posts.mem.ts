import { Injectable } from '@nestjs/common';
import { Post } from '../../entities/post.entity';
import { PostDAO } from '../posts';
import { Tag } from '../../entities/tag.entity';

@Injectable()
export class PostInMemory implements PostDAO {
  posts: Post[];
  highestID: number;
  postCount: number;

  public constructor() {
    this.posts = [];
    this.highestID = 0;
    this.postCount = 0;
  }

  public async createPost(
    userID: number,
    content: string,
    timestamp: Date,
    parent: Post,
    tags: Tag[],
  ): Promise<number> {
    const post = new Post(this.highestID, userID, content, timestamp, parent, tags);
    this.posts.push(post);
    this.highestID++;

    return this.highestID - 1;
  }

  public async getByID(id: number): Promise<Post> {
    let post: Post;
    this.posts.forEach((element) => {
      if (element.id === id) {
        post = element;
      }
    });
    return post;
  }

  public async getChilds(id: number): Promise<Post[]> {
    const children: Post[] = [];
    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i].parent.id === id) {
        children.push(this.posts[i]);
      }
    }
    return children;
  }

  public async getParentPosts(
    start: number,
    end: number,
  ): Promise<Post[]> {
    const posts: Post[] = this.posts;
    let i = 0;
    const templst: Post[] = [];
    const n: number = posts.length;
    while (i < n) {
      const post: Post = posts[i];
      if (typeof post.parent === 'undefined') {
        templst.push(post);
      }
      i++;
    }
    let count: number = start;
    const lst: Post[] = [];
    const m: number = templst.length;
    while (count < end && count < m) {
      const post: Post = templst[count];
      lst.push(post);
      count++;
    }
    return lst;
  }

  public async getReplies(
    postId: number,
    start: number,
    end: number,
  ): Promise<Post[]> {
    const posts: Post[] = this.posts;
    let i = 0;
    const templst: Post[] = [];
    const n: number = posts.length;
    while (i < n) {
      const post: Post = posts[i];
      if (typeof post.parent !== 'undefined' && post.parent.id == postId) {
        templst.push(post);
      }
      i++;
    }
    let count: number = start;
    const lst: Post[] = [];
    const m: number = templst.length;
    while (count < end && count < m) {
      const post: Post = templst[count];
      lst.push(post);
      count++;
    }
    return lst;
  }

  public async getRepliesOfUser(
    userId: number,
    start: number,
    end: number,
  ): Promise<Post[]> {
    const posts: Post[] = this.posts;
    let i = 0;
    const templst: Post[] = [];
    const n: number = posts.length;
    while (i < n) {
      const post: Post = posts[i];
      if (post.userId == userId && typeof post.parent !== 'undefined') {
        templst.push(post);
      }
      i++;
    }

    let count: number = start;
    const lst: Post[] = [];
    const m: number = templst.length;
    while (count < end && count < m) {
      const post: Post = templst[count];
      lst.push(post);
      count++;
    }
    return lst;
  }

  public async getPostsOfUser(
    userId: number,
    start: number,
    end: number,
  ): Promise<Post[]> {
    const posts: Post[] = this.posts;
    let i = 0;
    const templst: Post[] = [];
    const n: number = posts.length;
    while (i < n) {
      const post: Post = posts[i];
      if (post.userId == userId && typeof post.parent === 'undefined') {
        templst.push(post);
      }
      i++;
    }

    let count: number = start;
    const lst: Post[] = [];
    const m: number = templst.length;
    while (count < end && count < m) {
      const post: Post = templst[count];
      lst.push(post);
      count++;
    }
    return lst;
  }
}
