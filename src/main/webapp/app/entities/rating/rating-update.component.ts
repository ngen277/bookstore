import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IRating, Rating } from 'app/shared/model/rating.model';
import { RatingService } from './rating.service';

@Component({
  selector: 'jhi-rating-update',
  templateUrl: './rating-update.component.html'
})
export class RatingUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    rating: []
  });

  constructor(protected ratingService: RatingService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ rating }) => {
      this.updateForm(rating);
    });
  }

  updateForm(rating: IRating) {
    this.editForm.patchValue({
      id: rating.id,
      rating: rating.rating
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const rating = this.createFromForm();
    if (rating.id !== undefined) {
      this.subscribeToSaveResponse(this.ratingService.update(rating));
    } else {
      this.subscribeToSaveResponse(this.ratingService.create(rating));
    }
  }

  private createFromForm(): IRating {
    return {
      ...new Rating(),
      id: this.editForm.get(['id']).value,
      rating: this.editForm.get(['rating']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRating>>) {
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
