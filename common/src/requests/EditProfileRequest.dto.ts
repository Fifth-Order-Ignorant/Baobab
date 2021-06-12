import { object, SchemaOf, string } from 'yup';

export class EditProfileRequest {
  firstName!: string;
  lastName!: string;
  jobTitle!: string;
  bio!: string;
}

export const EditProfileRequestSchema: SchemaOf<EditProfileRequest> = object({
  firstName: string().required(),
  lastName: string().required(),
  jobTitle: string().required(),
  bio: string().required(),
});
