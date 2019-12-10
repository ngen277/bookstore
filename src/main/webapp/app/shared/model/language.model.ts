import { IBook } from 'app/shared/model/book.model';

export interface ILanguage {
  id?: number;
  language?: string;
  books?: IBook[];
}

export class Language implements ILanguage {
  constructor(public id?: number, public language?: string, public books?: IBook[]) {}
}
