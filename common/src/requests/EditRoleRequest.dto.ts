import { object, SchemaOf, number, boolean } from 'yup';

export class EditRoleRequest {
  requestId!: number;
  isApproved!: boolean;
}

export const EditRoleRequestSchema: SchemaOf<EditRoleRequest> = object({
  requestId: number().required(),
  isApproved: boolean().required(),
});
