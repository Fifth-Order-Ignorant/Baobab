import { number, object, SchemaOf } from 'yup';

export class ProfilePictureRequest {
  id!: number;
}

export const ProfilePictureRequestSchema: SchemaOf<ProfilePictureRequest> = object({
  id: number().required(),
});