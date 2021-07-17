import { object, SchemaOf, number } from 'yup';

export class AssignmentPaginationRequest {
  start!: number;
  end!: number;
}

export const AssignmentPaginationRequestSchema: SchemaOf<AssignmentPaginationRequest> =
  object({
    start: number().required(),
    end: number().required(),
  });
