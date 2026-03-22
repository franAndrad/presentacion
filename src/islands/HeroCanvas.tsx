import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleCore = ({ count = 2000 }) => {
  const pointsRef = useRef<THREE.Points>(null!);
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.5 + Math.random() * 2;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      pos.set([
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      ], i * 3);
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.05;
    pointsRef.current.rotation.z = time * 0.03;
    
    // Smooth magnetic follow mouse
    const { x, y } = state.mouse;
    pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, x * 0.5, 0.1);
    pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, y * 0.5, 0.1);
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#0087c8"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.4}
      />
    </Points>
  );
};

const CentralDistortion = () => {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.x = Math.sin(time / 4);
    mesh.current.rotation.y = Math.sin(time / 2);
    
    // Magnetic pulse
    const scale = 1 + Math.sin(time * 2) * 0.05;
    mesh.current.scale.set(scale, scale, scale);
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={mesh}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#0087c8"
          speed={3}
          distort={0.4}
          radius={1}
          emissive="#0087c8"
          emissiveIntensity={0.5}
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
    </Float>
  );
};

const HeroCanvas = () => {
  return (
    <div className="absolute inset-0 z-0 bg-[#000000]">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} dpr={[1, 2]}>
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#0087c8" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0087c8" />
        
        <CentralDistortion />
        <ParticleCore />
        
        {/* Subtle grid floor simulation */}
        <gridHelper args={[20, 40, 0x0087c8, 0x001122]} position={[0, -2, 0]} rotation={[0, 0, 0]} />
        
        <fog attach="fog" args={['#000000', 5, 15]} />
      </Canvas>
      
      {/* Overlay vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,black_90%)]" />
    </div>
  );
};

export default HeroCanvas;
