import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INews } from 'app/shared/model/news.model';
import { NewsService } from './news.service';

@Component({
  templateUrl: './news-delete-dialog.component.html'
})
export class NewsDeleteDialogComponent {
  news: INews;

  constructor(protected newsService: NewsService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.newsService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'newsListModification',
        content: 'Deleted an news'
      });
      this.activeModal.dismiss(true);
    });
  }
}
