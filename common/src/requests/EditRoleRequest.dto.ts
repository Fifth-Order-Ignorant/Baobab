import { object, SchemaOf, string } from 'yup';

export class EditRoleRequest {
  role!: string;
}

export const EditRoleRequestSchema: SchemaOf<EditRoleRequest> = object({
  role: string().required(),
});
