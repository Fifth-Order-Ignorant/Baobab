import { Role } from './role.entity';
import { FileInfo } from './fileinfo.entity';

export class Profile {
  firstName: string;
  lastName: string;
  bio: string;
  readonly externalLinks: string[];
  readonly id: number;
  jobTitle: string;
  role: Role;
  readonly tags: string[];
  picture: FileInfo;

  public constructor(id: number, firstName: string, lastName: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.bio = '';
    this.externalLinks = [];
    this.tags = [];
    this.jobTitle = '';
    this.role = Role.DEFAULT;
    this.picture = null;
  }

  get name(): string {
    return this.firstName + ' ' + this.lastName;
  }

  addExternalLink(link: string): void {
    this.externalLinks.push(link);
  }

  deleteExternalLink(index: number): void {
    if (index > -1) {
      this.externalLinks.splice(index, 1);
    }
  }
}
