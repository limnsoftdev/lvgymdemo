import { useEffect, useRef } from 'react';

// Lightweight takes on popular component-library backgrounds (aurora, beams,
// particles, grid, meteors, spotlight), built without extra dependencies and
// tuned to the site's ocean palette. `animate` false renders a still frame.

export function Aurora({ animate }) {
  return (
    <div className={`bgx-aurora${animate ? '' : ' is-still'}`}>
      <span /><span /><span />
    </div>
  );
}

export function RetroGrid({ animate }) {
  return (
    <div className={`bgx-grid${animate ? '' : ' is-still'}`}>
      <div className="bgx-grid-plane" />
    </div>
  );
}

export function Meteors({ animate }) {
  const meteors = Array.from({ length: 14 }, (_, i) => ({
    left: `${(i * 37) % 100}%`,
    delay: `${(i * 1.7) % 9}s`,
    duration: `${6 + (i % 5)}s`,
  }));
  return (
    <div className={`bgx-meteors${animate ? '' : ' is-still'}`}>
      {meteors.map((m, i) => (
        <span key={i} style={{ left: m.left, animationDelay: m.delay, animationDuration: m.duration }} />
      ))}
    </div>
  );
}

export function Spotlight() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    function move(e) {
      el.style.setProperty('--x', `${e.clientX}px`);
      el.style.setProperty('--y', `${e.clientY}px`);
    }
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);
  return <div ref={ref} className="bgx-spotlight" />;
}

// Shared canvas loop for the two canvas-drawn backgrounds.
function useCanvas(draw, animate) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const state = { w: 0, h: 0, t: 0, mouse: { x: -9999, y: -9999 } };
    let raf = 0;

    function resize() {
      state.w = canvas.clientWidth;
      state.h = canvas.clientHeight;
      canvas.width = state.w * dpr;
      canvas.height = state.h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      state.init = false;
    }
    function frame(time) {
      state.t = time / 1000;
      draw(ctx, state);
      if (animate) raf = requestAnimationFrame(frame);
    }
    function move(e) {
      state.mouse.x = e.clientX;
      state.mouse.y = e.clientY;
    }

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', move, { passive: true });
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', move);
    };
  }, [draw, animate]);
  return ref;
}

function drawParticles(ctx, s) {
  if (!s.init) {
    const count = Math.round((s.w * s.h) / 9000);
    s.dots = Array.from({ length: count }, () => ({
      x: Math.random() * s.w,
      y: Math.random() * s.h,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      r: Math.random() * 1.3 + 0.3,
      a: Math.random() * 0.5 + 0.15,
    }));
    s.init = true;
  }
  ctx.clearRect(0, 0, s.w, s.h);
  for (const d of s.dots) {
    // drift, and ease away from the cursor
    const dx = d.x - s.mouse.x;
    const dy = d.y - s.mouse.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 120 && dist > 0) {
      d.x += (dx / dist) * 0.8;
      d.y += (dy / dist) * 0.8;
    }
    d.x = (d.x + d.vx + s.w) % s.w;
    d.y = (d.y + d.vy + s.h) % s.h;
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(120, 200, 212, ${d.a})`;
    ctx.fill();
  }
}

function drawBeams(ctx, s) {
  if (!s.init) {
    s.beams = Array.from({ length: 9 }, (_, i) => ({
      offset: (i / 9) * 1.6 - 0.3,
      speed: 0.04 + Math.random() * 0.05,
      phase: Math.random(),
      len: 0.15 + Math.random() * 0.2,
    }));
    s.init = true;
  }
  ctx.clearRect(0, 0, s.w, s.h);
  const diag = Math.hypot(s.w, s.h);
  for (const b of s.beams) {
    // each beam is a faint diagonal track with a brighter streak travelling along it
    const x0 = b.offset * s.w;
    const x1 = x0 + s.h * 0.6;
    ctx.strokeStyle = 'rgba(120, 200, 212, 0.05)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x0, 0);
    ctx.lineTo(x1, s.h);
    ctx.stroke();

    const p = (b.phase + s.t * b.speed) % 1.4 - 0.2;
    const hx = x0 + (x1 - x0) * p;
    const hy = s.h * p;
    const tail = (b.len * diag) / Math.hypot(x1 - x0, s.h);
    const tx = hx - (x1 - x0) * tail;
    const ty = hy - s.h * tail;
    const g = ctx.createLinearGradient(tx, ty, hx, hy);
    g.addColorStop(0, 'rgba(120, 200, 212, 0)');
    g.addColorStop(1, 'rgba(190, 236, 242, 0.3)');
    ctx.strokeStyle = g;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(tx, ty);
    ctx.lineTo(hx, hy);
    ctx.stroke();
  }
}

export function Particles({ animate }) {
  const ref = useCanvas(drawParticles, animate);
  return <canvas ref={ref} className="bgx-canvas" />;
}

export function Beams({ animate }) {
  const ref = useCanvas(drawBeams, animate);
  return <canvas ref={ref} className="bgx-canvas" />;
}
