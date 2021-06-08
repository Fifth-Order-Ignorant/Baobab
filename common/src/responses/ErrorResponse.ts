import { ValidationError } from 'yup';

export type ErrorResponse = {
  errors: ValidationError[]
}