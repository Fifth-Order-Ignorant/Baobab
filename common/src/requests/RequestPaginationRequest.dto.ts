import { object, SchemaOf, number } from 'yup';

export class RequestPaginationRequest {
  start!: number;
  end!: number;
}

export const RequestPaginationRequestSchema: SchemaOf<RequestPaginationRequest> =
  object({
    start: number().required(),
    end: number().required(),
  });
