import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IBook, Book } from 'app/shared/model/book.model';
import { BookService } from './book.service';
import { IAuthor } from 'app/shared/model/author.model';
import { AuthorService } from 'app/entities/author/author.service';
import { ICover } from 'app/shared/model/cover.model';
import { CoverService } from 'app/entities/cover/cover.service';
import { IDiscount } from 'app/shared/model/discount.model';
import { DiscountService } from 'app/entities/discount/discount.service';
import { IEBook } from 'app/shared/model/e-book.model';
import { EBookService } from 'app/entities/e-book/e-book.service';
import { IPublisher } from 'app/shared/model/publisher.model';
import { PublisherService } from 'app/entities/publisher/publisher.service';
import { IRating } from 'app/shared/model/rating.model';
import { RatingService } from 'app/entities/rating/rating.service';
import { ICategory } from 'app/shared/model/category.model';
import { CategoryService } from 'app/entities/category/category.service';
import { ILanguage } from 'app/shared/model/language.model';
import { LanguageService } from 'app/entities/language/language.service';
import { IGift } from 'app/shared/model/gift.model';
import { GiftService } from 'app/entities/gift/gift.service';

@Component({
  selector: 'jhi-book-update',
  templateUrl: './book-update.component.html'
})
export class BookUpdateComponent implements OnInit {
  isSaving: boolean;

  authors: IAuthor[];

  covers: ICover[];

  discounts: IDiscount[];

  ebooks: IEBook[];

  publishers: IPublisher[];

  ratings: IRating[];

  categories: ICategory[];

  languages: ILanguage[];

  gifts: IGift[];

  editForm = this.fb.group({
    id: [],
    name: [],
    description: [],
    price: [],
    author: [],
    cover: [],
    discount: [],
    ebook: [],
    publisher: [],
    rating: [],
    categories: [],
    languages: [],
    gifts: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected bookService: BookService,
    protected authorService: AuthorService,
    protected coverService: CoverService,
    protected discountService: DiscountService,
    protected eBookService: EBookService,
    protected publisherService: PublisherService,
    protected ratingService: RatingService,
    protected categoryService: CategoryService,
    protected languageService: LanguageService,
    protected giftService: GiftService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ book }) => {
      this.updateForm(book);
    });
    this.authorService.query({ filter: 'book-is-null' }).subscribe(
      (res: HttpResponse<IAuthor[]>) => {
        if (!this.editForm.get('author').value || !this.editForm.get('author').value.id) {
          this.authors = res.body;
        } else {
          this.authorService
            .find(this.editForm.get('author').value.id)
            .subscribe(
              (subRes: HttpResponse<IAuthor>) => (this.authors = [subRes.body].concat(res.body)),
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.coverService.query({ filter: 'book-is-null' }).subscribe(
      (res: HttpResponse<ICover[]>) => {
        if (!this.editForm.get('cover').value || !this.editForm.get('cover').value.id) {
          this.covers = res.body;
        } else {
          this.coverService
            .find(this.editForm.get('cover').value.id)
            .subscribe(
              (subRes: HttpResponse<ICover>) => (this.covers = [subRes.body].concat(res.body)),
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.discountService.query({ filter: 'book-is-null' }).subscribe(
      (res: HttpResponse<IDiscount[]>) => {
        if (!this.editForm.get('discount').value || !this.editForm.get('discount').value.id) {
          this.discounts = res.body;
        } else {
          this.discountService
            .find(this.editForm.get('discount').value.id)
            .subscribe(
              (subRes: HttpResponse<IDiscount>) => (this.discounts = [subRes.body].concat(res.body)),
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.eBookService.query({ filter: 'book-is-null' }).subscribe(
      (res: HttpResponse<IEBook[]>) => {
        if (!this.editForm.get('ebook').value || !this.editForm.get('ebook').value.id) {
          this.ebooks = res.body;
        } else {
          this.eBookService
            .find(this.editForm.get('ebook').value.id)
            .subscribe(
              (subRes: HttpResponse<IEBook>) => (this.ebooks = [subRes.body].concat(res.body)),
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.publisherService.query({ filter: 'book-is-null' }).subscribe(
      (res: HttpResponse<IPublisher[]>) => {
        if (!this.editForm.get('publisher').value || !this.editForm.get('publisher').value.id) {
          this.publishers = res.body;
        } else {
          this.publisherService
            .find(this.editForm.get('publisher').value.id)
            .subscribe(
              (subRes: HttpResponse<IPublisher>) => (this.publishers = [subRes.body].concat(res.body)),
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.ratingService.query({ filter: 'book-is-null' }).subscribe(
      (res: HttpResponse<IRating[]>) => {
        if (!this.editForm.get('rating').value || !this.editForm.get('rating').value.id) {
          this.ratings = res.body;
        } else {
          this.ratingService
            .find(this.editForm.get('rating').value.id)
            .subscribe(
              (subRes: HttpResponse<IRating>) => (this.ratings = [subRes.body].concat(res.body)),
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.categoryService
      .query()
      .subscribe((res: HttpResponse<ICategory[]>) => (this.categories = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.languageService
      .query()
      .subscribe((res: HttpResponse<ILanguage[]>) => (this.languages = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.giftService
      .query()
      .subscribe((res: HttpResponse<IGift[]>) => (this.gifts = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(book: IBook) {
    this.editForm.patchValue({
      id: book.id,
      name: book.name,
      description: book.description,
      price: book.price,
      author: book.author,
      cover: book.cover,
      discount: book.discount,
      ebook: book.ebook,
      publisher: book.publisher,
      rating: book.rating,
      categories: book.categories,
      languages: book.languages,
      gifts: book.gifts
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const book = this.createFromForm();
    if (book.id !== undefined) {
      this.subscribeToSaveResponse(this.bookService.update(book));
    } else {
      this.subscribeToSaveResponse(this.bookService.create(book));
    }
  }

  private createFromForm(): IBook {
    return {
      ...new Book(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      description: this.editForm.get(['description']).value,
      price: this.editForm.get(['price']).value,
      author: this.editForm.get(['author']).value,
      cover: this.editForm.get(['cover']).value,
      discount: this.editForm.get(['discount']).value,
      ebook: this.editForm.get(['ebook']).value,
      publisher: this.editForm.get(['publisher']).value,
      rating: this.editForm.get(['rating']).value,
      categories: this.editForm.get(['categories']).value,
      languages: this.editForm.get(['languages']).value,
      gifts: this.editForm.get(['gifts']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBook>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackAuthorById(index: number, item: IAuthor) {
    return item.id;
  }

  trackCoverById(index: number, item: ICover) {
    return item.id;
  }

  trackDiscountById(index: number, item: IDiscount) {
    return item.id;
  }

  trackEBookById(index: number, item: IEBook) {
    return item.id;
  }

  trackPublisherById(index: number, item: IPublisher) {
    return item.id;
  }

  trackRatingById(index: number, item: IRating) {
    return item.id;
  }

  trackCategoryById(index: number, item: ICategory) {
    return item.id;
  }

  trackLanguageById(index: number, item: ILanguage) {
    return item.id;
  }

  trackGiftById(index: number, item: IGift) {
    return item.id;
  }

  getSelected(selectedVals: any[], option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
