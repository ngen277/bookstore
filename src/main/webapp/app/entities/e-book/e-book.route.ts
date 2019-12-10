import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EBook } from 'app/shared/model/e-book.model';
import { EBookService } from './e-book.service';
import { EBookComponent } from './e-book.component';
import { EBookDetailComponent } from './e-book-detail.component';
import { EBookUpdateComponent } from './e-book-update.component';
import { IEBook } from 'app/shared/model/e-book.model';

@Injectable({ providedIn: 'root' })
export class EBookResolve implements Resolve<IEBook> {
  constructor(private service: EBookService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEBook> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((eBook: HttpResponse<EBook>) => eBook.body));
    }
    return of(new EBook());
  }
}

export const eBookRoute: Routes = [
  {
    path: '',
    component: EBookComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EBooks'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EBookDetailComponent,
    resolve: {
      eBook: EBookResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EBooks'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EBookUpdateComponent,
    resolve: {
      eBook: EBookResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EBooks'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EBookUpdateComponent,
    resolve: {
      eBook: EBookResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EBooks'
    },
    canActivate: [UserRouteAccessService]
  }
];
