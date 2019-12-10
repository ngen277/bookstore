import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISale } from 'app/shared/model/sale.model';
import { SaleService } from './sale.service';
import { SaleDeleteDialogComponent } from './sale-delete-dialog.component';

@Component({
  selector: 'jhi-sale',
  templateUrl: './sale.component.html'
})
export class SaleComponent implements OnInit, OnDestroy {
  sales: ISale[];
  eventSubscriber: Subscription;

  constructor(protected saleService: SaleService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.saleService.query().subscribe((res: HttpResponse<ISale[]>) => {
      this.sales = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInSales();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISale) {
    return item.id;
  }

  registerChangeInSales() {
    this.eventSubscriber = this.eventManager.subscribe('saleListModification', () => this.loadAll());
  }

  delete(sale: ISale) {
    const modalRef = this.modalService.open(SaleDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.sale = sale;
  }
}
