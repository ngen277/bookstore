import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISale } from 'app/shared/model/sale.model';
import { SaleService } from './sale.service';

@Component({
  templateUrl: './sale-delete-dialog.component.html'
})
export class SaleDeleteDialogComponent {
  sale: ISale;

  constructor(protected saleService: SaleService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.saleService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'saleListModification',
        content: 'Deleted an sale'
      });
      this.activeModal.dismiss(true);
    });
  }
}
