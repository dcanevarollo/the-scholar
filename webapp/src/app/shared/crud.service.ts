import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

export class CrudService<E, I> {

  protected readonly RETRIALS_COUNT = 1;
  protected readonly API = `${environment.apiUrl}/${this.route}`;

  constructor(protected httpClient: HttpClient, private route: string) { }

  list(): Observable<E[]> {
    return this.httpClient
      .get<E[]>(this.API)
      .pipe(take(this.RETRIALS_COUNT));
  }

  loadById(id: I): Observable<E> {
    return this.httpClient
      .get<E>(`${this.API}/${id}`)
      .pipe(take(this.RETRIALS_COUNT));
  }

  remove(id: I): Observable<{}> {
    return this.httpClient
      .delete<E>(`${this.API}/${id}`)
      .pipe(take(this.RETRIALS_COUNT));
  }

  save(data: E, id?: I) {
    if (id) return this.update(data, id);

    return this.create(data);
  }

  private create(data: E): Observable<E> {
    return this.httpClient
      .post<E>(this.API, data)
      .pipe(take(this.RETRIALS_COUNT));
  }

  private update(data: E, id: I): Observable<E> {
    return this.httpClient
      .put<E>(`${this.API}/${id}`, data)
      .pipe(take(this.RETRIALS_COUNT));
  }

}
