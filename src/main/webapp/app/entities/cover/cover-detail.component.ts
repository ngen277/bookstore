import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICover } from 'app/shared/model/cover.model';

@Component({
  selector: 'jhi-cover-detail',
  templateUrl: './cover-detail.component.html'
})
export class CoverDetailComponent implements OnInit {
  cover: ICover;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ cover }) => {
      this.cover = cover;
    });
  }

  previousState() {
    window.history.back();
  }
}
