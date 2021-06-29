import { Injectable } from '@nestjs/common';
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
  getReplies(postid: number, start: number, end: number): Record<string, string | number>[];
}

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

  public createPost(
    userID: number,
    content: string,
    timestamp: Date,
    parent: Post,
  ): number {
    const post = new Post(this.highestID, userID, content, timestamp, parent);
    this.posts.push(post);
    if (parent) {
      parent.addChild(post);
    }
    this.highestID++;

    return this.highestID - 1;
  }

  public getByID(id: number): Post {
    let post: Post;
    this.posts.forEach((element) => {
      if (element.id === id) {
        post = element;
      }
    });
    return post;
  }

  public getChilds(id: number): Post[] {
    return this.getByID(id).childs;
  }

  public getParent(id: number): Post {
    return this.getByID(id).parent;
  }

  public getParentPosts(
    start: number,
    end: number,
  ): Record<string, string | number>[] {
    const posts: Post[] = this.posts;
    let i: number = 0;
    const templst: Post[] = [];
    const n: number = posts.length;
    while (i < n){
      const post: Post = posts[i];
      if (typeof post.parent === 'undefined'){
        templst.push(post);
      }
      i++;
    }
    let count: number = start;
    const lst: Record<string, string | number>[] = [];
    const m: number = templst.length;
    while (i < n && count < end-start) {
      const post: Post = templst[count];
      const newPost: Record<string, string | number> = Object({
        author: post.userID,
        timestamp: post.timestamp.toISOString(),
        content: post.content,
        postId: post.id,
      });
      lst.push(newPost)
      count++;
    }
    return lst;
  }

  public getReplies(
    postId: number,
    start: number,
    end: number,
  ): Record<string, string | number>[] {
    const posts: Post[] = this.posts;
    let i: number = 0;
    const templst: Post[] = [];
    const n: number = posts.length;
    while (i < n){
      const post: Post = posts[i];
      if (typeof post.parent !== 'undefined' && post.parent.id == postId){
        templst.push(post);
      }
      i++;
    }
    let count: number = start;
    const lst: Record<string, string | number>[] = [];
    const m: number = templst.length;
    while (count < end && count < m) {
      const post: Post = templst[count];
      const newPost: Record<string, string | number> = Object({
        author: post.userID,
        timestamp: post.timestamp.toISOString(),
        content: post.content,
        postId: post.id,
      });
      lst.push(newPost);
      count++;
    }
    return lst;
  }
}
