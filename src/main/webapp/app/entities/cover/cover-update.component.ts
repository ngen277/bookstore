import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ICover, Cover } from 'app/shared/model/cover.model';
import { CoverService } from './cover.service';

@Component({
  selector: 'jhi-cover-update',
  templateUrl: './cover-update.component.html'
})
export class CoverUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    cover: []
  });

  constructor(protected coverService: CoverService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ cover }) => {
      this.updateForm(cover);
    });
  }

  updateForm(cover: ICover) {
    this.editForm.patchValue({
      id: cover.id,
      cover: cover.cover
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const cover = this.createFromForm();
    if (cover.id !== undefined) {
      this.subscribeToSaveResponse(this.coverService.update(cover));
    } else {
      this.subscribeToSaveResponse(this.coverService.create(cover));
    }
  }

  private createFromForm(): ICover {
    return {
      ...new Cover(),
      id: this.editForm.get(['id']).value,
      cover: this.editForm.get(['cover']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICover>>) {
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
