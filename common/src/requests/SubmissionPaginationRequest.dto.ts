import { object, SchemaOf, number } from 'yup';

// TODO: Should probably make one PaginationRequest and if needed extend off of it.
export class SubmissionPaginationRequest {
  start!: number;
  end!: number;
}

export const SubmissionPaginationRequestSchema: SchemaOf<SubmissionPaginationRequest> =
  object({
    start: number().required(),
    end: number().required(),
  });
