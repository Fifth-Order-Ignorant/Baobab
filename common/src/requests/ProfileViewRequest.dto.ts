import { object, SchemaOf, number } from 'yup';

export class ProfileViewRequest {
  userId!: number;
}

export const ProfileViewRequestSchema: SchemaOf<ProfileViewRequest> = object({
  userId: number().required(),
});
