import React, { useRef, useEffect, useState, useCallback } from 'react';

/* ─── Injected keyframe animations ───────────────────────────────── */
const KEYFRAMES = `
@keyframes holo-float   { 0%,100%{transform:translateY(0) rotateX(0)} 50%{transform:translateY(-10px) rotateX(1.5deg)} }
@keyframes orb-pulse    { 0%,100%{opacity:.55;transform:scale(1)} 50%{opacity:1;transform:scale(1.1)} }
@keyframes ring-cw      { to{transform:rotate(360deg)} }
@keyframes ring-ccw     { to{transform:rotate(-360deg)} }
@keyframes scan-line    { 0%{top:0%;opacity:0} 8%{opacity:.5} 92%{opacity:.35} 100%{top:100%;opacity:0} }
@keyframes dot-pulse    { 0%,100%{opacity:1;box-shadow:0 0 5px currentColor} 50%{opacity:.5;box-shadow:0 0 12px currentColor} }
@keyframes packet-flow  { 0%{left:-4%;opacity:0} 5%{opacity:1} 95%{opacity:1} 100%{left:104%;opacity:0} }
@keyframes node-ping    { 0%{transform:scale(1);opacity:.8} 100%{transform:scale(2.6);opacity:0} }
@keyframes bar-rise     { from{transform:scaleY(0)} }
@keyframes num-tick     { from{opacity:.3} to{opacity:1} }
@keyframes border-glow  { 0%,100%{border-color:rgba(0,229,255,.12)} 50%{border-color:rgba(0,229,255,.32)} }
@keyframes wave-move    { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
`;

/* ─── Glass panel style ───────────────────────────────────────────── */
const glass = (extra = {}) => ({
  background:    'rgba(8,16,31,0.62)',
  backdropFilter:'blur(14px) saturate(1.4)',
  WebkitBackdropFilter:'blur(14px) saturate(1.4)',
  border:        '1px solid rgba(0,229,255,0.15)',
  borderRadius:  12,
  padding:       '10px 13px',
  animation:     'border-glow 4s ease-in-out infinite',
  position:      'relative',
  overflow:      'hidden',
  ...extra,
});

/* ─── Scan-line overlay ───────────────────────────────────────────── */
function ScanLine({ duration = '3.2s', delay = '0s' }) {
  return (
    <div style={{
      position:'absolute', left:0, right:0, height:2,
      background:'linear-gradient(90deg,transparent,rgba(0,229,255,.45),transparent)',
      animation:`scan-line ${duration} linear ${delay} infinite`,
      pointerEvents:'none', zIndex:10,
    }} />
  );
}

/* ─── Status dot ──────────────────────────────────────────────────── */
function Dot({ color, delay = '0s' }) {
  return (
    <span style={{
      display:'inline-block', width:7, height:7, borderRadius:'50%',
      background:color, color,
      animation:`dot-pulse 1.8s ease-in-out ${delay} infinite`, flexShrink:0,
    }} />
  );
}

/* ─── Central AI Orb ──────────────────────────────────────────────── */
function AIOrb() {
  const rings = [
    { sz:100, brd:'rgba(0,229,255,.22)', spd:'6s', dir:'ring-cw'  },
    { sz:80,  brd:'rgba(168,85,247,.28)', spd:'9s', dir:'ring-ccw' },
    { sz:60,  brd:'rgba(255,200,1,.22)', spd:'13s', dir:'ring-cw' },
  ];
  return (
    <div style={{ position:'relative', width:120, height:120, margin:'0 auto' }}>
      {/* Glow halo */}
      <div style={{
        position:'absolute', inset:-22,
        background:'radial-gradient(circle,rgba(168,85,247,.18) 0%,transparent 70%)',
        borderRadius:'50%', animation:'orb-pulse 3s ease-in-out infinite',
      }} />
      {/* Rings */}
      {rings.map((r,i) => (
        <div key={i} style={{
          position:'absolute',
          top:(120-r.sz)/2, left:(120-r.sz)/2,
          width:r.sz, height:r.sz, borderRadius:'50%',
          border:`1px solid ${r.brd}`,
          animation:`${r.dir} ${r.spd} linear infinite`,
        }} />
      ))}
      {/* Core orb */}
      <div style={{
        position:'absolute', top:32, left:32, width:56, height:56,
        borderRadius:'50%',
        background:'radial-gradient(circle at 38% 38%, rgba(0,229,255,.9), rgba(168,85,247,.7) 60%, rgba(255,200,1,.4))',
        boxShadow:'0 0 28px rgba(0,229,255,.5), 0 0 60px rgba(168,85,247,.3)',
        animation:'orb-pulse 2.4s ease-in-out infinite',
      }} />
      {/* Ping ring */}
      <div style={{
        position:'absolute', top:32, left:32, width:56, height:56,
        borderRadius:'50%',
        border:'2px solid rgba(0,229,255,.55)',
        animation:'node-ping 2s ease-out infinite',
      }} />
    </div>
  );
}

/* ─── Mini bar chart ──────────────────────────────────────────────── */
function MiniBarChart() {
  const bars = [55,72,48,88,65,91,79,60,95,84];
  return (
    <div style={{ display:'flex', gap:3, alignItems:'flex-end', height:32 }}>
      {bars.map((h,i) => (
        <div key={i} style={{
          flex:1, borderRadius:2,
          background:`linear-gradient(to top, rgba(0,229,255,.8), rgba(168,85,247,.5))`,
          height:`${h}%`,
          transformOrigin:'bottom',
          animation:`bar-rise .6s ${i*0.07}s ease-out both`,
        }} />
      ))}
    </div>
  );
}

/* ─── SVG wave sparkline ──────────────────────────────────────────── */
function Sparkline() {
  const pts = 'M0,22 C14,10 28,30 42,18 C56,6 70,26 84,14 C98,2 112,22 126,12 C140,2 154,22 168,14 C182,6 196,20 210,10 C224,0 238,18 252,10';
  return (
    <svg width="100%" height="32" viewBox="0 0 252 32" style={{ overflow:'visible' }}>
      <defs>
        <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(0,229,255,.35)" />
          <stop offset="100%" stopColor="rgba(0,229,255,0)" />
        </linearGradient>
      </defs>
      <path d={pts} fill="none" stroke="rgba(0,229,255,.7)" strokeWidth="1.5" />
      <path d={`${pts} L252,32 L0,32 Z`} fill="url(#wg)" />
    </svg>
  );
}

/* ─── Pipeline nodes ──────────────────────────────────────────────── */
const PIPELINE = [
  { label:'Lead',     color:'#00E5FF' },
  { label:'AI',       color:'#A855F7' },
  { label:'CRM',      color:'#FFC801' },
  { label:'Email',    color:'#00FF9D' },
  { label:'Done',     color:'#6ECBCA' },
];
function PipelineNode({ label, color, i }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:0 }}>
      <div style={{ textAlign:'center' }}>
        <div style={{
          position:'relative', width:30, height:30, borderRadius:'50%',
          background:`radial-gradient(circle, ${color}33, ${color}11)`,
          border:`1.5px solid ${color}`,
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          <div style={{ width:8, height:8, borderRadius:'50%', background:color,
            boxShadow:`0 0 8px ${color}` }} />
          {/* Ping */}
          <div style={{
            position:'absolute', inset:-1, borderRadius:'50%',
            border:`1.5px solid ${color}`,
            animation:`node-ping 2.4s ${i*0.5}s ease-out infinite`,
          }} />
        </div>
        <p style={{ fontSize:8, color:'rgba(255,255,255,.55)', marginTop:3, whiteSpace:'nowrap' }}>{label}</p>
      </div>
      {i < PIPELINE.length - 1 && (
        <div style={{ position:'relative', width:24, height:4, margin:'0 2px', marginBottom:14 }}>
          <div style={{
            width:'100%', height:1, background:'rgba(0,229,255,.2)',
            position:'absolute', top:'50%',
          }} />
          <div style={{
            position:'absolute', top:'50%', transform:'translateY(-50%)',
            width:5, height:5, borderRadius:'50%', background:'#00E5FF',
            boxShadow:'0 0 6px #00E5FF',
            animation:`packet-flow 2.2s ${i*0.7}s linear infinite`,
          }} />
        </div>
      )}
    </div>
  );
}

/* ─── Circular progress ───────────────────────────────────────────── */
function CircleProgress({ pct, color, size = 44, label }) {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <div style={{ position:'relative', width:size, height:size }}>
      <svg width={size} height={size} style={{ transform:'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth={4} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={4}
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
      </svg>
      <div style={{
        position:'absolute', inset:0, display:'flex', alignItems:'center',
        justifyContent:'center', flexDirection:'column',
      }}>
        <span style={{ fontSize:10, fontWeight:700, color, lineHeight:1 }}>{pct}%</span>
        {label && <span style={{ fontSize:6, color:'rgba(255,255,255,.45)', marginTop:1 }}>{label}</span>}
      </div>
    </div>
  );
}

/* ─── Canvas particle field ───────────────────────────────────────── */
function ParticleCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const N = 60;
    const pts = Array.from({ length:N }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random()-.5)*0.03, vy: (Math.random()-.5)*0.03,
    }));

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0,0,W,H);
      pts.forEach(p => {
        p.x += p.vx/100; p.y += p.vy/100;
        if (p.x<0||p.x>1) p.vx*=-1;
        if (p.y<0||p.y>1) p.vy*=-1;
        const px = p.x*W, py = p.y*H;
        ctx.beginPath(); ctx.arc(px,py,1.2,0,Math.PI*2);
        ctx.fillStyle='rgba(0,229,255,.25)'; ctx.fill();
      });
      for(let i=0;i<N;i++){
        for(let j=i+1;j<N;j++){
          const dx=(pts[i].x-pts[j].x)*W, dy=(pts[i].y-pts[j].y)*H;
          const d=Math.hypot(dx,dy);
          if(d<90){
            ctx.beginPath();
            ctx.moveTo(pts[i].x*W,pts[i].y*H);
            ctx.lineTo(pts[j].x*W,pts[j].y*H);
            ctx.strokeStyle=`rgba(0,229,255,${.12*(1-d/90)})`;
            ctx.lineWidth=.5; ctx.stroke();
          }
        }
      }
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return <canvas ref={ref} aria-hidden="true"
    style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }} />;
}

/* ─── Main dashboard ──────────────────────────────────────────────── */
const AGENTS = [
  { name:'Neural Processing', pct:'98%',  color:'#00E5FF', status:'Active'     },
  { name:'Workflow Engine',   pct:'–',    color:'#A855F7', status:'Running'    },
  { name:'Email Automation',  pct:'–',    color:'#00FF9D', status:'Connected'  },
  { name:'CRM Sync',          pct:'–',    color:'#FFC801', status:'Online'     },
  { name:'Lead Qualification',pct:'–',    color:'#6ECBCA', status:'Running'    },
];
const STATUS_COLOR = { Active:'#00FF9D', Running:'#00E5FF', Connected:'#A855F7', Online:'#FFC801' };

export default function NeuralNetworkScene() {
  const dashRef = useRef(null);
  const [tilt, setTilt] = useState({ rx:0, ry:0 });

  /* inject keyframes once */
  useEffect(() => {
    if (document.getElementById('holo-kf')) return;
    const s = document.createElement('style');
    s.id = 'holo-kf'; s.textContent = KEYFRAMES;
    document.head.appendChild(s);
    return () => s.remove();
  }, []);

  /* mouse tilt */
  const onMouseMove = useCallback((e) => {
    const el = dashRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const mx = (e.clientX - r.left) / r.width  - 0.5;
    const my = (e.clientY - r.top)  / r.height - 0.5;
    setTilt({ rx: -my * 10, ry: mx * 14 });
  }, []);
  const onMouseLeave = useCallback(() => setTilt({ rx:0, ry:0 }), []);

  const label  = { fontSize:9,  color:'rgba(255,255,255,.42)', fontFamily:'monospace', letterSpacing:1, textTransform:'uppercase' };
  const value  = { fontSize:13, color:'#fff', fontWeight:700, fontFamily:'monospace' };
  const accent = { fontSize:8,  color:'#00E5FF', fontFamily:'monospace' };

  return (
    <div ref={dashRef} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
      aria-hidden="true"
      style={{
        position:'absolute', inset:0, perspective:900,
        display:'flex', alignItems:'center', justifyContent:'center',
      }}
    >
      {/* Particle canvas background */}
      <ParticleCanvas />

      {/* Floating dashboard group */}
      <div style={{
        position:'relative', width:'100%', height:'100%',
        animation:'holo-float 7s ease-in-out infinite',
        transform:`rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition:'transform .12s ease-out',
        transformStyle:'preserve-3d',
        display:'grid',
        gridTemplateColumns:'1fr 1fr',
        gridTemplateRows:'auto auto auto',
        gap:9, padding:16,
        boxSizing:'border-box',
      }}>

        {/* ── Panel 1: AI Orb + title ── */}
        <div style={glass({ gridColumn:'1/2', display:'flex', flexDirection:'column', alignItems:'center', gap:8, padding:'14px 12px' })}>
          <ScanLine duration="3.5s" />
          <p style={{ ...label, marginBottom:2 }}>PLASMA CORE</p>
          <AIOrb />
          <div style={{ display:'flex', gap:8, marginTop:4 }}>
            <CircleProgress pct={98} color="#00E5FF" label="CPU" />
            <CircleProgress pct={73} color="#A855F7" label="MEM" />
            <CircleProgress pct={91} color="#FFC801" label="GPU" />
          </div>
        </div>

        {/* ── Panel 2: Agent Status ── */}
        <div style={glass({ gridColumn:'2/3', display:'flex', flexDirection:'column', gap:6 })}>
          <ScanLine duration="4.1s" delay=".8s" />
          <p style={label}>AI AGENTS</p>
          {AGENTS.map((a,i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:5 }}>
              <div style={{ display:'flex', alignItems:'center', gap:5, minWidth:0 }}>
                <Dot color={a.color} delay={`${i*0.3}s`} />
                <span style={{ fontSize:9, color:'rgba(255,255,255,.7)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{a.name}</span>
              </div>
              <span style={{ fontSize:8, color:STATUS_COLOR[a.status], fontFamily:'monospace', flexShrink:0 }}>{a.status}</span>
            </div>
          ))}

          {/* KPI row */}
          <div style={{ display:'flex', gap:6, marginTop:4, borderTop:'1px solid rgba(255,255,255,.06)', paddingTop:6 }}>
            {[['2.3M','Tasks/day'],['99.9%','Uptime'],['140ms','Latency']].map(([v,l])=>(
              <div key={l} style={{ flex:1, textAlign:'center' }}>
                <p style={{ ...value, fontSize:11, color:'#FFC801', animation:'num-tick .4s ease infinite alternate' }}>{v}</p>
                <p style={{ ...label, fontSize:7 }}>{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Panel 3: Neural Activity graph ── */}
        <div style={glass({ gridColumn:'1/2', display:'flex', flexDirection:'column', gap:5 })}>
          <ScanLine duration="5s" delay="1.4s" />
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <p style={label}>NEURAL ACTIVITY</p>
            <span style={{ ...accent, fontSize:7 }}>LIVE ●</span>
          </div>
          <Sparkline />
          <MiniBarChart />
          <p style={{ ...label, fontSize:7, textAlign:'right', marginTop:2 }}>Throughput: 98.3k ops/s</p>
        </div>

        {/* ── Panel 4: Workflow pipeline ── */}
        <div style={glass({ gridColumn:'2/3', display:'flex', flexDirection:'column', gap:8 })}>
          <ScanLine duration="3.8s" delay="2s" />
          <p style={label}>WORKFLOW PIPELINE</p>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', overflow:'hidden' }}>
            {PIPELINE.map((n,i) => <PipelineNode key={i} {...n} i={i} />)}
          </div>

          {/* Activity log */}
          <div style={{ borderTop:'1px solid rgba(255,255,255,.06)', paddingTop:7, display:'flex', flexDirection:'column', gap:4 }}>
            {[
              ['✓','Lead scored: 94pts','#00FF9D'],
              ['↗','CRM record updated','#00E5FF'],
              ['◉','Email sequence triggered','#A855F7'],
            ].map(([icon,msg,col],i)=>(
              <div key={i} style={{ display:'flex', gap:5, alignItems:'center' }}>
                <span style={{ fontSize:8, color:col }}>{icon}</span>
                <span style={{ fontSize:8, color:'rgba(255,255,255,.5)' }}>{msg}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
