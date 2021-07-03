import { object, SchemaOf, number } from 'yup';

export class PostPaginationRequest {
  start!: number;
  end!: number;
}

export const PostPaginationRequestSchema: SchemaOf<PostPaginationRequest> =
  object({
    start: number().required(),
    end: number().required(),
  });
