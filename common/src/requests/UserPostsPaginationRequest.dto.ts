import { object, SchemaOf, number } from 'yup';

export class UserPostsPaginationRequest {
  id!: number;
  start!: number;
  end!: number;
}

export const UserPostsPaginationRequestSchema: SchemaOf<UserPostsPaginationRequest> =
  object({
    id: number().required(),
    start: number().required(),
    end: number().required(),
  });
