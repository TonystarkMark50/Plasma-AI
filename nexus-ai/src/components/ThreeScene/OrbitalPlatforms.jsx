import React, { useRef, useMemo, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PLATFORMS = [
  { label: 'CRM', color: '#00E5FF', angle: 0, radius: 5.0, height: 0.8 },
  { label: 'Email', color: '#3B82F6', angle: 0.8, radius: 4.5, height: -0.5 },
  { label: 'WhatsApp', color: '#7C3AED', angle: 1.6, radius: 5.2, height: 1.2 },
  { label: 'Support', color: '#A855F7', angle: 2.4, radius: 4.8, height: -0.9 },
  { label: 'Voice', color: '#00FF9D', angle: 3.2, radius: 5.5, height: 0.3 },
  { label: 'Analytics', color: '#3B82F6', angle: 4.0, radius: 4.2, height: -0.2 },
  { label: 'Marketing', color: '#00E5FF', angle: 4.8, radius: 5.8, height: 0.6 },
  { label: 'Database', color: '#7C3AED', angle: 5.6, radius: 4.0, height: -0.7 },
];

function makeTextTexture(label, color) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 256, 64);
  ctx.font = 'bold 28px Inter, system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = color;
  ctx.shadowBlur = 8;
  ctx.fillStyle = color;
  ctx.fillText(label, 128, 32);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function HolographicPanel({ platform }) {
  const groupRef = useRef(null);
  const initialAngle = useMemo(() => platform.angle, []);

  const texture = useMemo(() => makeTextTexture(platform.label, platform.color), [platform.label, platform.color]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const angle = initialAngle + clock.getElapsedTime() * 0.08;
      const r = platform.radius;
      const h = platform.height;
      groupRef.current.position.x = Math.cos(angle) * r;
      groupRef.current.position.z = Math.sin(angle) * r;
      groupRef.current.position.y = h + Math.sin(clock.getElapsedTime() * 0.5 + initialAngle) * 0.2;
      groupRef.current.lookAt(0, 0, 0);
      groupRef.current.rotateY(Math.PI);
    }
  });

  const getBgColor = useCallback(() => {
    const c = new THREE.Color(platform.color);
    c.multiplyScalar(0.15);
    return c;
  }, [platform.color]);

  return (
    <group ref={groupRef}>
      <mesh>
        <planeGeometry args={[1.6, 0.6]} />
        <meshBasicMaterial color={getBgColor()} transparent opacity={0.6} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[1.58, 0.58]} />
        <meshBasicMaterial color="#050816" transparent opacity={0.4} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[1.4, 0.3]} />
        <meshBasicMaterial map={texture} transparent opacity={0.85} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-0.65, -0.2, 0.02]}>
        <circleGeometry args={[0.035, 8]} />
        <meshBasicMaterial color={platform.color} />
      </mesh>
    </group>
  );
}

export default function OrbitalPlatforms() {
  return (
    <group>
      {PLATFORMS.map((p) => (
        <HolographicPanel key={p.label} platform={p} />
      ))}
    </group>
  );
}
