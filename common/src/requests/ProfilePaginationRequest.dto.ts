import { object, SchemaOf, number } from 'yup';

export class ProfilePaginationRequest {
  start!: number;
  end!: number;
}

export const ProfilePaginationRequestSchema: SchemaOf<ProfilePaginationRequest> =
  object({
    start: number().required(),
    end: number().required(),
  });
