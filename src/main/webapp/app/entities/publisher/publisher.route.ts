import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Publisher } from 'app/shared/model/publisher.model';
import { PublisherService } from './publisher.service';
import { PublisherComponent } from './publisher.component';
import { PublisherDetailComponent } from './publisher-detail.component';
import { PublisherUpdateComponent } from './publisher-update.component';
import { IPublisher } from 'app/shared/model/publisher.model';

@Injectable({ providedIn: 'root' })
export class PublisherResolve implements Resolve<IPublisher> {
  constructor(private service: PublisherService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPublisher> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((publisher: HttpResponse<Publisher>) => publisher.body));
    }
    return of(new Publisher());
  }
}

export const publisherRoute: Routes = [
  {
    path: '',
    component: PublisherComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Publishers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PublisherDetailComponent,
    resolve: {
      publisher: PublisherResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Publishers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PublisherUpdateComponent,
    resolve: {
      publisher: PublisherResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Publishers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PublisherUpdateComponent,
    resolve: {
      publisher: PublisherResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Publishers'
    },
    canActivate: [UserRouteAccessService]
  }
];
