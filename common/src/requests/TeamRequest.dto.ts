import { object, SchemaOf, string } from 'yup';

export class CreateTeamRequest {
  teamName!: string;
}

export const CreateTeamSchema: SchemaOf<CreateTeamRequest> = object({
  teamName: string().required(),
});
