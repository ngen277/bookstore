import { IBook } from 'app/shared/model/book.model';

export interface INews {
  id?: number;
  title?: string;
  text?: string;
  book?: IBook;
}

export class News implements INews {
  constructor(public id?: number, public title?: string, public text?: string, public book?: IBook) {}
}
