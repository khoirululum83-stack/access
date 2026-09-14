import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere } from '@react-three/drei';

function InteractiveComputer({ onStartQuiz }) {
  const meshRef = useRef();
  
  // Efek rotasi halus 3D
  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.5;
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Visual Komputer / Lab Access */}
      <Box 
        ref={meshRef} 
        args={[2, 1.5, 0.2]} 
        onClick={onStartQuiz}
        className="cursor-pointer"
      >
        <meshStandardMaterial color="#A12C25" /> {/* Warna Merah Khas MS Access */}
      </Box>
      <Text position={[0, 1.2, 0]} fontSize={0.3} color="black">
        Klik Komputer untuk Mulai Ujian MS Access
      </Text>
    </group>
  );
}

export default function GameScene({ onStartQuiz }) {
  return (
    <div className="h-[400px] w-full border-2 rounded-xl overflow-hidden shadow-lg">
      <Canvas camera={{ position: [0, 2, 5], fov: 60 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <InteractiveComputer onStartQuiz={onStartQuiz} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}