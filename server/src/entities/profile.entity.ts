import { Role } from './role.entity';
import { FileInfo } from './fileinfo.entity';

export class Profile {
  private _firstName: string;
  private _lastName: string;
  private _bio: string;
  private _externalLinks: string[];
  private _id: number;
  private _jobTitle: string;
  private _role: Role;
  private _tags: string[];
  private _picture: FileInfo;

  public constructor(id: number, firstName: string, lastName: string) {
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._bio = '';
    this._externalLinks = [];
    this._tags = [];
    this._jobTitle = '';
    this._role = Role.DEFAULT;
    this._picture = null;
  }

  get id(): number {
    return this._id;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(newName: string) {
    this._firstName = newName;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(newName: string) {
    this._lastName = newName;
  }

  get name(): string {
    return this._firstName + ' ' + this._lastName;
  }

  get bio(): string {
    return this._bio;
  }

  set bio(newBio: string) {
    this._bio = newBio;
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

  set jobTitle(newTitle: string) {
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

  get picture(): FileInfo {
    return this._picture;
  }

  set picture(value: FileInfo) {
    this._picture = value;
  }
}
