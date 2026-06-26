# Neural Network Scene Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate a Three.js neural network scene into the Nexus AI landing page, enhancing the Hero section with a visually compelling, performance-optimized 3D experience while maintaining compatibility with existing constraints.

**Architecture:** Create a modular ThreeScene component with dynamic imports for lazy loading. Use React Three Fiber for Three.js integration, coordinate animations with existing CSS transitions, and ensure responsiveness across all devices.

**Tech Stack:** React Three Fiber, `@react-three/fiber`, `@react-three/drei` (only helper components), Tailwind CSS, React 18, Vite 6

## Global Constraints
- No animation libraries (Framer Motion, GSAP, etc.)
- No hardcoded prices
- State isolation for pricing (currency/cycle state must not trigger re-renders of other components)
- Animation timing constraints (entry animations ≤500ms, micro-interactions 150-200ms ease-out, layout reflows 300-400ms ease-in-out)
- SVG usage: Only uploaded SVGs from `nexus-ai/SVGs/` directory
- Semantic HTML, accessibility, and SEO compliance
- Target 60 FPS, lazy-load Three.js, code split the 3D scene, render only when visible, pause rendering when the tab is inactive

---

## Task 1: Create ThreeScene Directory Structure

**Files:**
- Create: `src/components/ThreeScene/`
- Create: `src/components/ThreeScene/NeuralNetworkScene.jsx`
- Create: `src/components/ThreeScene/BackgroundParticles.jsx`
- Create: `src/components/ThreeScene/DigitalWaves.jsx`
- Create: `src/hooks/useThreeScene.js`

**Interfaces:**
- Consumes: None
- Produces: ThreeScene components and hooks for reuse

- [ ] **Step 1: Create the ThreeScene directory structure**
  ```bash
  mkdir -p src/components/ThreeScene
  ```

- [ ] **Step 2: Create empty files for NeuralNetworkScene, BackgroundParticles, DigitalWaves, and useThreeScene hook**
  ```bash
  touch src/components/ThreeScene/NeuralNetworkScene.jsx src/components/ThreeScene/BackgroundParticles.jsx src/components/ThreeScene/DigitalWaves.jsx src/hooks/useThreeScene.js
  ```

- [ ] **Step 3: Commit the directory structure**
  ```bash
  git add src/components/ThreeScene/ src/hooks/useThreeScene.js
  git commit -m "feat: Create ThreeScene directory structure"
  ```

---

## Task 2: Set Up Dynamic Imports for Three.js

**Files:**
- Modify: `src/main.jsx`

**Interfaces:**
- Consumes: None
- Produces: Dynamic imports for Three.js libraries

- [ ] **Step 1: Add dynamic import for Three.js in main.jsx**
  ```jsx
  const ThreeScene = React.lazy(() => import('./components/ThreeScene/NeuralNetworkScene'));
  ```

- [ ] **Step 2: Wrap the Hero component with Suspense for lazy loading**
  ```jsx
  <Suspense fallback={null}>
    <Hero />
  </Suspense>
  ```

- [ ] **Step 3: Add error boundary for Three.js loading errors**
  ```jsx
  const ErrorBoundary = ({ children }) => {
    const [hasError, setHasError] = useState(false);
    return hasError ? <div>Error loading scene</div> : children;
  };
  ```

- [ ] **Step 4: Commit changes**
  ```bash
  git add src/main.jsx
  git commit -m "feat: Set up dynamic imports for Three.js"
  ```

---

## Task 3: Create NeuralNetworkScene Component

**Files:**
- Modify: `src/components/ThreeScene/NeuralNetworkScene.jsx`
- Modify: `src/hooks/useThreeScene.js`

**Interfaces:**
- Consumes: `useThreeScene` hook
- Produces: Neural network scene with Three.js

- [ ] **Step 1: Write the failing test for NeuralNetworkScene**
  ```jsx
  // Test file: src/components/ThreeScene/NeuralNetworkScene.test.jsx
  import { render, screen } from '@testing-library/react';
  import NeuralNetworkScene from './NeuralNetworkScene';
  
  test('NeuralNetworkScene renders without errors', () => {
    render(<NeuralNetworkScene />);
    expect(screen.getByTestId('neural-network-scene')).toBeInTheDocument();
  });
  ```

- [ ] **Step 2: Run test to verify it fails**
  ```bash
  npm test src/components/ThreeScene/NeuralNetworkScene.test.jsx
  ```

- [ ] **Step 3: Implement NeuralNetworkScene with basic Three.js setup**
  ```jsx
  // src/components/ThreeScene/NeuralNetworkScene.jsx
  import { Canvas } from '@react-three/fiber';
  import { useThreeScene } from '../../hooks/useThreeScene';
  
  const NeuralNetworkScene = () => {
    const { sceneProps } = useThreeScene();
    
    return (
      <div data-testid="neural-network-scene">
        <Canvas {...sceneProps}>
          {/* Neural network nodes will be added here */}
        </Canvas>
      </div>
    );
  };
  ```

- [ ] **Step 4: Run test to verify it passes**
  ```bash
  npm test src/components/ThreeScene/NeuralNetworkScene.test.jsx
  ```

- [ ] **Step 5: Add basic neural network nodes using Three.js**
  ```jsx
  import { useFrame } from '@react-three/fiber';
  import { useRef } from 'react';
  
  const Node = ({ position }) => {
    const meshRef = useRef();
    useFrame(() => {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.005;
    });
    
    return (
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#6366f1" />
      </mesh>
    );
  };
  ```

- [ ] **Step 6: Add connections between nodes**
  ```jsx
  const Connection = ({ start, end }) => {
    return (
      <line
        color="#93c5fd"
        lineWidth={1}
        points={[start, end]}
      />
    );
  };
  ```

- [ ] **Step 7: Add floating animation to nodes**
  ```jsx
  const Node = ({ position }) => {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);
    const [hoveredPosition, setHoveredPosition] = useState(position);
    
    useFrame(() => {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = hovered ? hoveredPosition[1] + 0.1 : position[1];
    });
    
    return (
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#6366f1" />
      </mesh>
    );
  };
  ```

- [ ] **Step 8: Commit changes**
  ```bash
  git add src/components/ThreeScene/NeuralNetworkScene.jsx src/components/ThreeScene/NeuralNetworkScene.test.jsx
  git commit -m "feat: Implement NeuralNetworkScene with basic nodes and connections"
  ```

---

## Task 4: Create BackgroundParticles Component

**Files:**
- Modify: `src/components/ThreeScene/BackgroundParticles.jsx`

**Interfaces:**
- Consumes: Three.js utilities
- Produces: Floating particles background

- [ ] **Step 1: Write the failing test for BackgroundParticles**
  ```jsx
  // Test file: src/components/ThreeScene/BackgroundParticles.test.jsx
  import { render, screen } from '@testing-library/react';
  import BackgroundParticles from './BackgroundParticles';
  
  test('BackgroundParticles renders without errors', () => {
    render(<BackgroundParticles />);
    expect(screen.getByTestId('background-particles')).toBeInTheDocument();
  });
  ```

- [ ] **Step 2: Run test to verify it fails**
  ```bash
  npm test src/components/ThreeScene/BackgroundParticles.test.jsx
  ```

- [ ] **Step 3: Implement BackgroundParticles with Three.js**
  ```jsx
  // src/components/ThreeScene/BackgroundParticles.jsx
  import { useFrame } from '@react-three/fiber';
  import { useRef } from 'react';
  
  const Particle = ({ position }) => {
    const meshRef = useRef();
    
    useFrame(() => {
      meshRef.current.position.y += 0.01;
      if (meshRef.current.position.y > 1) meshRef.current.position.y = -1;
    });
    
    return (
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#93c5fd" transparent opacity={0.7} />
      </mesh>
    );
  };
  
  const BackgroundParticles = () => {
    const particleCount = 50;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        position: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        ]
      });
    }
    
    return (
      <group>
        {particles.map((particle, index) => (
          <Particle key={index} position={particle.position} />
        ))}
      </group>
    );
  };
  ```

- [ ] **Step 4: Run test to verify it passes**
  ```bash
  npm test src/components/ThreeScene/BackgroundParticles.test.jsx
  ```

- [ ] **Step 5: Add DigitalWaves component**
  ```jsx
  // src/components/ThreeScene/DigitalWaves.jsx
  import { useFrame } from '@react-three/fiber';
  import { useRef } from 'react';
  
  const DigitalWave = () => {
    const meshRef = useRef();
    
    useFrame(() => {
      meshRef.current.rotation.x += 0.005;
    });
    
    return (
      <mesh ref={meshRef} position={[0, 0, -5]}>
        <planeGeometry args={[20, 20, 32, 32]} />
        <meshStandardMaterial
          color="#3b82f6"
          transparent
          opacity={0.1}
        />
      </mesh>
    );
  };
  ```

- [ ] **Step 6: Commit changes**
  ```bash
  git add src/components/ThreeScene/BackgroundParticles.jsx src/components/ThreeScene/DigitalWaves.jsx src/components/ThreeScene/BackgroundParticles.test.jsx
  git commit -m "feat: Add BackgroundParticles and DigitalWaves components"
  ```

---

## Task 5: Implement useThreeScene Hook

**Files:**
- Modify: `src/hooks/useThreeScene.js`

**Interfaces:**
- Consumes: None
- Produces: Custom hook for Three.js scene management

- [ ] **Step 1: Write the failing test for useThreeScene**
  ```jsx
  // Test file: src/hooks/useThreeScene.test.js
  import { renderHook } from '@testing-library/react-hooks';
  import { useThreeScene } from './useThreeScene';
  
  test('useThreeScene returns correct default props', () => {
    const { result } = renderHook(() => useThreeScene());
    expect(result.current.sceneProps).toBeDefined();
  });
  ```

- [ ] **Step 2: Run test to verify it fails**
  ```bash
  npm test src/hooks/useThreeScene.test.js
  ```

- [ ] **Step 3: Implement useThreeScene hook**
  ```jsx
  // src/hooks/useThreeScene.js
  import { useState, useEffect } from 'react';
  
  export const useThreeScene = () => {
    const [sceneProps, setSceneProps] = useState({
      camera: { position: [0, 0, 5] },
      gl: { antialias: true },
    });
    
    useEffect(() => {
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'hidden') {
          // Pause rendering when tab is inactive
          console.log('Pausing Three.js rendering');
        } else {
          // Resume rendering when tab is active
          console.log('Resuming Three.js rendering');
        }
      };
      
      document.addEventListener('visibilitychange', handleVisibilityChange);
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }, []);
    
    return { sceneProps };
  };
  ```

- [ ] **Step 4: Run test to verify it passes**
  ```bash
  npm test src/hooks/useThreeScene.test.js
  ```

- [ ] **Step 5: Add pause/resume functionality for Three.js**
  ```jsx
  import { useThree } from '@react-three/fiber';
  
  const useThreeScene = () => {
    const { gl } = useThree();
    const [sceneProps, setSceneProps] = useState({
      camera: { position: [0, 0, 5] },
      gl: { antialias: true },
    });
    
    useEffect(() => {
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'hidden') {
          gl.setAnimationLoop(null); // Pause rendering
        } else {
          gl.setAnimationLoop(() => requestAnimationFrame(render)); // Resume rendering
        }
      };
      
      document.addEventListener('visibilitychange', handleVisibilityChange);
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }, [gl]);
    
    return { sceneProps };
  };
  ```

- [ ] **Step 6: Commit changes**
  ```bash
  git add src/hooks/useThreeScene.js src/hooks/useThreeScene.test.js
  git commit -m "feat: Implement useThreeScene hook with pause/resume functionality"
  ```

---

## Task 6: Refactor Tailwind CSS for Modularity

**Files:**
- Modify: `src/styles/tailwind.css`
- Modify: `tailwind.config.js`

**Interfaces:**
- Consumes: Existing Tailwind CSS
- Produces: Modular Tailwind CSS utilities

- [ ] **Step 1: Extract reusable Tailwind CSS classes**
  ```css
  /* src/styles/tailwind.css */
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  
  /* Add custom reusable classes */
  .glassmorphism {
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.1);
  }
  ```

- [ ] **Step 2: Update tailwind.config.js for custom theme**
  ```js
  // tailwind.config.js
  module.exports = {
    theme: {
      extend: {
        colors: {
          primary: '#6366f1',
          secondary: '#3b82f6',
          background: '#f8fafc',
        },
        fontFamily: {
          display: ['Inter', 'sans-serif'],
        },
      },
    },
  };
  ```

- [ ] **Step 3: Refactor existing components to use new Tailwind classes**
  ```jsx
  // Example: src/components/Navbar.jsx
  <nav className="glassmorphism p-4 rounded-lg">
    {/* Navbar content */}
  </nav>
  ```

- [ ] **Step 4: Commit changes**
  ```bash
  git add src/styles/tailwind.css tailwind.config.js
  git commit -m "feat: Refactor Tailwind CSS for modularity"
  ```

---

## Task 7: Integrate Three.js Scene into Hero Component

**Files:**
- Modify: `src/components/Hero.jsx`

**Interfaces:**
- Consumes: NeuralNetworkScene, BackgroundParticles, DigitalWaves
- Produces: Hero component with Three.js scene

- [ ] **Step 1: Write the failing test for Hero component with Three.js**
  ```jsx
  // Test file: src/components/Hero.test.jsx
  import { render, screen } from '@testing-library/react';
  import Hero from './Hero';
  
  test('Hero component renders with Three.js scene', () => {
    render(<Hero />);
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('neural-network-scene')).toBeInTheDocument();
  });
  ```

- [ ] **Step 2: Run test to verify it fails**
  ```bash
  npm test src/components/Hero.test.jsx
  ```

- [ ] **Step 3: Integrate Three.js scene into Hero component**
  ```jsx
  // src/components/Hero.jsx
  import { Suspense, lazy } from 'react';
  import NeuralNetworkScene from '../ThreeScene/NeuralNetworkScene';
  
  const Hero = () => {
    return (
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="relative min-h-screen flex items-center pt-20 overflow-hidden"
        data-testid="hero-section"
      >
        <div className="container mx-auto px-4 z-10">
          {/* Hero content */}
        </div>
        <Suspense fallback={null}>
          <div className="absolute inset-0 z-0">
            <NeuralNetworkScene />
          </div>
        </Suspense>
      </section>
    );
  };
  ```

- [ ] **Step 4: Run test to verify it passes**
  ```bash
  npm test src/components/Hero.test.jsx
  ```

- [ ] **Step 5: Add responsive adjustments for Three.js scene**
  ```jsx
  const Hero = () => {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    return (
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="relative min-h-screen flex items-center pt-20 overflow-hidden"
        data-testid="hero-section"
      >
        <div className="container mx-auto px-4 z-10">
          {/* Hero content */}
        </div>
        <Suspense fallback={null}>
          <div className="absolute inset-0 z-0">
            {isMobile ? (
              <NeuralNetworkScene simplified />
            ) : (
              <NeuralNetworkScene />
            )}
          </div>
        </Suspense>
      </section>
    );
  };
  ```

- [ ] **Step 6: Add simplified Three.js scene for mobile**
  ```jsx
  const NeuralNetworkScene = ({ simplified }) => {
    if (simplified) {
      return (
        <Canvas camera={{ position: [0, 0, 3] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Node position={[0, 0, 0]} />
        </Canvas>
      );
    }
    // Original scene code
  };
  ```

- [ ] **Step 7: Commit changes**
  ```bash
  git add src/components/Hero.jsx src/components/Hero.test.jsx
  git commit -m "feat: Integrate Three.js scene into Hero component"
  ```

---

## Task 8: Verify Performance and Responsiveness

**Files:**
- Modify: `src/components/ThreeScene/NeuralNetworkScene.jsx`

**Interfaces:**
- Consumes: Performance testing tools
- Produces: Optimized Three.js scene

- [ ] **Step 1: Run performance tests**
  ```bash
  npm run build -- --report
  npm run analyze
  ```

- [ ] **Step 2: Optimize Three.js scene for performance**
  ```jsx
  // Use InstancedMesh for multiple nodes
  import { InstancedMesh } from '@react-three/drei';
  
  const NeuralNetworkScene = () => {
    const nodes = [];
    const connections = [];
    
    // Generate nodes and connections
    for (let i = 0; i < 20; i++) {
      nodes.push({
        position: [Math.random() * 5 - 2.5, Math.random() * 5 - 2.5, Math.random() * 5 - 2.5],
      });
      
      if (i > 0) {
        connections.push({
          start: nodes[i - 1].position,
          end: nodes[i].position,
        });
      }
    }
    
    return (
      <group>
        <InstancedMesh args={[null, null, nodes.length]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color="#6366f1" />
        </InstancedMesh>
        {/* Connections */}
      </group>
    );
  };
  ```

- [ ] **Step 3: Test responsiveness on different devices**
  ```bash
  npm run test:responsive
  ```

- [ ] **Step 4: Ensure Three.js canvas is decorative and does not interfere with accessibility**
  ```jsx
  <div
    className="absolute inset-0 z-0"
    aria-hidden="true"
    role="presentation"
  >
    <NeuralNetworkScene />
  </div>
  ```

- [ ] **Step 5: Commit performance and responsiveness optimizations**
  ```bash
  git add src/components/ThreeScene/NeuralNetworkScene.jsx
  git commit -m "feat: Optimize performance and responsiveness"
  ```

---

## Task 9: Coordinate Three.js Animations with CSS Transitions

**Files:**
- Modify: `src/components/ThreeScene/NeuralNetworkScene.jsx`
- Modify: `src/styles/animations.css`

**Interfaces:**
- Consumes: CSS animations
- Produces: Coordinated Three.js and CSS animations

- [ ] **Step 1: Add CSS keyframes for coordinated animations**
  ```css
  /* src/styles/animations.css */
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  ```

- [ ] **Step 2: Apply CSS animations to Three.js elements**
  ```jsx
  const Node = ({ position }) => {
    const meshRef = useRef();
    
    useFrame(() => {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.005;
    });
    
    return (
      <mesh
        ref={meshRef}
        position={position}
        className="animate-float"
      >
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#6366f1" />
      </mesh>
    );
  };
  ```

- [ ] **Step 3: Ensure animations comply with timing requirements**
  ```css
  /* src/styles/animations.css */
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  .animate-float {
    animation: float 1.5s ease-out infinite;
  }
  ```

- [ ] **Step 4: Commit coordinated animations**
  ```bash
  git add src/components/ThreeScene/NeuralNetworkScene.jsx src/styles/animations.css
  git commit -m "feat: Coordinate Three.js animations with CSS transitions"
  ```

---

## Task 10: Final Build and Testing

**Files:**
- Run: `npm run build`

**Interfaces:**
- Consumes: All modified files
- Produces: Production-ready build

- [ ] **Step 1: Run final build**
  ```bash
  npm run build
  ```

- [ ] **Step 2: Run tests**
  ```bash
  npm test
  ```

- [ ] **Step 3: Verify no console errors**
  ```bash
  npm run preview
  ```

- [ ] **Step 4: Run Lighthouse audit**
  ```bash
  npm install -g lighthouse
  lighthouse http://localhost:3000 --view
  ```

- [ ] **Step 5: Commit final changes**
  ```bash
  git add .
  git commit -m "feat: Final build and testing"
  ```

---

## Plan Complete

**Plan complete and saved to `docs/superpowers/plans/2026-06-26-neural-network-scene-implementation.md`. Two execution options:**

1. **Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

2. **Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?