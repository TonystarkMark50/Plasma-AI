import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function WaveInner() {
  const meshRef = useRef(null);
  const vertices = useMemo(() => {
    const w = 20, h = 20;
    const positions = [];
    const indices = [];
    for (let y = 0; y <= h; y++) {
      for (let x = 0; x <= w; x++) {
        positions.push(
          (x / w - 0.5) * 16,
          (y / h - 0.5) * 16,
          0
        );
      }
    }
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const a = y * (w + 1) + x;
        const b = y * (w + 1) + x + 1;
        const c = (y + 1) * (w + 1) + x;
        const d = (y + 1) * (w + 1) + x + 1;
        indices.push(a, b, c, b, d, c);
      }
    }
    return { positions: new Float32Array(positions), indices: new Uint16Array(indices) };
  }, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const p = meshRef.current.geometry.attributes.position.array;
      const t = clock.getElapsedTime();
      for (let y = 0; y <= 20; y++) {
        for (let x = 0; x <= 20; x++) {
          const idx = (y * 21 + x) * 3;
          const px = (x / 20 - 0.5) * 16;
          const py = (y / 20 - 0.5) * 16;
          p[idx + 2] = Math.sin(px * 0.5 + t * 0.3) * 0.1 + Math.cos(py * 0.5 + t * 0.2) * 0.1;
        }
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true;
      meshRef.current.geometry.computeVertexNormals();
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 3, 0, 0]} position={[0, 0, -1]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={vertices.positions.length / 3}
          array={vertices.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="index"
          count={vertices.indices.length}
          array={vertices.indices}
          itemSize={1}
        />
      </bufferGeometry>
      <meshStandardMaterial
        color="#6366f1"
        transparent
        opacity={0.04}
        wireframe
      />
    </mesh>
  );
}

export default function DigitalWaves() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <WaveInner />
    </Canvas>
  );
}
