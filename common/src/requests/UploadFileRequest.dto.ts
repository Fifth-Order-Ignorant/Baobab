import { object, SchemaOf, number } from 'yup';

export class UploadFileRequest {
  assId!: number;
}

export const UploadFileRequestSchema: SchemaOf<UploadFileRequest> = object({
  assId: number().required(),
});
