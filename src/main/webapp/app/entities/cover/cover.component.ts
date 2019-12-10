import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICover } from 'app/shared/model/cover.model';
import { CoverService } from './cover.service';
import { CoverDeleteDialogComponent } from './cover-delete-dialog.component';

@Component({
  selector: 'jhi-cover',
  templateUrl: './cover.component.html'
})
export class CoverComponent implements OnInit, OnDestroy {
  covers: ICover[];
  eventSubscriber: Subscription;

  constructor(protected coverService: CoverService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.coverService.query().subscribe((res: HttpResponse<ICover[]>) => {
      this.covers = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInCovers();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICover) {
    return item.id;
  }

  registerChangeInCovers() {
    this.eventSubscriber = this.eventManager.subscribe('coverListModification', () => this.loadAll());
  }

  delete(cover: ICover) {
    const modalRef = this.modalService.open(CoverDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cover = cover;
  }
}
