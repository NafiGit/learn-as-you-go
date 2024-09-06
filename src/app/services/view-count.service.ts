// src/app/view-count.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewCountService {
  private viewCount = new BehaviorSubject<number>(0);

  constructor() {
    // Load the initial view count from localStorage
    const storedCount = localStorage.getItem('viewCount');
    if (storedCount) {
      this.viewCount.next(parseInt(storedCount, 10));
    }
  }

  getViewCount(): Observable<number> {
    return this.viewCount.asObservable();
  }

  incrementViewCount(): void {
    const currentCount = this.viewCount.value;
    const newCount = currentCount + 1;
    this.viewCount.next(newCount);
    localStorage.setItem('viewCount', newCount.toString());
  }
}