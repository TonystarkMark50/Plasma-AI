import React, { useRef, useCallback, useEffect, useState, lazy, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const AICore = lazy(() => import('./AICore'));
const OrbitalPlatforms = lazy(() => import('./OrbitalPlatforms'));
const NeuralLinks = lazy(() => import('./NeuralLinks'));
const UniverseBackground = lazy(() => import('./UniverseBackground'));

function CameraController({ mouse, scroll }) {
  const { camera } = useThree();

  useFrame(() => {
    const tx = (mouse.current.x * 0.3);
    const ty = (mouse.current.y * 0.2);
    const tz = 7 + scroll.current * 2;

    camera.position.x += (tx - camera.position.x) * 0.03;
    camera.position.y += (ty - camera.position.y) * 0.03;
    camera.position.z += (tz - camera.position.z) * 0.03;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function SceneContent({ mouse, scroll, onLoaded }) {
  useEffect(() => {
    onLoaded();
  }, [onLoaded]);

  return (
    <>
      <CameraController mouse={mouse} scroll={scroll} />
      <UniverseBackground />
      <Suspense fallback={null}>
        <AICore />
        <OrbitalPlatforms />
        <NeuralLinks />
      </Suspense>
    </>
  );
}

export default function AIUniverseScene() {
  const containerRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);
  const [loaded, setLoaded] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const onMouse = useCallback((e) => {
    const r = containerRef.current?.getBoundingClientRect();
    if (!r) return;
    mouse.current.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    mouse.current.y = -((e.clientY - r.top) / r.height) * 2 + 1;
  }, []);

  const onScroll = useCallback(() => {
    scroll.current = Math.min(window.scrollY / 600, 1);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  const handleLoaded = useCallback(() => setLoaded(true), []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        borderRadius: 'inherit',
        overflow: 'hidden',
      }}
    >
      {ready && (
        <Canvas
          camera={{ position: [0, 0, 7], fov: 50, near: 0.1, far: 80 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(new THREE.Color('#050816'), 1);
          }}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        >
          <SceneContent mouse={mouse} scroll={scroll} onLoaded={handleLoaded} />
        </Canvas>
      )}
      <div
        onMouseMove={onMouse}
        style={{ position: 'absolute', inset: 0, zIndex: 1 }}
      />
    </div>
  );
}
