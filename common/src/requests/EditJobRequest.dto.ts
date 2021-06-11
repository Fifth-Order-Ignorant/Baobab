import { object, SchemaOf, string } from 'yup';

export class EditJobRequest {
  jobTitle!: string;
}

export const EditJobRequestSchema: SchemaOf<EditJobRequest> = object({
  jobTitle: string().required(),
})