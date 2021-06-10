import { Role } from './role.entity';
export class Profile {
  private _name: string;
  private _bio: string;
  private _externalLinks: string[];
  private _id: number;
  private _jobTitle: string;
  private _role: Role;

  public constructor(id: number, name: string) {
    this._id = id;
    this._name = name;
    this._bio = '';
    this._externalLinks = [];
    this._jobTitle = '';
    this._role = Role.DEFAULT;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get bio(): string {
    return this._bio;
  }

  get externalLinks(): string[] {
    return this._externalLinks;
  }

  get role(): Role {
    return this._role;
  }

  changeRole(newRole: Role): void {
    this._role = newRole;
  }

  get jobTitle(): string {
    return this._jobTitle;
  }

  editBio(newBio: string): void {
    this._bio = newBio;
  }

  editJobTitle(newTitle: string): void {
    this._jobTitle = newTitle;
  }

  addExternalLink(link: string): void {
    this._externalLinks.push(link);
  }

  deleteExternalLink(index: number): void {
    if (index > -1) {
      this._externalLinks.splice(index, 1);
    }
  }
}
