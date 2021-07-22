import { object, SchemaOf, number } from 'yup';

export class SubmissionCreateRequest {
  userId!: number;
  assignmentId!: number;
}

export const SubmissionCreateRequestSchema: SchemaOf<SubmissionCreateRequest> =
  object({
    userId: number().required(),
    assignmentId: number().required(),
  });
