import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEBook } from 'app/shared/model/e-book.model';
import { EBookService } from './e-book.service';

@Component({
  templateUrl: './e-book-delete-dialog.component.html'
})
export class EBookDeleteDialogComponent {
  eBook: IEBook;

  constructor(protected eBookService: EBookService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.eBookService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'eBookListModification',
        content: 'Deleted an eBook'
      });
      this.activeModal.dismiss(true);
    });
  }
}
