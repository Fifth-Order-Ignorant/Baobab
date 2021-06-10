import { object, SchemaOf, number } from 'yup';

export class MessagePaginationRequest {
  start!: number;
  end!: number;
}

export const ProfilePaginationRequestSchema: SchemaOf<MessagePaginationRequest> = object({
  start: number().required(),
  end: number().required()
})