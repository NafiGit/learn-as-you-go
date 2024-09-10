// src/app/theme.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark' | 'ocean' | 'forest';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  toggleTheme() {
    throw new Error('Method not implemented.');
  }
  private themeSubject = new BehaviorSubject<Theme>('light');
  theme$ = this.themeSubject.asObservable();

  setTheme(theme: Theme) {
    this.themeSubject.next(theme);
    document.body.className = theme;
  }
}
