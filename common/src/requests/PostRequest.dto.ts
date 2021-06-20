import { object, SchemaOf, string, number } from 'yup';

export class PostRequest {
  content!: string;
  parentID!: number;
}

export const PostRequestSchema: SchemaOf<PostRequest> = object({
  content: string().required(),
  parentID: number().required(),
});
