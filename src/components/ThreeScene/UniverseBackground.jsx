import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function StarField({ count = 1500 }) {
  const ref = useRef(null);
  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 10 + Math.random() * 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      sz[i] = 0.02 + Math.random() * 0.06;
    }
    return [pos, sz];
  }, [count]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.005;
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.002) * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#A855F7"
        transparent
        opacity={0.3}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function NebulaCloud() {
  const meshRef = useRef(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.003;
      meshRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.05) * 0.5;
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(8, 32, 32);
    const pos = geo.attributes.position;
    const colors = new Float32Array(pos.count * 3);
    for (let i = 0; i < pos.count; i++) {
      const mix = Math.random();
      colors[i * 3] = 0.02 + mix * 0.05;
      colors[i * 3 + 1] = 0.01 + (1 - mix) * 0.03;
      colors[i * 3 + 2] = 0.06 + mix * 0.08;
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, 0, -12]}>
      <meshBasicMaterial
        vertexColors
        transparent
        opacity={0.15}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function UniverseBackground() {
  return (
    <group>
      <StarField />
      <NebulaCloud />
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#00E5FF" />
      <directionalLight position={[-5, -3, -5]} intensity={0.3} color="#7C3AED" />
      <pointLight position={[0, 0, 0]} intensity={1.2} color="#00E5FF" distance={15} decay={2} />
    </group>
  );
}
