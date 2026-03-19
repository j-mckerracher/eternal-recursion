import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  NgZone,
} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section class="hero" id="hero">
      <canvas #heroCanvas class="hero-canvas"></canvas>

      <div class="hero-content">
        <div class="hero-label">
          <span class="label-line"></span>
          Software Engineer &amp; Researcher
        </div>

        <h1 class="hero-name">
          <span class="name-first">Joshua</span>
          <span class="name-last">McKerracher</span>
        </h1>

        <p class="hero-tagline">
          Building resilient systems at the intersection of
          <em>healthcare</em>, cloud architecture, and HPC research.
        </p>

        <div class="hero-cta">
          <a href="#projects" class="btn-primary">
            <span>View Work</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
          <a href="mailto:mckerracher@gmail.com" class="btn-ghost">Get in Touch</a>
        </div>

        <div class="hero-meta">
          <div class="meta-item">
            <span class="meta-num">5+</span>
            <span class="meta-label">Years Engineering</span>
          </div>
          <div class="meta-divider"></div>
          <div class="meta-item">
            <span class="meta-num">2</span>
            <span class="meta-label">Publications</span>
          </div>
          <div class="meta-divider"></div>
          <div class="meta-item">
            <span class="meta-num">20M+</span>
            <span class="meta-label">HPC Jobs Analyzed</span>
          </div>
        </div>
      </div>

      <div class="hero-scroll">
        <span class="scroll-text">Scroll</span>
        <div class="scroll-bar"><div class="scroll-progress"></div></div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      position: relative;
      width: 100%;
      height: 100vh;
      min-height: 700px;
      display: flex;
      align-items: center;
      overflow: hidden;
      background: #07080f;
    }

    .hero-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
    }

    .hero-content {
      position: relative;
      z-index: 2;
      padding: 0 clamp(24px, 5vw, 60px);
      max-width: 1160px;
      margin: 0 auto;
      width: 100%;
    }

    .hero-label {
      display: flex;
      align-items: center;
      gap: 14px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
      font-weight: 300;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #4a8ef7;
      margin-bottom: 28px;
      animation: fadeSlideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .label-line {
      display: block;
      width: 36px;
      height: 1px;
      background: #4a8ef7;
      opacity: 0.6;
    }

    .hero-name {
      font-family: 'Cormorant Garamond', serif;
      font-weight: 400;
      line-height: 0.95;
      margin-bottom: 28px;
      display: flex;
      flex-direction: column;
    }

    .name-first {
      font-size: clamp(4rem, 10vw, 9rem);
      color: #e8e2d6;
      letter-spacing: -0.02em;
      animation: fadeSlideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
    }

    .name-last {
      font-size: clamp(4rem, 10vw, 9rem);
      color: transparent;
      -webkit-text-stroke: 1px rgba(232, 226, 214, 0.35);
      letter-spacing: -0.02em;
      animation: fadeSlideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
    }

    .hero-tagline {
      font-size: clamp(0.95rem, 1.5vw, 1.1rem);
      color: #9aa0b0;
      max-width: 420px;
      line-height: 1.75;
      margin-bottom: 40px;
      font-weight: 300;
      animation: fadeSlideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;

      em {
        font-style: normal;
        color: #e8e2d6;
      }
    }

    .hero-cta {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 64px;
      animation: fadeSlideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
    }

    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 14px 28px;
      background: #4a8ef7;
      color: #fff;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.85rem;
      font-weight: 500;
      letter-spacing: 0.02em;
      border-radius: 2px;
      text-decoration: none;
      transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;

      &:hover {
        background: #6aa3ff;
        transform: translateY(-2px);
        box-shadow: 0 8px 32px rgba(74, 142, 247, 0.3);
      }
    }

    .btn-ghost {
      display: inline-flex;
      align-items: center;
      padding: 14px 28px;
      border: 1px solid rgba(255,255,255,0.12);
      color: #9aa0b0;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.85rem;
      font-weight: 400;
      border-radius: 2px;
      text-decoration: none;
      transition: border-color 0.2s ease, color 0.2s ease;

      &:hover {
        border-color: rgba(255,255,255,0.3);
        color: #e8e2d6;
      }
    }

    .hero-meta {
      display: flex;
      align-items: center;
      gap: 32px;
      animation: fadeSlideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both;
    }

    .meta-item {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .meta-num {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.6rem;
      font-weight: 500;
      color: #e8e2d6;
      line-height: 1;
    }

    .meta-label {
      font-size: 0.72rem;
      font-weight: 300;
      color: #5a6070;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      font-family: 'JetBrains Mono', monospace;
    }

    .meta-divider {
      width: 1px;
      height: 36px;
      background: rgba(255,255,255,0.08);
    }

    .hero-scroll {
      position: absolute;
      bottom: 36px;
      right: clamp(24px, 5vw, 60px);
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      animation: fadeSlideIn 1s ease 1s both;
    }

    .scroll-text {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.6rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #5a6070;
      writing-mode: vertical-rl;
    }

    .scroll-bar {
      width: 1px;
      height: 60px;
      background: rgba(255,255,255,0.08);
      border-radius: 1px;
      overflow: hidden;
    }

    .scroll-progress {
      width: 100%;
      height: 30%;
      background: #4a8ef7;
      border-radius: 1px;
      animation: scrollPulse 2s ease-in-out infinite;
    }

    @keyframes fadeSlideIn {
      from {
        opacity: 0;
        transform: translateY(24px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes scrollPulse {
      0% { transform: translateY(-100%); }
      100% { transform: translateY(400%); }
    }

    @media (max-width: 640px) {
      .hero-meta { gap: 20px; }
      .name-first, .name-last { font-size: clamp(3rem, 16vw, 5rem); }
      .hero-scroll { display: none; }
    }
  `]
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private animFrameId = 0;
  private frameCount = 0;

  // Icosahedron
  private icoMesh!: THREE.LineSegments;

  // Particles
  private particles!: THREE.Points;
  private particlePositions!: Float32Array;
  private velocities: Array<{ x: number; y: number; z: number }> = [];
  private readonly nodeCount = 140;

  // Connection lines
  private linesMesh!: THREE.LineSegments;
  private readonly maxLines = 350;

  // Mouse / camera
  private mouseX = 0;
  private mouseY = 0;
  private camTargetX = 0;
  private camTargetY = 0;

  private mouseMoveHandler = (e: MouseEvent) => {
    this.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    this.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  };

  private resizeHandler = () => this.onResize();

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.initThree();
      this.animate();
    });
    window.addEventListener('mousemove', this.mouseMoveHandler);
    window.addEventListener('resize', this.resizeHandler);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animFrameId);
    window.removeEventListener('mousemove', this.mouseMoveHandler);
    window.removeEventListener('resize', this.resizeHandler);
    this.renderer?.dispose();
  }

  private initThree(): void {
    const canvas = this.canvasRef.nativeElement;
    const w = canvas.offsetWidth || window.innerWidth;
    const h = canvas.offsetHeight || window.innerHeight;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 600);
    this.camera.position.set(0, 0, 130);

    // Wireframe icosahedron (gold) — the surrealist floating form
    const icoGeo = new THREE.IcosahedronGeometry(52, 1);
    const icoWire = new THREE.WireframeGeometry(icoGeo);
    const icoMat = new THREE.LineBasicMaterial({
      color: 0xe8a020,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
    });
    this.icoMesh = new THREE.LineSegments(icoWire, icoMat);
    this.scene.add(this.icoMesh);
    icoGeo.dispose();

    // Inner smaller icosahedron (blue, faster rotation)
    const icoGeo2 = new THREE.IcosahedronGeometry(28, 1);
    const icoWire2 = new THREE.WireframeGeometry(icoGeo2);
    const icoMat2 = new THREE.LineBasicMaterial({
      color: 0x4a8ef7,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
    });
    const icoMesh2 = new THREE.LineSegments(icoWire2, icoMat2);
    this.scene.add(icoMesh2);
    icoGeo2.dispose();
    (this.icoMesh as any)._inner = icoMesh2;

    // Particle system
    this.initParticles();

    // Connection lines geometry (pre-allocated)
    const lineGeo = new THREE.BufferGeometry();
    const linePositions = new Float32Array(this.maxLines * 6);
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setDrawRange(0, 0);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x4a8ef7,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
    });
    this.linesMesh = new THREE.LineSegments(lineGeo, lineMat);
    this.scene.add(this.linesMesh);
  }

  private initParticles(): void {
    this.particlePositions = new Float32Array(this.nodeCount * 3);
    this.velocities = [];

    for (let i = 0; i < this.nodeCount; i++) {
      // Distribute in a spherical shell
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 38 + Math.random() * 55;

      this.particlePositions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      this.particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      this.particlePositions[i * 3 + 2] = r * Math.cos(phi);

      this.velocities.push({
        x: (Math.random() - 0.5) * 0.04,
        y: (Math.random() - 0.5) * 0.04,
        z: (Math.random() - 0.5) * 0.04,
      });
    }

    // Create circular sprite texture
    const spriteCanvas = document.createElement('canvas');
    spriteCanvas.width = 32;
    spriteCanvas.height = 32;
    const ctx = spriteCanvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0,   'rgba(74, 142, 247, 1)');
    grad.addColorStop(0.45,'rgba(74, 142, 247, 0.5)');
    grad.addColorStop(1,   'rgba(74, 142, 247, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);
    const spriteTex = new THREE.CanvasTexture(spriteCanvas);

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(this.particlePositions, 3));

    const mat = new THREE.PointsMaterial({
      size: 1.8,
      map: spriteTex,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.particles = new THREE.Points(geo, mat);
    this.scene.add(this.particles);
  }

  private updateParticles(): void {
    const bounds = 92;
    const pos = this.particlePositions;

    for (let i = 0; i < this.nodeCount; i++) {
      const ix = i * 3, iy = ix + 1, iz = ix + 2;
      pos[ix] += this.velocities[i].x;
      pos[iy] += this.velocities[i].y;
      pos[iz] += this.velocities[i].z;

      // Soft sphere boundary — reflect outward component
      const rSq = pos[ix] ** 2 + pos[iy] ** 2 + pos[iz] ** 2;
      if (rSq > bounds * bounds) {
        const r = Math.sqrt(rSq);
        const nx = pos[ix] / r, ny = pos[iy] / r, nz = pos[iz] / r;
        const dot = this.velocities[i].x * nx + this.velocities[i].y * ny + this.velocities[i].z * nz;
        if (dot > 0) {
          this.velocities[i].x -= 2 * dot * nx;
          this.velocities[i].y -= 2 * dot * ny;
          this.velocities[i].z -= 2 * dot * nz;
        }
      }
    }
    this.particles.geometry.attributes['position'].needsUpdate = true;
  }

  private updateLines(): void {
    const threshold = 24;
    const linePos = this.linesMesh.geometry.attributes['position'].array as Float32Array;
    const pPos = this.particlePositions;
    let lineIdx = 0;

    for (let i = 0; i < this.nodeCount && lineIdx < this.maxLines; i++) {
      for (let j = i + 1; j < this.nodeCount && lineIdx < this.maxLines; j++) {
        const dx = pPos[i * 3]     - pPos[j * 3];
        const dy = pPos[i * 3 + 1] - pPos[j * 3 + 1];
        const dz = pPos[i * 3 + 2] - pPos[j * 3 + 2];
        if (dx * dx + dy * dy + dz * dz < threshold * threshold) {
          linePos[lineIdx * 6]     = pPos[i * 3];
          linePos[lineIdx * 6 + 1] = pPos[i * 3 + 1];
          linePos[lineIdx * 6 + 2] = pPos[i * 3 + 2];
          linePos[lineIdx * 6 + 3] = pPos[j * 3];
          linePos[lineIdx * 6 + 4] = pPos[j * 3 + 1];
          linePos[lineIdx * 6 + 5] = pPos[j * 3 + 2];
          lineIdx++;
        }
      }
    }

    this.linesMesh.geometry.setDrawRange(0, lineIdx * 2);
    this.linesMesh.geometry.attributes['position'].needsUpdate = true;
  }

  private animate = (): void => {
    this.animFrameId = requestAnimationFrame(this.animate);
    this.frameCount++;

    // Rotate icosahedra
    this.icoMesh.rotation.x += 0.0018;
    this.icoMesh.rotation.y += 0.0025;
    const inner = (this.icoMesh as any)._inner as THREE.LineSegments;
    if (inner) {
      inner.rotation.x -= 0.003;
      inner.rotation.y += 0.004;
      inner.rotation.z += 0.001;
    }

    // Particle physics
    this.updateParticles();

    // Lines update every 4 frames
    if (this.frameCount % 4 === 0) {
      this.updateLines();
    }

    // Camera parallax (smooth lerp)
    this.camTargetX += (this.mouseX * 18 - this.camTargetX) * 0.04;
    this.camTargetY += (-this.mouseY * 10 - this.camTargetY) * 0.04;
    this.camera.position.x = this.camTargetX;
    this.camera.position.y = this.camTargetY;
    this.camera.lookAt(0, 0, 0);

    this.renderer.render(this.scene, this.camera);
  };

  private onResize(): void {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }
}
