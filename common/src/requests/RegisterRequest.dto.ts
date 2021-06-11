import { object, SchemaOf, string } from 'yup';

export class RegisterRequest {
  /**
   * First name of the user.
   */
  firstName!: string;
  /**
   * Last name of the user.
   */
  lastName!: string;
  /**
   * Email of the user.
   */
  email!: string;
  /**
   * Password of the user.
   */
  password!: string;
}

export const RegisterRequestSchema: SchemaOf<RegisterRequest> = object({
  firstName: string().required(),
  lastName: string().required(),
  email: string().required().email(),
  password: string().required(),
});
