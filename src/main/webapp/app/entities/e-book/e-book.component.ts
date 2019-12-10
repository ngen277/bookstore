import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEBook } from 'app/shared/model/e-book.model';
import { EBookService } from './e-book.service';
import { EBookDeleteDialogComponent } from './e-book-delete-dialog.component';

@Component({
  selector: 'jhi-e-book',
  templateUrl: './e-book.component.html'
})
export class EBookComponent implements OnInit, OnDestroy {
  eBooks: IEBook[];
  eventSubscriber: Subscription;

  constructor(protected eBookService: EBookService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.eBookService.query().subscribe((res: HttpResponse<IEBook[]>) => {
      this.eBooks = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInEBooks();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IEBook) {
    return item.id;
  }

  registerChangeInEBooks() {
    this.eventSubscriber = this.eventManager.subscribe('eBookListModification', () => this.loadAll());
  }

  delete(eBook: IEBook) {
    const modalRef = this.modalService.open(EBookDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.eBook = eBook;
  }
}
