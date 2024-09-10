import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CountryListComponent } from './country-list/country-list.component';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CountryListComponent],
  template: `
    <header>
      <h1>Where in the world?</h1>
      <button (click)="toggleTheme()">
        {{ (themeService.theme$ | async) === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode' }}
      </button>
    </header>
    <main>
      <app-country-list></app-country-list>
    </main>
  `,
  styles: [`
    :host {
      display: block;
      font-family: Arial, sans-serif;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      background-color: var(--background-color);
      color: var(--text-color);
    }
    main {
      padding: 20px;
    }
  `]
})
export class AppComponent {
  constructor(public themeService: ThemeService) {}

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}