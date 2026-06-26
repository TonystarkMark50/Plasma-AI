import React, { useRef, useEffect } from 'react';

const C = {
  forsythia: '#FFC801',
  deep:      '#FF9932',
  mint:      '#6ECBCA',
  white:     '#FFFFFF',
};

function rand(lo, hi) { return lo + Math.random() * (hi - lo); }

function createNodes(W, H) {
  const count = Math.max(22, Math.min(55, Math.floor((W * H) / 14000)));
  return Array.from({ length: count }, (_, i) => ({
    x:     rand(0.04 * W, 0.96 * W),
    y:     rand(0.06 * H, 0.94 * H),
    vx:    rand(-0.06, 0.06),
    vy:    rand(-0.06, 0.06),
    r:     rand(3, 5.5),
    hub:   i < Math.ceil(count * 0.18),
    phase: rand(0, Math.PI * 2),
    freq:  rand(0.012, 0.026),
    color: Math.random() < 0.55 ? C.mint : C.forsythia,
  }));
}

function createPackets(nodes, edges) {
  if (!edges.length) return [];
  return Array.from({ length: 20 }, () => ({
    edge:  edges[Math.floor(Math.random() * edges.length)],
    t:     rand(0, 1),
    speed: rand(0.0008, 0.0022),
  }));
}

export default function NeuralNetworkScene() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const mouse = { x: 0.5, y: 0.5 };
    const smooth = { x: 0.5, y: 0.5 };
    let state = null;
    let raf = null;
    let hidden = false;

    const DIST = (W, H) => Math.min(W, H) * 0.24;

    function build() {
      const W = canvas.width  = canvas.offsetWidth;
      const H = canvas.height = canvas.offsetHeight;
      const nodes = createNodes(W, H);
      nodes.forEach(n => { if (n.hub) n.r = rand(5.5, 9); });
      const dist  = DIST(W, H);
      const edges = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          if (dx * dx + dy * dy < dist * dist) edges.push([i, j]);
        }
      }
      const packets = createPackets(nodes, edges);
      state = { W, H, nodes, edges, packets, dist };
    }

    const onMouse = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) / r.width;
      mouse.y = (e.clientY - r.top)  / r.height;
    };
    const onVis = () => { hidden = document.hidden; };

    window.addEventListener('mousemove', onMouse, { passive: true });
    document.addEventListener('visibilitychange', onVis);

    const ro = new ResizeObserver(build);
    ro.observe(canvas);
    build();

    let prev = performance.now();
    function tick(now) {
      raf = requestAnimationFrame(tick);
      if (hidden) return;

      const dt = Math.min(now - prev, 32);
      prev = now;

      if (!state) return;
      const { W, H, nodes, edges, packets, dist } = state;

      smooth.x += (mouse.x - smooth.x) * 0.05;
      smooth.y += (mouse.y - smooth.y) * 0.05;
      const px = (smooth.x - 0.5) * 22;
      const py = (smooth.y - 0.5) * 12;

      ctx.clearRect(0, 0, W, H);

      /* ── move nodes ── */
      nodes.forEach(n => {
        n.x += n.vx * (dt / 16);
        n.y += n.vy * (dt / 16);
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        n.phase += n.freq * (dt / 16);
      });

      /* ── draw edges ── */
      edges.forEach(([i, j]) => {
        const a = nodes[i], b = nodes[j];
        const ax = a.x + px * (a.r * 0.14);
        const ay = a.y + py * (a.r * 0.09);
        const bx = b.x + px * (b.r * 0.14);
        const by = b.y + py * (b.r * 0.09);
        const d  = Math.hypot(ax - bx, ay - by);
        const alpha = Math.max(0, 1 - d / dist);
        const hub   = a.hub || b.hub;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.strokeStyle = hub
          ? `rgba(255,200,1,${alpha * 0.38})`
          : `rgba(110,203,202,${alpha * 0.16})`;
        ctx.lineWidth = hub ? 0.9 : 0.5;
        ctx.stroke();
      });

      /* ── draw packets ── */
      packets.forEach(p => {
        p.t += p.speed * (dt / 16);
        if (p.t >= 1) {
          p.t = 0;
          p.edge  = edges[Math.floor(Math.random() * edges.length)];
          p.speed = rand(0.0008, 0.0022);
        }
        const [i, j] = p.edge;
        const a = nodes[i], b = nodes[j];
        const ax = a.x + px * (a.r * 0.14);
        const ay = a.y + py * (a.r * 0.09);
        const bx = b.x + px * (b.r * 0.14);
        const by = b.y + py * (b.r * 0.09);
        const cx2 = ax + (bx - ax) * p.t;
        const cy2 = ay + (by - ay) * p.t;
        const alpha = Math.sin(p.t * Math.PI);

        /* glow halo */
        const g = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, 7);
        g.addColorStop(0, `rgba(255,200,1,${alpha * 0.7})`);
        g.addColorStop(1, 'rgba(255,200,1,0)');
        ctx.beginPath();
        ctx.arc(cx2, cy2, 7, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        /* bright core */
        ctx.beginPath();
        ctx.arc(cx2, cy2, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha * 0.9})`;
        ctx.fill();
      });

      /* ── draw nodes ── */
      nodes.forEach(n => {
        const nx = n.x + px * (n.r * 0.14);
        const ny = n.y + py * (n.r * 0.09);
        const pulse = n.r + (n.hub ? Math.sin(n.phase) * 2.5 : 0);

        if (n.hub) {
          /* outer ring */
          ctx.beginPath();
          ctx.arc(nx, ny, pulse + 6, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255,200,1,${0.10 + Math.sin(n.phase) * 0.05})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          /* mid ring */
          ctx.beginPath();
          ctx.arc(nx, ny, pulse + 11, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255,153,50,0.055)`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }

        /* glow fill */
        const g2 = ctx.createRadialGradient(nx, ny, 0, nx, ny, pulse * 3);
        if (n.hub) {
          g2.addColorStop(0, 'rgba(255,153,50,0.85)');
          g2.addColorStop(0.5, 'rgba(255,200,1,0.4)');
          g2.addColorStop(1, 'rgba(255,200,1,0)');
        } else {
          g2.addColorStop(0, 'rgba(110,203,202,0.75)');
          g2.addColorStop(1, 'rgba(110,203,202,0)');
        }
        ctx.beginPath();
        ctx.arc(nx, ny, pulse * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = g2;
        ctx.fill();

        /* solid dot */
        ctx.beginPath();
        ctx.arc(nx, ny, pulse, 0, Math.PI * 2);
        ctx.fillStyle = n.hub ? C.deep : n.color;
        ctx.fill();

        /* bright highlight */
        ctx.beginPath();
        ctx.arc(nx - pulse * 0.28, ny - pulse * 0.28, pulse * 0.32, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.35)';
        ctx.fill();
      });
    }

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouse);
      document.removeEventListener('visibilitychange', onVis);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}
