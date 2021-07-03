export class PostResponse {
  /**
   * Author of the post.
   */
  author!: string;
  /**
   * Time at which the post was created.
   */
  timestamp!: string;
  /**
   * Text content of the post.
   */
  content!: string;
  /**
   * ID of the post.
   */
  postId!: number;
}
