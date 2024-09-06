// src/app/data.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

export interface Item {
  id: number;
  title: string;
  body: string;
  tags: string[];
  customCssClass: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = environment.apiUrl;
  private localData: Item[] = [];

  constructor(private http: HttpClient) { }

  getItems(): Observable<Item[]> {
    if (environment.useLocalData) {
      return of(this.localData);
    }
    return this.http.get<Item[]>(this.apiUrl).pipe(
      retry(2),
      tap(data => this.localData = data),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
