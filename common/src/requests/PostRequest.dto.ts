import { object, SchemaOf, string, number, array } from 'yup';

export class PostRequest {
  content!: string;
  parentID!: number;
  tags!: string[];
}

export const PostRequestSchema: SchemaOf<PostRequest> = object({
  content: string().required(),
  parentID: number().required(),
  tags: array().of(string().required())
});
