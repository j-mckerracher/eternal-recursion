import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav [class.scrolled]="isScrolled()" [class.menu-open]="menuOpen()">
      <div class="nav-inner">
        <a href="#hero" class="nav-logo" (click)="closeMenu()">
          <span class="logo-jm">JM</span>
          <span class="logo-dot"></span>
        </a>

        <button class="hamburger" [class.open]="menuOpen()" (click)="toggleMenu()" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>

        <ul class="nav-links" [class.open]="menuOpen()">
          @for (link of links; track link.href) {
            <li>
              <a [href]="link.href" (click)="closeMenu()">
                <span class="link-index">{{ link.index }}</span>
                {{ link.label }}
              </a>
            </li>
          }
          <li>
            <a href="mailto:mckerracher@gmail.com" class="nav-cta" (click)="closeMenu()">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  `,
  styles: [`
    nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      padding: 24px clamp(24px, 5vw, 60px);
      transition: background 0.4s ease, padding 0.4s ease, backdrop-filter 0.4s ease;
    }

    nav.scrolled {
      padding: 16px clamp(24px, 5vw, 60px);
      background: rgba(7, 8, 15, 0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(255,255,255,0.04);
    }

    .nav-inner {
      max-width: 1160px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .nav-logo {
      display: flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
    }

    .logo-jm {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.4rem;
      font-weight: 500;
      color: #e8e2d6;
      letter-spacing: 0.05em;
      line-height: 1;
    }

    .logo-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #4a8ef7;
      margin-top: 2px;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 36px;
      list-style: none;
    }

    .nav-links a {
      font-family: 'DM Sans', sans-serif;
      font-size: 0.82rem;
      font-weight: 400;
      color: #9aa0b0;
      letter-spacing: 0.02em;
      transition: color 0.2s ease;
      position: relative;
      display: flex;
      align-items: baseline;
      gap: 6px;
      text-decoration: none;

      &::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 0;
        height: 1px;
        background: #4a8ef7;
        transition: width 0.25s ease;
      }

      &:hover {
        color: #e8e2d6;
        &::after { width: 100%; }
      }
    }

    .link-index {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.6rem;
      font-weight: 300;
      color: #4a8ef7;
      opacity: 0.7;
    }

    .nav-cta {
      font-family: 'DM Sans', sans-serif !important;
      font-size: 0.78rem !important;
      font-weight: 500 !important;
      color: #4a8ef7 !important;
      border: 1px solid rgba(74, 142, 247, 0.35) !important;
      padding: 8px 20px !important;
      border-radius: 2px !important;
      letter-spacing: 0.04em !important;
      transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease !important;

      &::after { display: none !important; }

      &:hover {
        background: #4a8ef7 !important;
        color: #fff !important;
        border-color: #4a8ef7 !important;
      }
    }

    .hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      cursor: pointer;
      background: none;
      border: none;
      padding: 4px;
      z-index: 101;

      span {
        display: block;
        width: 24px;
        height: 1.5px;
        background: #e8e2d6;
        transition: transform 0.3s ease, opacity 0.3s ease;
      }

      &.open {
        span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        span:nth-child(2) { opacity: 0; }
        span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }
      }
    }

    @media (max-width: 768px) {
      .hamburger { display: flex; }

      .nav-links {
        position: fixed;
        inset: 0;
        flex-direction: column;
        justify-content: center;
        gap: 32px;
        background: rgba(7, 8, 15, 0.98);
        backdrop-filter: blur(20px);
        transform: translateX(100%);
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);

        &.open { transform: translateX(0); }

        a {
          font-size: 1.1rem;
        }
      }
    }
  `]
})
export class NavComponent {
  isScrolled = signal(false);
  menuOpen = signal(false);

  links = [
    { href: '#about', label: 'About', index: '01' },
    { href: '#experience', label: 'Experience', index: '02' },
    { href: '#projects', label: 'Projects', index: '03' },
    { href: '#publications', label: 'Publications', index: '04' },
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 40);
  }

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }

  closeMenu() {
    this.menuOpen.set(false);
  }
}
