import { object, SchemaOf, string, number } from 'yup';

export class MessageRequest {
  content!: string;
  parentID!: number;
}

export const MessageRequestSchema: SchemaOf<MessageRequest> = object({
  content: string().required(),
  parentID: number().required(),
});
