import { object, SchemaOf, number } from 'yup';

export class UploadFileRequest {
  id!: number;
}

export const UploadFileRequestSchema: SchemaOf<UploadFileRequest> = object({
  id: number().required(),
});
