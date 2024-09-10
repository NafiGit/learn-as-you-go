import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<'light' | 'dark'>('light');
  theme$ = this.themeSubject.asObservable();

  constructor() {
    this.setTheme('light');
  }

  setTheme(theme: 'light' | 'dark') {
    this.themeSubject.next(theme);
    document.body.className = theme;
    if (theme === 'light') {
      document.documentElement.style.setProperty('--background-color', 'hsl(0, 0%, 98%)');
      document.documentElement.style.setProperty('--text-color', 'hsl(200, 15%, 8%)');
      document.documentElement.style.setProperty('--element-color', 'hsl(0, 0%, 100%)');
      document.documentElement.style.setProperty('--input-color', 'hsl(0, 0%, 52%)');
    } else {
      document.documentElement.style.setProperty('--background-color', 'hsl(207, 26%, 17%)');
      document.documentElement.style.setProperty('--text-color', 'hsl(0, 0%, 100%)');
      document.documentElement.style.setProperty('--element-color', 'hsl(209, 23%, 22%)');
      document.documentElement.style.setProperty('--input-color', 'hsl(0, 0%, 100%)');
    }
  }

  toggleTheme() {
    const currentTheme = this.themeSubject.getValue();
    this.setTheme(currentTheme === 'light' ? 'dark' : 'light');
  }
}
