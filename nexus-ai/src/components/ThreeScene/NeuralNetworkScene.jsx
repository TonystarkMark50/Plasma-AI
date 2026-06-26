import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';

function MouseParallax({ children }) {
  const group = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handle = (e) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handle, { passive: true });
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  useFrame(() => {
    smooth.current.x += (target.current.x - smooth.current.x) * 0.03;
    smooth.current.y += (target.current.y - smooth.current.y) * 0.03;
    if (group.current) {
      group.current.rotation.y = smooth.current.x * 0.08;
      group.current.rotation.x = smooth.current.y * 0.04;
    }
  });

  return <group ref={group}>{children}</group>;
}

function CameraController() {
  const { camera } = useThree();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    camera.position.x = Math.sin(t * 0.04) * 1.5;
    camera.position.y = 1.2 + Math.sin(t * 0.03) * 0.3;
    camera.position.z = 5 + Math.sin(t * 0.05 + 1) * 0.3;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function Helix({ offset, radius, height, color, speed }) {
  const ref = useRef(null);
  const count = 80;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const angle = t * Math.PI * 6 + offset;
      const y = (t - 0.5) * height;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, [count, offset, radius, height]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * speed;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color={color} transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function HelixLine({ offset, radius, height, color, speed }) {
  const ref = useRef(null);
  const count = 60;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const angle = t * Math.PI * 6 + offset;
      const y = (t - 0.5) * height;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, [count, offset, radius, height]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * speed;
    }
  });

  return (
    <line ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={0.06} />
    </line>
  );
}

function CenterGlow() {
  const ref = useRef(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.2;
      ref.current.rotation.y += delta * 0.3;
    }
  });
  return (
    <group ref={ref}>
      <mesh>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshBasicMaterial color="#FFC801" transparent opacity={0.15} wireframe />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="#FFC801" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function Ring({ radius, tilt, speed, opacity, color }) {
  const ref = useRef(null);
  const positions = useMemo(() => {
    const count = 40;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, [radius]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * speed * tilt;
      ref.current.rotation.y += delta * speed;
    }
  });

  return (
    <lineLoop ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={40} array={positions} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </lineLoop>
  );
}

function AmbientDots({ count, spread, color }) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.5;
    }
    return pos;
  }, [count, spread]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.012} color={color} transparent opacity={0.08} sizeAttenuation />
    </points>
  );
}

export default function NeuralNetworkScene({ simplified }) {
  return (
    <Canvas
      camera={{ position: [0, 1.2, 5], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.2} />
      <directionalLight position={[2, 4, 3]} intensity={0.5} color="#FFC801" />

      <AmbientDots count={60} spread={10} color="#D9E8E2" />

      <MouseParallax>
        <CameraController />
        <CenterGlow />
        <Helix offset={0} radius={1.8} height={4} color="#FFC801" speed={0.15} />
        <Helix offset={Math.PI} radius={1.4} height={4} color="#FF9932" speed={-0.12} />
        <HelixLine offset={0} radius={1.8} height={4} color="#FFC801" speed={0.15} />
        <HelixLine offset={Math.PI} radius={1.4} height={4} color="#FF9932" speed={-0.12} />
        <Ring radius={2.4} tilt={0.3} speed={0.08} opacity={0.04} color="#FFC801" />
        <Ring radius={1.0} tilt={-0.5} speed={-0.12} opacity={0.03} color="#FFC801" />
      </MouseParallax>
    </Canvas>
  );
}
