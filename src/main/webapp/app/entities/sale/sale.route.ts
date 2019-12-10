import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sale } from 'app/shared/model/sale.model';
import { SaleService } from './sale.service';
import { SaleComponent } from './sale.component';
import { SaleDetailComponent } from './sale-detail.component';
import { SaleUpdateComponent } from './sale-update.component';
import { ISale } from 'app/shared/model/sale.model';

@Injectable({ providedIn: 'root' })
export class SaleResolve implements Resolve<ISale> {
  constructor(private service: SaleService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISale> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((sale: HttpResponse<Sale>) => sale.body));
    }
    return of(new Sale());
  }
}

export const saleRoute: Routes = [
  {
    path: '',
    component: SaleComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Sales'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SaleDetailComponent,
    resolve: {
      sale: SaleResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Sales'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SaleUpdateComponent,
    resolve: {
      sale: SaleResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Sales'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SaleUpdateComponent,
    resolve: {
      sale: SaleResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Sales'
    },
    canActivate: [UserRouteAccessService]
  }
];
