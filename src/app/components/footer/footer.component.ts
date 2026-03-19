import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-top">
          <div class="footer-cta">
            <div class="cta-label">Let's Build Something</div>
            <h2 class="cta-heading">Open to<br><em>new conversations.</em></h2>
            <a href="mailto:mckerracher@gmail.com" class="cta-email">
              mckerracher&#64;gmail.com
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L13 3M13 3H7M13 3v6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
              </svg>
            </a>
          </div>

          <div class="footer-nav">
            <div class="footer-nav-group">
              <div class="nav-group-label">Navigation</div>
              <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#experience">Experience</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#publications">Publications</a></li>
              </ul>
            </div>

            <div class="footer-nav-group">
              <div class="nav-group-label">Projects</div>
              <ul>
                <li><a href="https://approx-bit.vercel.app/" target="_blank" rel="noopener">ApproxBit</a></li>
                <li><a href="https://vogs-cp.vercel.app/" target="_blank" rel="noopener">VOGS-CP</a></li>
                <li><a href="https://www.frescodata.xyz" target="_blank" rel="noopener">FRESCO</a></li>
                <li><a href="https://agile-3-d-demo.vercel.app/" target="_blank" rel="noopener">AGILE3D</a></li>
                <li><a href="https://tgl-demo.vercel.app/" target="_blank" rel="noopener">TGL Demo</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="footer-sig">
            <span class="sig-jm">JM</span>
            <span class="sig-dot"></span>
            <span class="sig-name">Joshua McKerracher</span>
          </div>
          <div class="footer-copy">
            <span>Built with Angular &amp; Three.js</span>
            <span class="copy-sep">·</span>
            <span>{{ currentYear }}</span>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      border-top: 1px solid rgba(255,255,255,0.05);
      padding: 80px 0 36px;
      position: relative;
    }

    .footer-top {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px;
      margin-bottom: 72px;
      align-items: start;
    }

    .cta-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.65rem;
      font-weight: 300;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #4a8ef7;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 12px;

      &::after {
        content: '';
        display: block;
        height: 1px;
        width: 36px;
        background: #4a8ef7;
        opacity: 0.35;
      }
    }

    .cta-heading {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(2.2rem, 4vw, 3.2rem);
      font-weight: 400;
      line-height: 1.05;
      color: #e8e2d6;
      letter-spacing: -0.01em;
      margin-bottom: 28px;

      em {
        font-style: italic;
        color: #4a8ef7;
      }
    }

    .cta-email {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.85rem;
      font-weight: 300;
      color: #9aa0b0;
      text-decoration: none;
      letter-spacing: 0.04em;
      border-bottom: 1px solid rgba(255,255,255,0.08);
      padding-bottom: 6px;
      transition: color 0.2s ease, border-color 0.2s ease, gap 0.2s ease;

      &:hover {
        color: #e8e2d6;
        border-color: rgba(255,255,255,0.2);
        gap: 14px;
      }
    }

    .footer-nav {
      display: flex;
      gap: 60px;
      justify-content: flex-end;
      padding-top: 8px;
    }

    .footer-nav-group {
      display: flex;
      flex-direction: column;
      gap: 16px;

      ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      a {
        font-size: 0.83rem;
        color: #4a5060;
        text-decoration: none;
        font-weight: 300;
        transition: color 0.2s ease;
        letter-spacing: 0.01em;

        &:hover { color: #9aa0b0; }
      }
    }

    .nav-group-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.6rem;
      font-weight: 300;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #2a3040;
    }

    .footer-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 28px;
      border-top: 1px solid rgba(255,255,255,0.04);
    }

    .footer-sig {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .sig-jm {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.1rem;
      font-weight: 500;
      color: #e8e2d6;
      letter-spacing: 0.05em;
    }

    .sig-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #4a8ef7;
    }

    .sig-name {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.68rem;
      font-weight: 300;
      color: #3a4050;
      letter-spacing: 0.08em;
    }

    .footer-copy {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.64rem;
      font-weight: 300;
      color: #2a3040;
      letter-spacing: 0.06em;
    }

    .copy-sep { color: #1a2030; }

    @media (max-width: 768px) {
      .footer-top {
        grid-template-columns: 1fr;
        gap: 48px;
      }

      .footer-nav {
        justify-content: flex-start;
      }

      .footer-bottom {
        flex-direction: column;
        gap: 16px;
        text-align: center;
      }
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
