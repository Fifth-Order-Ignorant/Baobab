import { object, SchemaOf, string, array } from 'yup';

export class EditLinksRequest {
  links!: string[];
}

export const EditLinksRequestSchema: SchemaOf<EditLinksRequest> = object({
  links: array().of(string().required()),
});
