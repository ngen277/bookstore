import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IEBook, EBook } from 'app/shared/model/e-book.model';
import { EBookService } from './e-book.service';

@Component({
  selector: 'jhi-e-book-update',
  templateUrl: './e-book-update.component.html'
})
export class EBookUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    format: []
  });

  constructor(protected eBookService: EBookService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ eBook }) => {
      this.updateForm(eBook);
    });
  }

  updateForm(eBook: IEBook) {
    this.editForm.patchValue({
      id: eBook.id,
      format: eBook.format
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const eBook = this.createFromForm();
    if (eBook.id !== undefined) {
      this.subscribeToSaveResponse(this.eBookService.update(eBook));
    } else {
      this.subscribeToSaveResponse(this.eBookService.create(eBook));
    }
  }

  private createFromForm(): IEBook {
    return {
      ...new EBook(),
      id: this.editForm.get(['id']).value,
      format: this.editForm.get(['format']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEBook>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
