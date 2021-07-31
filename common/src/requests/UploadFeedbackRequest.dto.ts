import { object, SchemaOf, number, string } from 'yup';

export class UploadFeedbackRequest {
    id!: number;
    feedback!: string; 
    mark!: number 
}

export const UploadFeedbackRequestSchema: SchemaOf<UploadFeedbackRequest> = object({
    id: number().required(),
    feedback: string().required(),
    mark: number().required() 
})