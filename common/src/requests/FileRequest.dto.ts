import { object, SchemaOf, number } from 'yup';

export class FileRequest {
  id!: number;
}

export const FileRequestSchema: SchemaOf<FileRequest> = object({
  id: number().required()
});
