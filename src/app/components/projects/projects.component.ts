import { Component, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';

interface Project {
  title: string;
  subtitle: string;
  description: string;
  url: string;
  tags: string[];
  featured?: boolean;
  badge?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  template: `
    <section class="projects" id="projects">
      <div class="container">
        <div class="section-header">
          <div class="section-label reveal" #reveal>
            <span>03</span> Projects
          </div>
          <h2 class="section-title reveal" #reveal>Selected Work</h2>
          <p class="section-subtitle reveal" #reveal>
            Research demos, data platforms, and interactive visualizations.
          </p>
        </div>

        <div class="projects-grid">
          @for (project of projects; track project.title; let i = $index) {
            <a
              [href]="project.url"
              target="_blank"
              rel="noopener noreferrer"
              class="project-card reveal"
              [class.featured]="project.featured"
              [class]="'project-card reveal delay-' + (i % 5)"
              #reveal
            >
              @if (project.badge) {
                <div class="project-badge">{{ project.badge }}</div>
              }

              <div class="card-body">
                <div class="card-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="2" y="2" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.3"/>
                    <rect x="11" y="2" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.3"/>
                    <rect x="2" y="11" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.3"/>
                    <rect x="11" y="11" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.3"/>
                  </svg>
                </div>
                <h3 class="card-title">{{ project.title }}</h3>
                <div class="card-subtitle">{{ project.subtitle }}</div>
                <p class="card-desc">{{ project.description }}</p>
              </div>

              <div class="card-footer">
                <div class="card-tags">
                  @for (tag of project.tags; track tag) {
                    <span class="tag">{{ tag }}</span>
                  }
                </div>
                <div class="card-arrow">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 13L13 3M13 3H7M13 3v6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
                  </svg>
                </div>
              </div>
            </a>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .projects {
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
      margin-bottom: 52px;
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
      margin-bottom: 12px;
    }

    .section-subtitle {
      font-size: 0.9rem;
      color: #5a6070;
      font-weight: 300;
      line-height: 1.7;
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }

    .project-card {
      position: relative;
      background: #0c0e1a;
      border: 1px solid rgba(255,255,255,0.05);
      border-radius: 3px;
      padding: 28px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-decoration: none;
      color: inherit;
      transition:
        border-color 0.3s ease,
        background 0.3s ease,
        transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
        box-shadow 0.3s ease;
      min-height: 280px;
      cursor: pointer;

      &:hover {
        border-color: rgba(74, 142, 247, 0.3);
        background: #0f1228;
        transform: translateY(-4px);
        box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(74, 142, 247, 0.1);

        .card-arrow {
          color: #4a8ef7;
          transform: translate(2px, -2px);
        }

        .card-icon {
          color: #4a8ef7;
          border-color: rgba(74, 142, 247, 0.25);
        }
      }

      &.featured {
        grid-column: span 2;
        background: linear-gradient(135deg, #0c0e1a 0%, #0d1230 100%);
        border-color: rgba(74, 142, 247, 0.12);
      }
    }

    .project-badge {
      position: absolute;
      top: 18px;
      right: 18px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.58rem;
      font-weight: 400;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #e8a020;
      background: rgba(232, 160, 32, 0.08);
      border: 1px solid rgba(232, 160, 32, 0.2);
      padding: 3px 8px;
      border-radius: 2px;
    }

    .card-body {
      flex: 1;
    }

    .card-icon {
      width: 36px;
      height: 36px;
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 3px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #4a5060;
      margin-bottom: 20px;
      transition: color 0.2s ease, border-color 0.2s ease;
    }

    .card-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.35rem;
      font-weight: 500;
      color: #e8e2d6;
      line-height: 1.2;
      margin-bottom: 4px;
      letter-spacing: -0.01em;
    }

    .card-subtitle {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.64rem;
      font-weight: 300;
      color: #4a8ef7;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 14px;
      opacity: 0.7;
    }

    .card-desc {
      font-size: 0.82rem;
      color: #5a6070;
      line-height: 1.7;
      font-weight: 300;
    }

    .card-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 24px;
      padding-top: 16px;
      border-top: 1px solid rgba(255,255,255,0.04);
    }

    .card-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .tag {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.62rem;
      font-weight: 300;
      color: #4a5060;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.05);
      padding: 2px 8px;
      border-radius: 2px;
      letter-spacing: 0.05em;
    }

    .card-arrow {
      color: #3a4060;
      transition: color 0.2s ease, transform 0.2s ease;
      flex-shrink: 0;
    }

    @media (max-width: 900px) {
      .projects-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .project-card.featured {
        grid-column: span 1;
      }
    }

    @media (max-width: 600px) {
      .projects-grid {
        grid-template-columns: 1fr;
      }
      .project-card.featured {
        grid-column: span 1;
      }
    }
  `]
})
export class ProjectsComponent implements AfterViewInit {
  @ViewChildren('reveal') revealEls!: QueryList<ElementRef>;

  projects: Project[] = [
    {
      title: 'ApproxBit',
      subtitle: 'Approximate Video Analytics',
      description: 'Interactive research demo for ApproxBit — an intelligent video analytics system leveraging approximate computing for efficient processing at scale. Built for Purdue DCSL.',
      url: 'https://approx-bit.vercel.app/',
      tags: ['Research', 'SenSys \'26', 'Video Analytics'],
      featured: true,
      badge: 'New',
    },
    {
      title: 'VOGS-CP',
      subtitle: 'Collaborative Perception for AVs',
      description: 'Research demo for VOGS-CP — autonomous vehicles that sense beyond their direct line of sight through collaborative perception. AAAI 2026.',
      url: 'https://vogs-cp.vercel.app/',
      tags: ['Research', 'AAAI 2026', 'Autonomous Vehicles'],
      badge: 'New',
    },
    {
      title: 'FRESCO Data Repository',
      subtitle: 'HPC Dataset Platform',
      description: 'Public data repository and analytics platform for the FRESCO multi-institutional HPC dataset. Provides access to 20M+ job records for the research community.',
      url: 'https://www.frescodata.xyz',
      tags: ['Python', 'AWS', 'Research Platform'],
    },
    {
      title: 'AGILE3D Demo',
      subtitle: '3D Adaptive Perception',
      description: 'Interactive demo of adaptive 3D perception for autonomous vehicles, featuring dual point cloud viewers with real Waymo dataset data and live performance metrics.',
      url: 'https://agile-3-d-demo.vercel.app/',
      tags: ['Angular', 'Three.js', 'Waymo'],
    },
    {
      title: 'TGL Network Demo',
      subtitle: 'P2P Network Visualization',
      description: 'Real-time peer-to-peer network visualization demonstrating Tiered Gossip Learning with interactive simulation controls and live metrics.',
      url: 'https://tgl-demo.vercel.app/',
      tags: ['Angular', 'Three.js', 'Network Sim'],
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
