import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IGift, Gift } from 'app/shared/model/gift.model';
import { GiftService } from './gift.service';
import { IBook } from 'app/shared/model/book.model';
import { BookService } from 'app/entities/book/book.service';

@Component({
  selector: 'jhi-gift-update',
  templateUrl: './gift-update.component.html'
})
export class GiftUpdateComponent implements OnInit {
  isSaving: boolean;

  books: IBook[];

  editForm = this.fb.group({
    id: [],
    gift: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected giftService: GiftService,
    protected bookService: BookService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ gift }) => {
      this.updateForm(gift);
    });
    this.bookService
      .query()
      .subscribe((res: HttpResponse<IBook[]>) => (this.books = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(gift: IGift) {
    this.editForm.patchValue({
      id: gift.id,
      gift: gift.gift
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const gift = this.createFromForm();
    if (gift.id !== undefined) {
      this.subscribeToSaveResponse(this.giftService.update(gift));
    } else {
      this.subscribeToSaveResponse(this.giftService.create(gift));
    }
  }

  private createFromForm(): IGift {
    return {
      ...new Gift(),
      id: this.editForm.get(['id']).value,
      gift: this.editForm.get(['gift']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGift>>) {
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
