import React, { useRef, useEffect, useState, useCallback } from 'react';

/* ─── CSS Keyframes ──────────────────────────────────────────────────── */
const KFID = 'ai-factory-kf';
const KF = `
@keyframes aif-0{0%,100%{transform:translateY(0px)}   50%{transform:translateY(-6px)}}
@keyframes aif-1{0%,100%{transform:translateY(-3px)}  50%{transform:translateY( 5px)}}
@keyframes aif-2{0%,100%{transform:translateY( 2px)}  50%{transform:translateY(-5px)}}
@keyframes aif-3{0%,100%{transform:translateY(-5px)}  50%{transform:translateY( 5px)}}
@keyframes aif-4{0%,100%{transform:translateY( 1px)}  50%{transform:translateY(-5px)}}
@keyframes aif-5{0%,100%{transform:translateY( 4px)}  50%{transform:translateY(-4px)}}
@keyframes aif-6{0%,100%{transform:translateY(-2px)}  50%{transform:translateY( 4px)}}
@keyframes aif-ping  {0%{transform:scale(1);opacity:.7}  100%{transform:scale(2.9);opacity:0}}
@keyframes aif-scan  {0%{top:-1%;opacity:0} 8%{opacity:.32} 92%{opacity:.18} 100%{top:101%;opacity:0}}
@keyframes aif-spin  {to{transform:rotate(360deg)}}
@keyframes aif-pulse {0%,100%{opacity:.65;box-shadow:0 0 4px currentColor} 50%{opacity:1;box-shadow:0 0 11px currentColor}}
@keyframes aif-bar   {from{width:0}}
`;

/* ─── Data ────────────────────────────────────────────────────────────── */
const NODES = [
  { id:0, label:'REQUEST',     sub:'User Input',     px:.500, py:.065, color:'#00E5FF' },
  { id:1, label:'REASONING',   sub:'LLM Agent',      px:.165, py:.285, color:'#3B82F6' },
  { id:2, label:'DATA FETCH',  sub:'RAG + Search',   px:.835, py:.285, color:'#A855F7' },
  { id:3, label:'ANALYSIS',    sub:'Core Engine',    px:.500, py:.500, color:'#8B5CF6', hub:true },
  { id:4, label:'DECISION',    sub:'Policy Engine',  px:.165, py:.715, color:'#6366F1' },
  { id:5, label:'AUTOMATION',  sub:'Action Engine',  px:.835, py:.715, color:'#10B981' },
  { id:6, label:'REPORTING',   sub:'Output Layer',   px:.500, py:.895, color:'#F59E0B' },
];
const EDGES = [
  {s:0,e:1},{s:0,e:2},
  {s:1,e:3},{s:2,e:3},
  {s:3,e:4},{s:3,e:5},
  {s:4,e:6},{s:5,e:6},
];

/* ─── Helpers ────────────────────────────────────────────────────────── */
function ha(hex, a) {
  const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${a})`;
}
function cp(ax,ay,bx,by,W,H){
  const mx=(ax+bx)/2, my=(ay+by)/2;
  const dx=mx-W*.5, dy=my-H*.5;
  const len=Math.hypot(dx,dy)||1;
  const push=Math.min(W,H)*.12;
  return { cpx:mx+dx/len*push, cpy:my+dy/len*push };
}
function bpt(ax,ay,cpx,cpy,bx,by,t){
  const mt=1-t;
  return { x:mt*mt*ax+2*mt*t*cpx+t*t*bx, y:mt*mt*ay+2*mt*t*cpy+t*t*by };
}

/* ─── Canvas layer ───────────────────────────────────────────────────── */
function SceneCanvas() {
  const cvs = useRef(null);
  const pkts = useRef(
    EDGES.flatMap((e,i) =>
      [0, .34, .67].map(off => ({ ei:i, t:off, spd:.0011+(i%4)*.0003 }))
    )
  );
  const stars = useRef(
    Array.from({length:80}, () => ({
      x:Math.random(), y:Math.random(),
      r:Math.random()*.75+.25, vy:(Math.random()*.04+.01)*1e-4,
    }))
  );

  useEffect(() => {
    const c = cvs.current; if (!c) return;
    const ctx = c.getContext('2d');
    let raf;
    const resize = () => { c.width=c.offsetWidth; c.height=c.offsetHeight; };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(c);
    let prev = performance.now();

    const draw = now => {
      raf = requestAnimationFrame(draw);
      const dt = Math.min(now-prev,32); prev=now;
      const W=c.width, H=c.height;
      ctx.clearRect(0,0,W,H);

      /* Background */
      const bg = ctx.createRadialGradient(W*.5,H*.44,0,W*.5,H*.44,W*.76);
      bg.addColorStop(0,'rgba(18,10,44,1)');
      bg.addColorStop(1,'rgba(4,6,20,1)');
      ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);

      /* Hub volumetric glow */
      const hx=NODES[3].px*W, hy=NODES[3].py*H;
      const hg=ctx.createRadialGradient(hx,hy,0,hx,hy,W*.42);
      hg.addColorStop(0,'rgba(139,92,246,.14)');
      hg.addColorStop(1,'rgba(139,92,246,0)');
      ctx.fillStyle=hg; ctx.fillRect(0,0,W,H);

      /* Stars */
      stars.current.forEach(s => {
        s.y += s.vy*dt; if(s.y>1) s.y=0;
        ctx.beginPath(); ctx.arc(s.x*W,s.y*H,s.r,0,Math.PI*2);
        ctx.fillStyle='rgba(200,220,255,.22)'; ctx.fill();
      });

      const pos = NODES.map(n=>({x:n.px*W,y:n.py*H}));

      /* Per-node ambient halo */
      NODES.forEach((n,i) => {
        const p=pos[i], r=(n.hub?W*.18:W*.13);
        const ng=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,r);
        ng.addColorStop(0,ha(n.color,.07)); ng.addColorStop(1,ha(n.color,0));
        ctx.fillStyle=ng; ctx.fillRect(0,0,W,H);
      });

      /* Edges */
      EDGES.forEach(e => {
        const a=pos[e.s], b=pos[e.e];
        const {cpx,cpy}=cp(a.x,a.y,b.x,b.y,W,H);
        const col=NODES[e.s].color;
        ctx.save();
        ctx.shadowColor=col; ctx.shadowBlur=12;
        ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.quadraticCurveTo(cpx,cpy,b.x,b.y);
        ctx.strokeStyle=ha(col,.24); ctx.lineWidth=2.5; ctx.stroke();
        ctx.restore();
        ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.quadraticCurveTo(cpx,cpy,b.x,b.y);
        ctx.strokeStyle=ha(col,.55); ctx.lineWidth=.85; ctx.stroke();
      });

      /* Data packets */
      pkts.current.forEach(p => {
        p.t += p.spd*(dt/16); if(p.t>=1) p.t-=1;
        const e=EDGES[p.ei];
        const a=pos[e.s], b=pos[e.e];
        const {cpx,cpy}=cp(a.x,a.y,b.x,b.y,W,H);
        const pt=bpt(a.x,a.y,cpx,cpy,b.x,b.y,p.t);
        const col=NODES[e.s].color;
        const alpha=Math.sin(p.t*Math.PI);
        const pr=W*.019;
        const pg=ctx.createRadialGradient(pt.x,pt.y,0,pt.x,pt.y,pr);
        pg.addColorStop(0,ha(col,alpha)); pg.addColorStop(1,ha(col,0));
        ctx.beginPath(); ctx.arc(pt.x,pt.y,pr,0,Math.PI*2);
        ctx.fillStyle=pg; ctx.fill();
        ctx.beginPath(); ctx.arc(pt.x,pt.y,pr*.28,0,Math.PI*2);
        ctx.fillStyle=`rgba(255,255,255,${alpha*.85})`; ctx.fill();
      });

      /* Node rings */
      NODES.forEach((n,i) => {
        const p=pos[i], r=(n.hub?W*.056:W*.038);
        ctx.beginPath(); ctx.arc(p.x,p.y,r,0,Math.PI*2);
        ctx.strokeStyle=ha(n.color,.5); ctx.lineWidth=1; ctx.stroke();
        if(n.hub){
          ctx.beginPath(); ctx.arc(p.x,p.y,r*1.55,0,Math.PI*2);
          ctx.strokeStyle=ha(n.color,.14); ctx.lineWidth=.6; ctx.stroke();
        }
      });
    };

    raf=requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <canvas ref={cvs} aria-hidden="true"
      style={{ position:'absolute', inset:0, width:'100%', height:'100%', display:'block' }} />
  );
}

/* ─── Glassmorphic node card ─────────────────────────────────────────── */
function NodeCard({ node, tilt }) {
  const isHub = node.hub;
  const w = isHub ? 132 : 108;
  return (
    <div style={{
      position:'absolute',
      left:`${node.px*100}%`, top:`${node.py*100}%`,
      transform:`translate(-50%,-50%) translateX(${tilt.x*.45}px) translateY(${tilt.y*.35}px)`,
      width:w,
      background:'rgba(5,7,22,0.84)',
      backdropFilter:'blur(14px) saturate(1.4)',
      WebkitBackdropFilter:'blur(14px) saturate(1.4)',
      border:`1px solid ${ha(node.color,.3)}`,
      borderRadius:isHub?13:10,
      padding:isHub?'11px 14px':'7px 11px',
      boxShadow:`0 0 28px ${ha(node.color,.11)},inset 0 1px 0 rgba(255,255,255,.07)`,
      animation:`aif-${node.id} ${4.2+node.id*.65}s ease-in-out infinite`,
      overflow:'hidden',
      zIndex:2,
      transition:'transform .1s ease-out',
    }}>
      {/* Horizontal scan line */}
      <div aria-hidden="true" style={{
        position:'absolute', left:0, right:0, height:1,
        background:`linear-gradient(90deg,transparent,${ha(node.color,.52)},transparent)`,
        animation:`aif-scan ${3.2+node.id*.42}s linear ${node.id*.28}s infinite`,
        pointerEvents:'none',
      }}/>
      {/* Corner bracket TL */}
      <div style={{
        position:'absolute', top:0, left:0,
        width:isHub?18:14, height:isHub?18:14,
        borderTop:`2px solid ${ha(node.color,.75)}`,
        borderLeft:`2px solid ${ha(node.color,.75)}`,
        borderTopLeftRadius:isHub?13:10,
      }}/>
      {/* Corner bracket BR */}
      <div style={{
        position:'absolute', bottom:0, right:0,
        width:isHub?14:10, height:isHub?14:10,
        borderBottom:`1.5px solid ${ha(node.color,.4)}`,
        borderRight:`1.5px solid ${ha(node.color,.4)}`,
        borderBottomRightRadius:isHub?13:10,
      }}/>
      {/* Status dot */}
      <div style={{
        position:'absolute', top:7, right:8, width:5, height:5,
        borderRadius:'50%', background:node.color, color:node.color,
        animation:'aif-pulse 1.7s ease-in-out infinite',
      }}/>
      {/* Label */}
      <p style={{
        fontSize:isHub?9:7.5,
        fontFamily:'JetBrains Mono,monospace',
        color:node.color,
        letterSpacing:'.1em',
        textTransform:'uppercase',
        fontWeight:700,
        marginBottom:2,
        paddingRight:14,
        lineHeight:1.2,
      }}>{node.label}</p>
      {/* Sub-label */}
      <p style={{
        fontSize:7, color:'rgba(200,210,255,.45)',
        fontFamily:'monospace', letterSpacing:'.04em',
      }}>{node.sub}</p>
      {/* Hub extras: spinner + progress bar */}
      {isHub && (
        <div style={{ marginTop:7, display:'flex', alignItems:'center', gap:6 }}>
          <div style={{
            width:13, height:13, borderRadius:'50%', flexShrink:0,
            border:`1.5px solid ${node.color}`, borderTopColor:'transparent',
            animation:'aif-spin 1s linear infinite',
          }}/>
          <div style={{ flex:1, height:3, borderRadius:2, background:'rgba(255,255,255,.08)', overflow:'hidden' }}>
            <div style={{
              height:'100%', borderRadius:2, width:'74%',
              background:`linear-gradient(90deg,${ha(node.color,.55)},${node.color})`,
              animation:'aif-bar .8s ease-out both',
            }}/>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Export ─────────────────────────────────────────────────────────── */
export default function NeuralNetworkScene() {
  const containerRef = useRef(null);
  const [tilt, setTilt] = useState({ x:0, y:0 });
  const smoothRef = useRef({ x:0, y:0 });
  const targetRef = useRef({ x:0, y:0 });
  const rafRef    = useRef(null);

  /* Inject keyframes */
  useEffect(() => {
    if (document.getElementById(KFID)) return;
    const s = document.createElement('style');
    s.id=KFID; s.textContent=KF;
    document.head.appendChild(s);
    return () => s.remove();
  }, []);

  /* Smooth tilt */
  useEffect(() => {
    const loop = () => {
      rafRef.current = requestAnimationFrame(loop);
      smoothRef.current.x += (targetRef.current.x - smoothRef.current.x) * 0.08;
      smoothRef.current.y += (targetRef.current.y - smoothRef.current.y) * 0.08;
      setTilt({ x: smoothRef.current.x, y: smoothRef.current.y });
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const onMouse = useCallback(e => {
    const r = containerRef.current?.getBoundingClientRect(); if (!r) return;
    targetRef.current = {
      x: (e.clientX - r.left) / r.width  * 16 - 8,
      y: (e.clientY - r.top)  / r.height * 12 - 6,
    };
  }, []);
  const onLeave = useCallback(() => { targetRef.current = {x:0,y:0}; }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouse}
      onMouseLeave={onLeave}
      aria-hidden="true"
      style={{ position:'absolute', inset:0, perspective:900, overflow:'hidden' }}
    >
      <SceneCanvas />
      <div style={{
        position:'absolute', inset:0,
        transform:`rotateX(${-tilt.y*.28}deg) rotateY(${tilt.x*.28}deg)`,
        transformStyle:'preserve-3d',
      }}>
        {NODES.map(n => <NodeCard key={n.id} node={n} tilt={tilt} />)}
      </div>
    </div>
  );
}
