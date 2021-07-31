import { object, SchemaOf, string, array } from 'yup';

export class EditLinksRequest {
  links!: string[];
}

// @ts-ignore
export const EditLinksRequestSchema: SchemaOf<EditLinksRequest> = object({
  links: array().of(string()),
});
