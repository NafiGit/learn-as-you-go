import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div [ngClass]="(themeService.theme$ | async)">
      <header>
        <h1>Where in the world?</h1>
        <button (click)="toggleTheme()" class="theme-toggle">
          <i class="fas" [ngClass]="(themeService.theme$ | async) === 'dark' ? 'fa-sun' : 'fa-moon'"></i>
          {{ (themeService.theme$ | async) === 'dark' ? 'Light Mode' : 'Dark Mode' }}
        </button>
      </header>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&display=swap');

    :host {
      display: block;
      font-family: 'Nunito Sans', sans-serif;
      min-height: 100vh;
    }
    .light {
      background-color: var(--background-color);
      color: var(--text-color);
    }
    .dark {
      background-color: var(--background-color);
      color: var(--text-color);
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 23px 80px;
      background-color: var(--element-color);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
    }
    h1 {
      font-size: 24px;
      font-weight: 800;
    }
    .theme-toggle {
      background: none;
      border: none;
      color: inherit;
      font-family: inherit;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
    }
    .theme-toggle i {
      margin-right: 8px;
    }
    main {
      padding: 0;
    }
  `]
})
export class AppComponent {
  constructor(public themeService: ThemeService) {}

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}