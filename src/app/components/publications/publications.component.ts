import { Component, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';

@Component({
  selector: 'app-publications',
  standalone: true,
  template: `
    <section class="publications" id="publications">
      <div class="container">
        <div class="section-header">
          <div class="section-label reveal" #reveal>
            <span>04</span> Publications
          </div>
          <h2 class="section-title reveal" #reveal>Research &amp;<br>Writing</h2>
          <p class="section-subtitle reveal" #reveal>
            Peer-reviewed work on HPC system behavior,<br>resource utilization, and dataset contributions.
          </p>
        </div>

        <div class="pubs-list">
          @for (pub of publications; track pub.title; let i = $index) {
            <div class="pub-item reveal" [class]="'delay-' + i" #reveal>
              <div class="pub-meta">
                <div class="pub-venue">{{ pub.venue }}</div>
                <div class="pub-year">{{ pub.year }}</div>
              </div>
              <div class="pub-body">
                <h3 class="pub-title">{{ pub.title }}</h3>
                <p class="pub-authors">{{ pub.authors }}</p>
                <p class="pub-abstract">{{ pub.abstract }}</p>
                <div class="pub-footer">
                  <a [href]="pub.url" target="_blank" rel="noopener" class="pub-link">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 12L12 2M12 2H6M12 2v6" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
                    </svg>
                    Visit Dataset Site
                  </a>
                  @for (tag of pub.tags; track tag) {
                    <span class="pub-tag">{{ tag }}</span>
                  }
                </div>
              </div>
            </div>
          }
        </div>

        <div class="pub-note reveal" #reveal>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="#4a8ef7" stroke-width="1.2" opacity="0.5"/>
            <path d="M7 5v4M7 4v.5" stroke="#4a8ef7" stroke-width="1.4" stroke-linecap="round" opacity="0.5"/>
          </svg>
          <span>Full citations and preprints available on request.</span>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .publications {
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
        background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.06));
      }
    }

    .section-header {
      margin-bottom: 56px;
    }

    .section-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.68rem;
      font-weight: 300;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #4a8ef7;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 12px;

      span { opacity: 0.5; }

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
      letter-spacing: -0.01em;
      margin-bottom: 14px;
    }

    .section-subtitle {
      font-size: 0.9rem;
      color: #5a6070;
      font-weight: 300;
      line-height: 1.8;
    }

    .pubs-list {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .pub-item {
      display: grid;
      grid-template-columns: 200px 1fr;
      gap: 48px;
      padding: 36px 0;
      border-top: 1px solid rgba(255,255,255,0.05);
      transition: background 0.2s ease;

      &:last-child {
        border-bottom: 1px solid rgba(255,255,255,0.05);
      }

      &:hover {
        .pub-title { color: #d0d8e8; }
      }
    }

    .pub-meta {
      padding-top: 4px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .pub-venue {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.68rem;
      font-weight: 400;
      color: #e8a020;
      letter-spacing: 0.06em;
      line-height: 1.5;
    }

    .pub-year {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.64rem;
      font-weight: 300;
      color: #3a4050;
      letter-spacing: 0.08em;
    }

    .pub-body {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .pub-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.4rem;
      font-weight: 500;
      color: #c0c8d8;
      line-height: 1.3;
      letter-spacing: -0.01em;
      transition: color 0.2s ease;
    }

    .pub-authors {
      font-size: 0.78rem;
      color: #4a5060;
      font-weight: 300;
      font-family: 'JetBrains Mono', monospace;
      letter-spacing: 0.02em;
      line-height: 1.6;
    }

    .pub-abstract {
      font-size: 0.87rem;
      color: #6a7080;
      line-height: 1.75;
      font-weight: 300;
      max-width: 600px;
    }

    .pub-footer {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
      margin-top: 4px;
    }

    .pub-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.78rem;
      font-weight: 400;
      color: #4a8ef7;
      text-decoration: none;
      letter-spacing: 0.02em;
      transition: opacity 0.2s ease, gap 0.2s ease;
      font-family: 'DM Sans', sans-serif;

      &:hover {
        opacity: 0.7;
        gap: 9px;
      }
    }

    .pub-tag {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.6rem;
      font-weight: 300;
      color: #3a4050;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.05);
      padding: 2px 8px;
      border-radius: 2px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .pub-note {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 36px;
      font-size: 0.78rem;
      color: #3a4050;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 300;
      letter-spacing: 0.04em;
    }

    @media (max-width: 768px) {
      .pub-item {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .pub-meta {
        flex-direction: row;
        align-items: center;
        gap: 16px;
      }
    }
  `]
})
export class PublicationsComponent implements AfterViewInit {
  @ViewChildren('reveal') revealEls!: QueryList<ElementRef>;

  publications = [
    {
      title: 'FRESCO: A Public Multi-Institutional Dataset for Understanding HPC System Behavior and Dependability',
      venue: 'PEARC \'25',
      year: '2025',
      url: 'https://www.frescodata.xyz',
      authors: 'Joshua Stephen McKerracher, Preeti Mukherjee, Rajesh Kalyanam, Saurabh Bagchi',
      abstract: 'We introduce FRESCO, a public multi-institutional dataset capturing HPC system behavior across several production clusters. The dataset integrates SLURM/PBS accounting data with system-level telemetry to enable reproducible research on dependability, resource utilization, and workload prediction.',
      tags: ['HPC', 'Dataset', 'ACM', 'Dependability'],
    },
    {
      title: 'Wasted Cycles and Waiting Games: Analysis of HPC Resource Usage Using Production Cluster Data in FRESCO',
      venue: 'ACM IKDD CODS 2025',
      year: '2025',
      url: 'https://www.frescodata.xyz',
      authors: 'Joshua Stephen McKerracher, Aryamaan Dhomne, Saurabh Bagchi',
      abstract: 'An analysis of resource waste patterns across production HPC clusters using the FRESCO dataset. We characterize ~48.5% average resource waste across systems, identify root causes spanning job scheduling and over-provisioning, and discuss implications for future workload managers.',
      tags: ['HPC', 'Resource Analysis', 'ACM IKDD', 'Data Science'],
    },
  ];

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.1 }
    );
    this.revealEls.forEach((el) => observer.observe(el.nativeElement));
  }
}
