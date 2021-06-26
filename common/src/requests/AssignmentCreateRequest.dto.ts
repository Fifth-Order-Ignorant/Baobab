import { object, SchemaOf, number, string } from 'yup';

export class CreateAssignmentRequest {
  name!: string;
  description!: string;
  maxMark!: number;
}

export const CreateAssignmentSchema: SchemaOf<CreateAssignmentRequest> = object(
  {
    name: string().required(),
    description: string().required(),
    maxMark: number().required(),
  },
);
