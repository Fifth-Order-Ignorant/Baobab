import { object, SchemaOf, number } from 'yup';

export class GetSingleSubAssRequest {
  id!: number;
}

export const GetSingleSubAssRequestSchema: SchemaOf<GetSingleSubAssRequest> =
  object({
    id: number().required(),
  });
