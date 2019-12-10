import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDiscount } from 'app/shared/model/discount.model';
import { DiscountService } from './discount.service';
import { DiscountDeleteDialogComponent } from './discount-delete-dialog.component';

@Component({
  selector: 'jhi-discount',
  templateUrl: './discount.component.html'
})
export class DiscountComponent implements OnInit, OnDestroy {
  discounts: IDiscount[];
  eventSubscriber: Subscription;

  constructor(protected discountService: DiscountService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.discountService.query().subscribe((res: HttpResponse<IDiscount[]>) => {
      this.discounts = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInDiscounts();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDiscount) {
    return item.id;
  }

  registerChangeInDiscounts() {
    this.eventSubscriber = this.eventManager.subscribe('discountListModification', () => this.loadAll());
  }

  delete(discount: IDiscount) {
    const modalRef = this.modalService.open(DiscountDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.discount = discount;
  }
}
