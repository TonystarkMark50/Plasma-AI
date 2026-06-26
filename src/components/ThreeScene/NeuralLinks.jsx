import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const NODE_COUNT = 14;
const LINK_COUNT = 18;
const PACKET_COUNT = 30;

function getPosition(i) {
  const angle = (i / NODE_COUNT) * Math.PI * 2 + i * 0.3;
  const radius = 2.5 + (i % 5) * 0.8;
  return new THREE.Vector3(
    Math.cos(angle) * radius,
    (Math.sin(i * 1.5) * 0.8),
    Math.sin(angle) * radius
  );
}

function NeuralPath({ start, end, color, packetRefs }) {
  const points = useMemo(() => {
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    mid.y += 0.5;
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    return curve.getPoints(30);
  }, [start, end]);

  return (
    <line geometry={new THREE.BufferGeometry().setFromPoints(points)}>
      <lineBasicMaterial color={color} transparent opacity={0.15} />
    </line>
  );
}

function DataPacket({ start, end, color, speed, offset }) {
  const ref = useRef(null);
  const curve = useMemo(() => {
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    mid.y += 0.5;
    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [start, end]);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = ((clock.getElapsedTime() * speed + offset) % 1);
      const pt = curve.getPoint(t);
      ref.current.position.copy(pt);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.06, 6, 6]} />
      <meshBasicMaterial color={color} transparent opacity={0.7} />
    </mesh>
  );
}

export default function NeuralLinks() {
  const positions = useMemo(() =>
    Array.from({ length: NODE_COUNT }, (_, i) => getPosition(i)),
  []);

  const links = useMemo(() => {
    const l = [];
    for (let i = 0; i < LINK_COUNT; i++) {
      const a = i % NODE_COUNT;
      const b = (i + 2 + Math.floor(i / 3)) % NODE_COUNT;
      if (a !== b) {
        l.push({ a, b, color: i % 3 === 0 ? '#00E5FF' : i % 3 === 1 ? '#3B82F6' : '#7C3AED' });
      }
    }
    return l;
  }, []);

  const packets = useMemo(() =>
    Array.from({ length: PACKET_COUNT }, (_, i) => {
      const link = links[i % links.length];
      return {
        start: positions[link.a],
        end: positions[link.b],
        color: link.color,
        speed: 0.15 + Math.random() * 0.2,
        offset: Math.random(),
      };
    }),
  [links, positions]);

  const nodeMeshes = useMemo(() =>
    positions.map((pos, i) => {
      const hue = (i / NODE_COUNT) * 0.6;
      const color = new THREE.Color().setHSL(hue, 0.8, 0.5);
      return { pos, color: `#${color.getHexString()}` };
    }),
  [positions]);

  return (
    <group>
      {links.map((link, i) => (
        <NeuralPath
          key={`link-${i}`}
          start={positions[link.a]}
          end={positions[link.b]}
          color={link.color}
        />
      ))}
      {packets.map((p, i) => (
        <DataPacket key={`pkt-${i}`} {...p} />
      ))}
      {nodeMeshes.map((n, i) => (
        <group key={`node-${i}`} position={n.pos}>
          <mesh>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial color={n.color} transparent opacity={0.3} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.04, 6, 6]} />
            <meshBasicMaterial color={n.color} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
