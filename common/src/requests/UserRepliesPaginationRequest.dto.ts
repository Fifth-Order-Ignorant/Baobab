import { object, SchemaOf, number } from 'yup';

export class UserRepliesPaginationRequest {
  id!: number;
  start!: number;
  end!: number;
}

export const UserRepliesPaginationRequestSchema: SchemaOf<UserRepliesPaginationRequest> =
  object({
    id: number().required(),
    start: number().required(),
    end: number().required(),
  });
