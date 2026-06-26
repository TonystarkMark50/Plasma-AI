import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function ParticlesInner({ count }) {
  const meshRef = useRef(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
      sizes[i] = 0.02 + Math.random() * 0.03;
    }
    return { pos, sizes };
  }, [count]);

  useFrame(() => {
    if (meshRef.current) {
      const p = meshRef.current.geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        p[i * 3 + 1] += 0.002;
        if (p[i * 3 + 1] > 10) p[i * 3 + 1] = -10;
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions.pos}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#6366f1"
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
}

export default function BackgroundParticles({ count = 60 }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <ParticlesInner count={count} />
    </Canvas>
  );
}
