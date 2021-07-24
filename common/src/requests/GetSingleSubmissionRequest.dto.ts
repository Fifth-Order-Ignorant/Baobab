import { object, SchemaOf, number } from 'yup';

export class GetSingleSubmissionRequest {
  id!: number;
}

export const GetSingleSubmissionRequestSchema: SchemaOf<GetSingleSubmissionRequest> =
  object({
    id: number().required(),
  });
