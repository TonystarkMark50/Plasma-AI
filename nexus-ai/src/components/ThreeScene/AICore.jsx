import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 1200;
const RING_COUNT = 3;

function CoreGlow() {
  const meshRef = useRef(null);
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.2, 64, 64]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{ uTime: { value: 0 } }}
        vertexShader={`
          varying vec3 vNormal;
          varying vec3 vPosition;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          varying vec3 vNormal;
          varying vec3 vPosition;
          void main() {
            float pulse = 0.6 + 0.4 * sin(uTime * 1.2 + vPosition.z * 2.0);
            float rim = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
            rim = pow(rim, 2.5) * 0.8;
            vec3 color = mix(vec3(0.05, 0.6, 1.0), vec3(0.5, 0.2, 0.9), rim);
            float alpha = rim * pulse + 0.15;
            gl_FragColor = vec4(color, alpha);
          }
        `}
      />
    </mesh>
  );
}

function ParticleShell() {
  const meshRef = useRef(null);
  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const sz = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.6 + Math.random() * 1.4;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      sz[i] = 0.02 + Math.random() * 0.035;
    }
    return [pos, sz];
  }, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.03) * 0.1;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={PARTICLE_COUNT}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#00E5FF"
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function EnergyRing({ radius, speed, color, offset = 0 }) {
  const ref = useRef(null);
  const geometry = useMemo(() => {
    const pts = [];
    const segments = 80;
    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * Math.PI * 2;
      pts.push(Math.cos(t) * radius, Math.sin(t) * radius, 0);
    }
    return new THREE.BufferGeometry(new THREE.Float32BufferAttribute(pts, 3));
  }, [radius]);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime() * speed + offset;
      ref.current.rotation.x = Math.sin(t * 0.5) * 0.3;
      ref.current.rotation.y = t;
      ref.current.rotation.z = Math.cos(t * 0.3) * 0.2;
    }
  });

  return (
    <line ref={ref}>
      <bufferGeometry {...geometry} />
      <lineBasicMaterial color={color} transparent opacity={0.35} linewidth={1} />
    </line>
  );
}

export default function AICore() {
  return (
    <group>
      <CoreGlow />
      <ParticleShell />
      {[
        { radius: 1.8, speed: 0.4, color: '#00E5FF', offset: 0 },
        { radius: 2.4, speed: -0.3, color: '#3B82F6', offset: 1.2 },
        { radius: 3.0, speed: 0.25, color: '#7C3AED', offset: 2.5 },
      ].map((ring, i) => (
        <EnergyRing key={i} {...ring} />
      ))}
    </group>
  );
}
