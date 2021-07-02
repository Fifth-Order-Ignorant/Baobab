import { object, SchemaOf, string } from 'yup';

export class CreateTeamRequest {
  teamName!: string;
}

export const CreateTeamRequestSchema: SchemaOf<CreateTeamRequest> = object({
  teamName: string().required(),
});
