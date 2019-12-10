import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGift } from 'app/shared/model/gift.model';
import { GiftService } from './gift.service';

@Component({
  templateUrl: './gift-delete-dialog.component.html'
})
export class GiftDeleteDialogComponent {
  gift: IGift;

  constructor(protected giftService: GiftService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.giftService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'giftListModification',
        content: 'Deleted an gift'
      });
      this.activeModal.dismiss(true);
    });
  }
}
