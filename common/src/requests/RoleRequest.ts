import { object, SchemaOf, string } from 'yup';

export class RoleRequest {
  role!: string;
  description!: string;
}

export const RoleRequestSchema: SchemaOf<RoleRequest> = object({
  role: string().required(),
  description: string().required()
})
