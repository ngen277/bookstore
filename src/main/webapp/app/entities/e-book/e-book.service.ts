import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEBook } from 'app/shared/model/e-book.model';

type EntityResponseType = HttpResponse<IEBook>;
type EntityArrayResponseType = HttpResponse<IEBook[]>;

@Injectable({ providedIn: 'root' })
export class EBookService {
  public resourceUrl = SERVER_API_URL + 'api/e-books';

  constructor(protected http: HttpClient) {}

  create(eBook: IEBook): Observable<EntityResponseType> {
    return this.http.post<IEBook>(this.resourceUrl, eBook, { observe: 'response' });
  }

  update(eBook: IEBook): Observable<EntityResponseType> {
    return this.http.put<IEBook>(this.resourceUrl, eBook, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEBook>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEBook[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
