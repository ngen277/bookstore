export interface IAuthor {
  id?: number;
  name?: string;
  popularity?: number;
}

export class Author implements IAuthor {
  constructor(public id?: number, public name?: string, public popularity?: number) {}
}
