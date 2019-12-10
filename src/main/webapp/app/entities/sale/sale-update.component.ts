import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { ISale, Sale } from 'app/shared/model/sale.model';
import { SaleService } from './sale.service';
import { IBook } from 'app/shared/model/book.model';
import { BookService } from 'app/entities/book/book.service';

@Component({
  selector: 'jhi-sale-update',
  templateUrl: './sale-update.component.html'
})
export class SaleUpdateComponent implements OnInit {
  isSaving: boolean;

  books: IBook[];

  editForm = this.fb.group({
    id: [],
    amount: [],
    book: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected saleService: SaleService,
    protected bookService: BookService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ sale }) => {
      this.updateForm(sale);
    });
    this.bookService
      .query()
      .subscribe((res: HttpResponse<IBook[]>) => (this.books = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(sale: ISale) {
    this.editForm.patchValue({
      id: sale.id,
      amount: sale.amount,
      book: sale.book
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const sale = this.createFromForm();
    if (sale.id !== undefined) {
      this.subscribeToSaveResponse(this.saleService.update(sale));
    } else {
      this.subscribeToSaveResponse(this.saleService.create(sale));
    }
  }

  private createFromForm(): ISale {
    return {
      ...new Sale(),
      id: this.editForm.get(['id']).value,
      amount: this.editForm.get(['amount']).value,
      book: this.editForm.get(['book']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISale>>) {
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
