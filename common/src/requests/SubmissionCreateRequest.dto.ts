import { object, SchemaOf, number } from 'yup';

export class SubmissionCreateRequest {
  assignmentId!: number;
}

export const SubmissionCreateRequestSchema: SchemaOf<SubmissionCreateRequest> =
  object({
    assignmentId: number().required(),
  });
