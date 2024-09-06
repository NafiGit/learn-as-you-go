import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemListComponent } from './item-list/item-list.component';
import { ThemeService, Theme } from './theme.service';
import { ViewCountService } from './services/view-count.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ItemListComponent, FormsModule],
  template: `
    <div class="app-container">
      <header>
        <div class="header-content">
          <h1 class="app-title"><i [class]="getThemeIcon()"></i> Item App</h1>
          <select [(ngModel)]="currentTheme" (ngModelChange)="onThemeChange($event)">
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="ocean">Ocean</option>
            <option value="forest">Forest</option>
          </select>
        </div>
      </header>
      <main>
        <app-item-list (statisticsUpdate)="updateStatistics($event)"></app-item-list>
      </main>
      <footer>
        <div class="footer-content">
          <div class="developer-info">
            <p>Made with <i class="fas fa-heart" style="margin-left: 5px; color:red"></i> by Nahfid</p>
            <div class="social-links">
              <p><a href="https://www.linkedin.com/in/nahfid" target="_blank"><i class="fab fa-linkedin"></i> LinkedIn</a></p>
              <br>
              <p><a href="https://github.com/NafiGit" target="_blank"><i class="fab fa-github"></i> GitHub</a></p>
            </div>
            <p><i class="fas fa-eye"></i> View Count: {{ viewCount }}</p>
          </div>
          <div class="made-with-love">
            <div class="stats">
            <p><i class="fas fa-folder"></i>Statistics</p>
              <p><i class="fas fa-list"></i> Total Items: {{ totalItems }}</p>
              <p><i class="fas fa-text-width"></i> Avg Length: {{ averageBodyLength | number:'1.0-0' }} chars</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css');

    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .app-container {
      font-family: 'Roboto', sans-serif;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      transition: background-color 0.3s ease;
    }

    header, footer {
      padding: 20px 0;
      transition: background-color 0.3s ease, color 0.3s ease;
    }

    .header-content, .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    main {
      flex-grow: 1;
      padding: 20px;
    }

    .app-title {
      font-family: 'Pacifico', cursive;
      font-size: 2em;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .app-title i {
      font-size: 0.8em;
    }

    select {
      padding: 5px 10px;
      font-size: 16px;
      border-radius: 5px;
      background-color: transparent;
      border: 1px solid currentColor;
      color: inherit;
    }

    footer {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .footer-content {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .developer-info, .made-with-love {
      flex: 1;
    }

    .developer-info h3 {
      margin-bottom: 15px;
      font-size: 1.2em;
    }

    .developer-info p, .made-with-love p {
      margin: 5px 0;
      display: flex;
      align-items: center;
    }

    .developer-info i, .made-with-love i {
      margin-right: 10px;
      width: 20px;
      text-align: center;
    }

    .social-links {
      display: flex;
      gap: 15px;
      margin-bottom: 10px;
    }

    .social-links a {
      text-decoration: none;
      color: inherit;
      display: flex;
      align-items: center;
      transition: opacity 0.3s ease;
    }

    .social-links a:hover {
      opacity: 0.7;
    }

    .made-with-love {
      text-align: right;
    }

    .made-with-love .fa-heart {
      color: #ff4136;
    }

    .stats {
      margin-top: 10px;
    }

    :host-context(.theme-dark) .app-container {
      background-color: #1a1a1a;
      color: #ffffff;
    }

    :host-context(.theme-light) .app-container {
      background-color: #ffffff;
      color: #333333;
    }

    :host-context(.theme-ocean) .app-container {
      background-color: #e0f7fa;
      color: #006064;
    }

    :host-context(.theme-forest) .app-container {
      background-color: #e8f5e9;
      color: #1b5e20;
    }

    :host-context(.theme-dark) header, :host-context(.theme-dark) footer {
      background-color: #2c2c2c;
    }

    :host-context(.theme-light) header, :host-context(.theme-light) footer {
      background-color: #f0f0f0;
    }

    :host-context(.theme-ocean) header, :host-context(.theme-ocean) footer {
      background-color: #b2ebf2;
    }

    :host-context(.theme-forest) header, :host-context(.theme-forest) footer {
      background-color: #c8e6c9;
    }
  `]
})

export class AppComponent implements OnInit, OnDestroy {
  currentTheme: Theme = 'dark';
  totalItems = 0;
  averageBodyLength = 0;
  viewCount = 0;
  private viewCountSubscription!: Subscription;

  constructor(
    private themeService: ThemeService,
    private viewCountService: ViewCountService
  ) {}

  ngOnInit() {
    this.onThemeChange(this.currentTheme);
    this.viewCountService.incrementViewCount();
    this.viewCountSubscription = this.viewCountService.getViewCount().subscribe(count => {
      this.viewCount = count;
    });
  }

  ngOnDestroy() {
    if (this.viewCountSubscription) {
      this.viewCountSubscription.unsubscribe();
    }
  }

  onThemeChange(theme: Theme) {
    this.themeService.setTheme(theme);
  }

  updateStatistics(stats: { totalItems: number; averageBodyLength: number }) {
    this.totalItems = stats.totalItems;
    this.averageBodyLength = stats.averageBodyLength;
  }

  getThemeIcon(): string {
    switch (this.currentTheme) {
      case 'dark': return 'fas fa-moon';
      case 'light': return 'fas fa-sun';
      case 'ocean': return 'fas fa-water';
      case 'forest': return 'fas fa-tree';
      default: return 'fas fa-circle';
    }
  }
}