import { Component, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';

interface Job {
  company: string;
  role: string;
  period: string;
  current: boolean;
  url: string;
  description: string;
  highlights: string[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  template: `
    <section class="experience" id="experience">
      <div class="container">
        <div class="section-header">
          <div class="section-label reveal" #reveal>
            <span>02</span> Experience
          </div>
          <h2 class="section-title reveal" #reveal>Where I've<br>Built Things</h2>
        </div>

        <div class="timeline">
          @for (job of jobs; track job.company; let i = $index) {
            <div class="timeline-item reveal" [class]="'delay-' + (i % 5)" #reveal>
              <div class="timeline-line">
                <div class="timeline-dot" [class.current]="job.current"></div>
                <div class="timeline-connector"></div>
              </div>
              <div class="timeline-card">
                <div class="card-header">
                  <div class="card-title-group">
                    <div class="card-role">{{ job.role }}</div>
                    <a [href]="job.url" target="_blank" rel="noopener" class="card-company">
                      {{ job.company }}
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 8L8 2M8 2H4M8 2v4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
                      </svg>
                    </a>
                  </div>
                  <div class="card-period" [class.current]="job.current">
                    @if (job.current) {
                      <span class="current-dot"></span>
                    }
                    {{ job.period }}
                  </div>
                </div>
                <p class="card-desc">{{ job.description }}</p>
                <ul class="card-highlights">
                  @for (h of job.highlights; track h) {
                    <li>{{ h }}</li>
                  }
                </ul>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .experience {
      padding: var(--section-pad) 0;
    }

    .section-header {
      margin-bottom: 64px;
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
    }

    .timeline {
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .timeline-item {
      display: grid;
      grid-template-columns: 28px 1fr;
      gap: 24px;
      position: relative;

      &:last-child .timeline-connector {
        display: none;
      }
    }

    .timeline-line {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 6px;
    }

    .timeline-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #1a2040;
      border: 1.5px solid #3a4060;
      flex-shrink: 0;
      transition: border-color 0.2s ease;

      &.current {
        background: #4a8ef7;
        border-color: #4a8ef7;
        box-shadow: 0 0 12px rgba(74, 142, 247, 0.5);
      }
    }

    .timeline-connector {
      flex: 1;
      width: 1px;
      background: rgba(255,255,255,0.05);
      margin-top: 6px;
      min-height: 32px;
    }

    .timeline-card {
      padding-bottom: 40px;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 20px;
      margin-bottom: 14px;
    }

    .card-title-group {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .card-role {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.3rem;
      font-weight: 500;
      color: #e8e2d6;
      line-height: 1.2;
    }

    .card-company {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 0.8rem;
      font-weight: 400;
      color: #4a8ef7;
      text-decoration: none;
      letter-spacing: 0.02em;
      transition: opacity 0.2s;

      &:hover { opacity: 0.75; }
    }

    .card-period {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.68rem;
      font-weight: 300;
      color: #4a5060;
      letter-spacing: 0.08em;
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: 6px;
      padding-top: 4px;

      &.current { color: #4a8ef7; opacity: 0.8; }
    }

    .current-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #4a8ef7;
      animation: pulse 2s ease-in-out infinite;
      flex-shrink: 0;
    }

    .card-desc {
      font-size: 0.87rem;
      color: #6b7080;
      line-height: 1.75;
      margin-bottom: 14px;
      font-weight: 300;
      max-width: 640px;
    }

    .card-highlights {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 6px;

      li {
        font-size: 0.82rem;
        color: #5a6470;
        line-height: 1.6;
        padding-left: 14px;
        position: relative;
        font-weight: 300;

        &::before {
          content: '—';
          position: absolute;
          left: 0;
          color: #3a4060;
          font-size: 0.7rem;
        }
      }
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }

    @media (max-width: 640px) {
      .card-header {
        flex-direction: column;
        gap: 8px;
      }
    }
  `]
})
export class ExperienceComponent implements AfterViewInit {
  @ViewChildren('reveal') revealEls!: QueryList<ElementRef>;

  jobs: Job[] = [
    {
      company: 'Mayo Clinic',
      role: 'Software Engineer',
      period: 'Sep 2024 — Present',
      current: true,
      url: 'https://www.mayoclinic.org',
      description: 'Core full-stack engineer on a healthcare specimen management platform. Designed collaborative locking architecture on GCP and led security compliance across a three-team monorepo.',
      highlights: [
        'Designed GCP reference architecture for collaborative order locking using Cloud Run + Memorystore (Redis HA)',
        'Sole author of rls-nuget-orders-locker — a modular .NET library for order-locking domain contracts',
        'Security champion for mcs-products-mono-ui, establishing Veracode SAST/SCA scanning cadence',
      ],
    },
    {
      company: 'Purdue University — DCSL',
      role: 'Research Software Engineer (Part-Time)',
      period: 'May 2023 — Present',
      current: true,
      url: 'https://engineering.purdue.edu/dcsl/',
      description: 'Led research extracting insights from the FRESCO dataset, resulting in two peer-reviewed publications. Built the data access platform and AWS infrastructure for the lab.',
      highlights: [
        'Designed ETL pipeline processing 20.9M HPC jobs integrating SLURM/PBS accounting with system metrics',
        'Built FRESCO data access and visualization platform (frescodata.xyz)',
        'Sole AWS administrator for DCSL research lab — compute, IAM, and budgets',
      ],
    },
    {
      company: 'Ancestry',
      role: 'Software Engineer — Genomic Algorithms',
      period: 'Dec 2023 — Sep 2024',
      current: false,
      url: 'https://www.ancestry.com',
      description: 'Built cloud-scale systems for processing and analyzing genomic data. Contributed to Ethnicity Sub-Regions, a new AncestryDNA feature released to millions of customers worldwide.',
      highlights: [
        'Improved system performance by up to 10x through iterative optimization of existing tools',
        'Designed API contracts, architecture diagrams, and data privacy policies for GDPR compliance',
        'Partnered with Product, Research, and Service teams on full feature lifecycle',
      ],
    },
    {
      company: 'State Farm',
      role: 'Software Engineer',
      period: 'Aug 2022 — Dec 2023',
      current: false,
      url: 'https://www.statefarm.com',
      description: 'Led design of WCCS, a core feature of the CTO Routing service. Contributed to an event-driven microservices platform on AWS processing ~300k events per day.',
      highlights: [
        'Led design and implementation of WCCS for the CTO Routing service (Java, on-prem)',
        'Built Shop Based Routing — async event-driven microservices platform on AWS',
        'Created and maintained GitLab CI/CD pipelines with unit tests, linters, and security scans',
      ],
    },
    {
      company: 'Micron Technology',
      role: 'Software Engineer',
      period: 'Nov 2020 — Aug 2022',
      current: false,
      url: 'https://www.micron.com',
      description: 'Managed 200+ RedHat Linux production servers and designed a comprehensive monitoring solution that saved $200k annually in operational costs.',
      highlights: [
        'Designed system-level monitoring solution (CPU, memory, disk I/O) saving $200k/year',
        'Managed hybrid cloud/on-prem infrastructure using AWS, Terraform, and automated CI/CD',
        'SME on server monitoring infrastructure across on-premises data centers',
      ],
    },
  ];

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.08 }
    );
    this.revealEls.forEach((el) => observer.observe(el.nativeElement));
  }
}
