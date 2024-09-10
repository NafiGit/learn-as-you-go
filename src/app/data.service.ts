// src/app/data.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Country } from './models/country.model';
import data from '../assets/data.json';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return of(data as Country[]);
  }
}
