import { object, SchemaOf, number } from 'yup';

export class RepliesPaginationRequest {
  id!: number;
  start!: number;
  end!: number;
}

export const RepliesPaginationRequestSchema: SchemaOf<RepliesPaginationRequest> =
  object({
    id: number().required(),
    start: number().required(),
    end: number().required(),
  });
