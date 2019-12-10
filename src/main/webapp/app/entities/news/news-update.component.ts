import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { INews, News } from 'app/shared/model/news.model';
import { NewsService } from './news.service';
import { IBook } from 'app/shared/model/book.model';
import { BookService } from 'app/entities/book/book.service';

@Component({
  selector: 'jhi-news-update',
  templateUrl: './news-update.component.html'
})
export class NewsUpdateComponent implements OnInit {
  isSaving: boolean;

  books: IBook[];

  editForm = this.fb.group({
    id: [],
    title: [],
    text: [],
    book: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected newsService: NewsService,
    protected bookService: BookService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ news }) => {
      this.updateForm(news);
    });
    this.bookService
      .query()
      .subscribe((res: HttpResponse<IBook[]>) => (this.books = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(news: INews) {
    this.editForm.patchValue({
      id: news.id,
      title: news.title,
      text: news.text,
      book: news.book
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const news = this.createFromForm();
    if (news.id !== undefined) {
      this.subscribeToSaveResponse(this.newsService.update(news));
    } else {
      this.subscribeToSaveResponse(this.newsService.create(news));
    }
  }

  private createFromForm(): INews {
    return {
      ...new News(),
      id: this.editForm.get(['id']).value,
      title: this.editForm.get(['title']).value,
      text: this.editForm.get(['text']).value,
      book: this.editForm.get(['book']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INews>>) {
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

  trackBookById(index: number, item: IBook) {
    return item.id;
  }
}
