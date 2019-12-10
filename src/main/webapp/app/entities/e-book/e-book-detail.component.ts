import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEBook } from 'app/shared/model/e-book.model';

@Component({
  selector: 'jhi-e-book-detail',
  templateUrl: './e-book-detail.component.html'
})
export class EBookDetailComponent implements OnInit {
  eBook: IEBook;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ eBook }) => {
      this.eBook = eBook;
    });
  }

  previousState() {
    window.history.back();
  }
}
