import { object, SchemaOf, number } from 'yup';

export class ProfileLinksRequest {
  userId!: number;
}

export const ProfileLinksRequestSchema: SchemaOf<ProfileLinksRequest> = object({
  userId: number().required(),
});
