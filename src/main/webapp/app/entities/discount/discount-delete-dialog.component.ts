import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDiscount } from 'app/shared/model/discount.model';
import { DiscountService } from './discount.service';

@Component({
  templateUrl: './discount-delete-dialog.component.html'
})
export class DiscountDeleteDialogComponent {
  discount: IDiscount;

  constructor(protected discountService: DiscountService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.discountService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'discountListModification',
        content: 'Deleted an discount'
      });
      this.activeModal.dismiss(true);
    });
  }
}
