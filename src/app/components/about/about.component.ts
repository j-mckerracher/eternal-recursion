import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <section class="about" id="about">
      <div class="container">
        <div class="about-grid">
          <div class="about-left">
            <div class="section-label reveal" #reveal>
              <span class="label-num">01</span> About
            </div>
            <h2 class="section-title reveal" #reveal>Engineer.<br><em>Researcher.</em><br>Builder.</h2>
            <div class="about-bio reveal" #reveal>
              <p>
                Hello — I'm Josh. I build resilient, scalable systems at the intersection of
                healthcare technology, cloud infrastructure, and academic research.
              </p>
              <p>
                At <strong>Mayo Clinic</strong>, I engineer a specimen management platform
                using Angular, C#, and MongoDB on GCP — designing collaborative locking systems,
                .NET libraries and AI orchestration workflows.
              </p>
              <p>
                Concurrently at <strong>Purdue University's DCSL</strong>, I analyze over
                20 million HPC jobs from the FRESCO dataset, producing peer-reviewed research
                on resource utilization and system dependability. My current research applies
                regression modeling, propensity-based cohort matching, unsupervised domain
                adaptation, and few-shot calibration to investigate whether predictive models
                generalize across heterogeneous computing environments — uncovering the
                measurement, covariate, and distributional shifts that determine when and why
                machine learning models fail in production HPC systems.
              </p>
            </div>

            <div class="location reveal" #reveal>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1C4.79 1 3 2.79 3 5c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4z" stroke="#4a8ef7" stroke-width="1.2" fill="none"/>
                <circle cx="7" cy="5" r="1.5" stroke="#4a8ef7" stroke-width="1.2" fill="none"/>
              </svg>
              <span>Boise, ID · Open to remote</span>
            </div>
          </div>

          <div class="about-right">
            <div class="stack-section reveal" #reveal>
              <div class="stack-label">Core Stack</div>
              <div class="stack-grid">
                @for (tech of coreStack; track tech.name) {
                  <div class="tech-pill" [class]="'cat-' + tech.cat">
                    <span class="pill-dot"></span>
                    {{ tech.name }}
                  </div>
                }
              </div>
            </div>

            <div class="stack-section reveal delay-1" #reveal>
              <div class="stack-label">Cloud & Infrastructure</div>
              <div class="stack-grid">
                @for (tech of cloudStack; track tech.name) {
                  <div class="tech-pill" [class]="'cat-' + tech.cat">
                    <span class="pill-dot"></span>
                    {{ tech.name }}
                  </div>
                }
              </div>
            </div>

            <div class="stack-section reveal delay-2" #reveal>
              <div class="stack-label">Data & Research</div>
              <div class="stack-grid">
                @for (tech of dataStack; track tech.name) {
                  <div class="tech-pill" [class]="'cat-' + tech.cat">
                    <span class="pill-dot"></span>
                    {{ tech.name }}
                  </div>
                }
              </div>
            </div>

            <div class="education-card reveal delay-3" #reveal>
              <div class="edu-icon">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2L1.5 6l7.5 4 7.5-4L9 2z" stroke="#4a8ef7" stroke-width="1.2" stroke-linejoin="round"/>
                  <path d="M1.5 6v5M4.5 7.5V13c0 1.5 2 2.5 4.5 2.5s4.5-1 4.5-2.5V7.5" stroke="#4a8ef7" stroke-width="1.2" stroke-linecap="round"/>
                </svg>
              </div>
              <div>
                <div class="edu-degree">B.S. Computer Science — Oregon State University</div>
                <div class="edu-also">+ B.A. Philosophy — UC Santa Cruz</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about {
      padding: var(--section-pad) 0;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 1px;
        height: 80px;
        background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.08));
      }
    }

    .about-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px;
      align-items: start;
    }

    .section-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.68rem;
      font-weight: 300;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #4a8ef7;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 12px;

      .label-num {
        opacity: 0.5;
      }

      &::after {
        content: '';
        display: block;
        height: 1px;
        width: 36px;
        background: #4a8ef7;
        opacity: 0.35;
      }
    }

    .section-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(2.4rem, 4vw, 3.4rem);
      font-weight: 400;
      line-height: 1.05;
      color: #e8e2d6;
      margin-bottom: 32px;
      letter-spacing: -0.01em;

      em {
        font-style: italic;
        color: #4a8ef7;
      }
    }

    .about-bio {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 32px;

      p {
        font-size: 0.93rem;
        color: #7a8090;
        line-height: 1.8;
        font-weight: 300;

        strong {
          color: #b0bcc8;
          font-weight: 500;
        }
      }

      .bio-interests {
        color: #5a6070;
        font-style: italic;
        font-size: 0.87rem;
      }
    }

    .location {
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.72rem;
      font-weight: 300;
      color: #5a6070;
      letter-spacing: 0.05em;
    }

    .about-right {
      display: flex;
      flex-direction: column;
      gap: 32px;
      padding-top: 20px;
    }

    .stack-section {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .stack-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.62rem;
      font-weight: 300;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #4a5060;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(255,255,255,0.04);
    }

    .stack-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .tech-pill {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 5px 12px;
      border-radius: 2px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.72rem;
      font-weight: 300;
      letter-spacing: 0.03em;
      border: 1px solid transparent;
      transition: border-color 0.2s ease, background 0.2s ease;
      cursor: default;

      &.cat-blue {
        background: rgba(74, 142, 247, 0.07);
        color: #7ab0f5;
        border-color: rgba(74, 142, 247, 0.15);
        .pill-dot { background: #4a8ef7; }
      }

      &.cat-gold {
        background: rgba(232, 160, 32, 0.07);
        color: #c89020;
        border-color: rgba(232, 160, 32, 0.15);
        .pill-dot { background: #e8a020; }
      }

      &.cat-green {
        background: rgba(56, 189, 120, 0.07);
        color: #38bd78;
        border-color: rgba(56, 189, 120, 0.15);
        .pill-dot { background: #38bd78; }
      }

      &:hover {
        &.cat-blue { border-color: rgba(74, 142, 247, 0.4); }
        &.cat-gold { border-color: rgba(232, 160, 32, 0.4); }
        &.cat-green { border-color: rgba(56, 189, 120, 0.4); }
      }
    }

    .pill-dot {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .education-card {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      padding: 18px 20px;
      background: rgba(74, 142, 247, 0.04);
      border: 1px solid rgba(74, 142, 247, 0.1);
      border-radius: 2px;
    }

    .edu-icon {
      margin-top: 2px;
      flex-shrink: 0;
    }

    .edu-degree {
      font-size: 0.82rem;
      color: #b0bcc8;
      font-weight: 400;
      margin-bottom: 4px;
      line-height: 1.4;
    }

    .edu-also {
      font-size: 0.75rem;
      color: #5a6070;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 300;
    }

    @media (max-width: 900px) {
      .about-grid {
        grid-template-columns: 1fr;
        gap: 48px;
      }
    }
  `]
})
export class AboutComponent implements AfterViewInit {
  @ViewChildren('reveal') revealEls!: QueryList<ElementRef>;

  coreStack = [
    { name: 'Angular', cat: 'blue' },
    { name: 'TypeScript', cat: 'blue' },
    { name: 'C# / .NET', cat: 'blue' },
    { name: 'Python', cat: 'blue' },
    { name: 'MongoDB', cat: 'green' },
    { name: 'Three.js', cat: 'blue' },
    { name: 'Java', cat: 'gold' },
    { name: 'SQL', cat: 'green' },
  ];

  cloudStack = [
    { name: 'GCP', cat: 'blue' },
    { name: 'AWS', cat: 'gold' },
    { name: 'Terraform', cat: 'gold' },
    { name: 'Docker', cat: 'blue' },
    { name: 'Cloud Run', cat: 'blue' },
    { name: 'Redis HA', cat: 'green' },
    { name: 'CI/CD', cat: 'green' },
  ];

  dataStack = [
    { name: 'PyArrow', cat: 'gold' },
    { name: 'Pandas', cat: 'gold' },
    { name: 'HPC / SLURM', cat: 'green' },
    { name: 'ETL Pipelines', cat: 'green' },
    { name: 'Parquet', cat: 'gold' },
    { name: 'S3', cat: 'gold' },
  ];

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    this.revealEls.forEach((el) => observer.observe(el.nativeElement));
  }
}
