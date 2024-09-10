import { Component } from '@angular/core';
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faFileAlt, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ThemeService } from './services/theme.service';
import { AsyncPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FontAwesomeModule, AsyncPipe, NgClass],
  template: `
    <footer class="footer" [ngClass]="(themeService.theme$ | async)">
      <div class="credit-text">
        Made with <fa-icon [icon]="faHeart" class="heart-icon"></fa-icon> by Nahfid Nissar
      </div>
      <div class="nav-links">
        <a
          href="https://mega.nz/file/yuRSgLgS#AutwszU8CuCAfyzCVekzD_5byfSr6Tnn2upx-5aCqeg"
          title="Resume"
          target="_blank"
          rel="noopener noreferrer"
          class="nav-link"
        >
          <fa-icon [icon]="faFileAlt"></fa-icon>
        </a>
        <a
          href="https://github.com/NafiGit"
          title="GitHub"
          target="_blank"
          rel="noopener noreferrer"
          class="nav-link"
        >
          <fa-icon [icon]="faGithub"></fa-icon>
        </a>
      </div>
    </footer>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&display=swap');

    .footer {
      padding: 2rem 5%;
      font-family: "Nunito Sans", sans-serif;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: var(--element-color);
      color: var(--text-color);
      font-size: 14px;
      box-sizing: border-box;
    }
    .heart-icon {
      color: #ff69b4;
      margin: 0 0.25rem;
    }
    .nav-links {
      display: flex;
      gap: 1.5rem;
    }
    .nav-link {
      color: var(--text-color);
      transition: opacity 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .nav-link:hover {
      opacity: 0.7;
    }
    .nav-link fa-icon {
      width: 20px;
      height: 20px;
    }
    .credit-text {
      font-weight: 600;
      display: flex;
      align-items: center;
    }

    @media (max-width: 768px) {
      .footer {
        flex-direction: column;
        gap: 1rem;
        padding: 1.5rem 5%;
      }
      .nav-links {
        gap: 1rem;
      }
    }
  `]
})
export class FooterComponent {
  faHeart = faHeart;
  faFileAlt = faFileAlt;
  faGithub = faGithub;

  constructor(public themeService: ThemeService) {}
}

export default FooterComponent;
