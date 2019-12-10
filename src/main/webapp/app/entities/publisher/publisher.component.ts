import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPublisher } from 'app/shared/model/publisher.model';
import { PublisherService } from './publisher.service';
import { PublisherDeleteDialogComponent } from './publisher-delete-dialog.component';

@Component({
  selector: 'jhi-publisher',
  templateUrl: './publisher.component.html'
})
export class PublisherComponent implements OnInit, OnDestroy {
  publishers: IPublisher[];
  eventSubscriber: Subscription;

  constructor(protected publisherService: PublisherService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.publisherService.query().subscribe((res: HttpResponse<IPublisher[]>) => {
      this.publishers = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInPublishers();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPublisher) {
    return item.id;
  }

  registerChangeInPublishers() {
    this.eventSubscriber = this.eventManager.subscribe('publisherListModification', () => this.loadAll());
  }

  delete(publisher: IPublisher) {
    const modalRef = this.modalService.open(PublisherDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.publisher = publisher;
  }
}
