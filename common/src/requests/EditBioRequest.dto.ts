import { object, SchemaOf, string } from 'yup';

export class EditBioRequest {
  bio!: string;
}

export const EditBioRequestSchema: SchemaOf<EditBioRequest> = object({
  bio: string().required(),
});
