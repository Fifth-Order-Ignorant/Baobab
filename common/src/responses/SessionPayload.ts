import { Role } from 'baobab-server/src/entities/role.entity';

export class SessionPayload {
  id!: number;
  fullName!: string;
  integrityHash!: string;
  exp!: number;
  role!: Role;
}
