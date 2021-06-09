import { Message } from '../entities/message.entity';
export class Profile {
  private _name: string;
  private _relatedOrgs: Profile[];
  private _bio: string;
  private _posts: Message[];
  private _externalLinks: string[];
  private _id: number;

  public constructor(id: number, name: string) {
    this._id = id;
    this._name = name;
    this._relatedOrgs = [];
    this._bio = '';
    this._posts = [];
    this._externalLinks = [];
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get relatedOrgs(): Profile[] {
    return this._relatedOrgs;
  }

  get bio(): string {
    return this._bio;
  }

  get posts(): Message[] {
    return this._posts;
  }

  get externalLinks(): string[] {
    return this._externalLinks;
  }

  addPost(post: Message): void {
    this._posts.push(post);
  }

  editBio(newBio: string): void {
    this._bio = newBio;
  }

  addRelatedOrg(profile: Profile): void {
    this._relatedOrgs.push(profile);
  }

  deleteRelatedOrg(index: number): void {
    if (index > -1) {
      this._relatedOrgs.splice(index, 1);
    }
  }

  addExternalLink(link: string): void {
    this._externalLinks.push(link);
  }

  deleteExternalLink(index: number): void {
    if (index > -1) {
      this._relatedOrgs.splice(index, 1);
    }
  }
}
