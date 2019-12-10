import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICover } from 'app/shared/model/cover.model';

type EntityResponseType = HttpResponse<ICover>;
type EntityArrayResponseType = HttpResponse<ICover[]>;

@Injectable({ providedIn: 'root' })
export class CoverService {
  public resourceUrl = SERVER_API_URL + 'api/covers';

  constructor(protected http: HttpClient) {}

  create(cover: ICover): Observable<EntityResponseType> {
    return this.http.post<ICover>(this.resourceUrl, cover, { observe: 'response' });
  }

  update(cover: ICover): Observable<EntityResponseType> {
    return this.http.put<ICover>(this.resourceUrl, cover, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICover>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICover[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
