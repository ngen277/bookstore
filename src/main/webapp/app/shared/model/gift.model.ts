import { IBook } from 'app/shared/model/book.model';

export interface IGift {
  id?: number;
  gift?: string;
  books?: IBook[];
}

export class Gift implements IGift {
  constructor(public id?: number, public gift?: string, public books?: IBook[]) {}
}
