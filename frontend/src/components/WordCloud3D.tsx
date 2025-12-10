import React, { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

export type WordDatum = {
  word: string;
  weight: number;
};

type WordCloud3DProps = {
  words: WordDatum[];
};

type WordProps = {
  datum: WordDatum;
  position: [number, number, number];
};

function Word3D({ datum, position }: WordProps) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  // Slight pulsing / hover scale
  useFrame(() => {
    if (!ref.current) return;
    const baseScale = 1;
    const target = hovered ? 1.2 : 1;
    ref.current.scale.lerp(new THREE.Vector3(target, target, target), 0.1);
  });

  // Map weight (0..1-ish) to font size and color
  const fontSize = 0.3 + datum.weight * 1.2;

  // Color shifts from blue (low) → pink (high)
  const color = new THREE.Color().setHSL(
    0.6 - Math.min(datum.weight, 1) * 0.4, // hue
    0.7,
    0.55
  );

  return (
    <Text
      ref={ref}
      position={position}
      fontSize={fontSize}
      color={color.getStyle()}
      anchorX="center"
      anchorY="middle"
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {datum.word}
    </Text>
  );
}

function RotatingCloud({ words }: WordCloud3DProps) {
  const groupRef = useRef<THREE.Group>(null!);

  // Rotate whole cloud slowly
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  // Compute 3D positions for each word (rough sphere layout)
  const positions = useMemo(() => {
    const result: [number, number, number][] = [];
    const radius = 4;

    words.forEach((datum, index) => {
      const phi = Math.acos(-1 + (2 * (index + 0.5)) / words.length); // polar
      const theta = Math.sqrt(words.length * Math.PI) * phi; // azimuthal

      const r = radius * (0.6 + 0.4 * Math.random()); // slight radial variation

      const x = r * Math.cos(theta) * Math.sin(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(phi);
      result.push([x, y, z]);
    });

    return result;
  }, [words]);

  return (
    <group ref={groupRef}>
      {words.map((datum, i) => (
        <Word3D key={datum.word + i} datum={datum} position={positions[i]} />
      ))}
    </group>
  );
}

export function WordCloud3D({ words }: WordCloud3DProps) {
  return (
    <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.9} />
      <OrbitControls enablePan enableZoom enableRotate />
      <RotatingCloud words={words} />
    </Canvas>
  );
}
