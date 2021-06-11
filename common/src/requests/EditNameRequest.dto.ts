import { object, SchemaOf, string } from 'yup';

export class EditNameRequest {
  firstName!: string;
  lastName!: string;
}

export const EditNameRequestSchema: SchemaOf<EditNameRequest> = object({
  firstName: string().required(),
  lastName: string().required(),
})