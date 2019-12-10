import { IAuthor } from 'app/shared/model/author.model';
import { ICover } from 'app/shared/model/cover.model';
import { IDiscount } from 'app/shared/model/discount.model';
import { IEBook } from 'app/shared/model/e-book.model';
import { IPublisher } from 'app/shared/model/publisher.model';
import { IRating } from 'app/shared/model/rating.model';
import { ISale } from 'app/shared/model/sale.model';
import { INews } from 'app/shared/model/news.model';
import { ICategory } from 'app/shared/model/category.model';
import { ILanguage } from 'app/shared/model/language.model';
import { IGift } from 'app/shared/model/gift.model';

export interface IBook {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  author?: IAuthor;
  cover?: ICover;
  discount?: IDiscount;
  ebook?: IEBook;
  publisher?: IPublisher;
  rating?: IRating;
  sales?: ISale[];
  news?: INews[];
  categories?: ICategory[];
  languages?: ILanguage[];
  gifts?: IGift[];
}

export class Book implements IBook {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public price?: number,
    public author?: IAuthor,
    public cover?: ICover,
    public discount?: IDiscount,
    public ebook?: IEBook,
    public publisher?: IPublisher,
    public rating?: IRating,
    public sales?: ISale[],
    public news?: INews[],
    public categories?: ICategory[],
    public languages?: ILanguage[],
    public gifts?: IGift[]
  ) {}
}
