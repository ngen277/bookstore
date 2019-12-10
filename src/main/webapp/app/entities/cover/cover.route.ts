import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cover } from 'app/shared/model/cover.model';
import { CoverService } from './cover.service';
import { CoverComponent } from './cover.component';
import { CoverDetailComponent } from './cover-detail.component';
import { CoverUpdateComponent } from './cover-update.component';
import { ICover } from 'app/shared/model/cover.model';

@Injectable({ providedIn: 'root' })
export class CoverResolve implements Resolve<ICover> {
  constructor(private service: CoverService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICover> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((cover: HttpResponse<Cover>) => cover.body));
    }
    return of(new Cover());
  }
}

export const coverRoute: Routes = [
  {
    path: '',
    component: CoverComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Covers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CoverDetailComponent,
    resolve: {
      cover: CoverResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Covers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CoverUpdateComponent,
    resolve: {
      cover: CoverResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Covers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CoverUpdateComponent,
    resolve: {
      cover: CoverResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Covers'
    },
    canActivate: [UserRouteAccessService]
  }
];
