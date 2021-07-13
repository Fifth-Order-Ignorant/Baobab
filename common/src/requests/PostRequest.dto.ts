import { object, SchemaOf, string, number, array } from 'yup';

export class PostRequest {
  content!: string;
  parentId!: number;
  tags!: string[];
}

export const PostRequestSchema: SchemaOf<PostRequest> = object({
  content: string().required(),
  parentId: number().required(),
  tags: array().of(string().required()),
});
