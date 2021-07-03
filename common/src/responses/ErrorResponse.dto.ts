import { ValidationError } from 'yup';

export class ErrorResponse {
  errors!: ValidationError[];
}
