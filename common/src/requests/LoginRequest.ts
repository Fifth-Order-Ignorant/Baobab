import { object, SchemaOf, string } from 'yup';

export type LoginRequest = {
  email: string;
  password: string;
}

export const LoginRequestSchema: SchemaOf<LoginRequest> = object({
  email: string().required().email(),
  password: string().required()
})