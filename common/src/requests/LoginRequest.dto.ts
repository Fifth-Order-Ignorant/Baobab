import { object, SchemaOf, string } from 'yup';

export class LoginRequest {
  /**
   * Email of the account a login is being attempted on.
   */
  email!: string;
  /**
   * Password of the account a login is being attempted on.
   */
  password!: string;
}

export const LoginRequestSchema: SchemaOf<LoginRequest> = object({
  email: string().required().email(),
  password: string().required(),
});
