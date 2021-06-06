import { object, SchemaOf, string } from 'yup';

export type RegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const RegisterRequestSchema: SchemaOf<RegisterRequest> = object({
  firstName: string().required(),
  lastName: string().required(),
  email: string().required().email(),
  password: string().required()
})