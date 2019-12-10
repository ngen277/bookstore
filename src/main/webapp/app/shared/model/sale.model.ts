import { IBook } from 'app/shared/model/book.model';

export interface ISale {
  id?: number;
  amount?: number;
  book?: IBook;
}

export class Sale implements ISale {
  constructor(public id?: number, public amount?: number, public book?: IBook) {}
}
