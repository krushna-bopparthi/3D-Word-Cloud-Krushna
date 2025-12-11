import React, { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Text } from "@react-three/drei";
import * as THREE from "three";

export type WordDatum = {
  word: string;
  weight: number;
};

type WordCloud3DProps = {
  words: WordDatum[];
};

function Word3D({
  datum,
  position,
  index,
  color,
}: {
  datum: WordDatum;
  position: [number, number, number];
  index: number;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  // VERY LIGHT floating movement (safe, no distortion)
  useFrame((state) => {
    if (!ref.current) return;

    const t = state.clock.elapsedTime;

    // VERY tiny micro-movement only to look alive
    ref.current.position.y = position[1] + Math.sin(t * 0.5 + index) * 0.02;

    const scale = hovered ? 1.2 : 1;
    ref.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
  });

  const fontSize = 0.5 + datum.weight * 0.6;

  return (
    <Text
      ref={ref}
      position={position}
      fontSize={fontSize}
      color={color}
      anchorX="center"
      anchorY="middle"
      outlineWidth={0.02}
      outlineColor="black"
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "default";
      }}
    >
      {datum.word}
    </Text>
  );
}

function SpreadCloud({ words }: { words: WordDatum[] }) {
  const colors = ["#A7F3D0", "#BAE6FD", "#FDE68A", "#FCA5A5"]; // 4 pastel colors

  // Random 3D positions spread across the screen
  // Random 3D positions spread across the screen with spacing
  const positions = useMemo(() => {
    const result: [number, number, number][] = [];

    const radiusStep = 3; // distance between circles
    const wordsPerCircle = 10; // number of words before increasing radius

    words.forEach((_, i) => {
      const circleIndex = Math.floor(i / wordsPerCircle);
      const angle = (i % wordsPerCircle) * ((Math.PI * 2) / wordsPerCircle);

      const radius = 3 + circleIndex * radiusStep;

      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * 0.5; // compressed vertically
      const z = 0;

      result.push([x, y, z]);
    });

    return result;
  }, [words]);

  return (
    <group>
      {words.map((d, i) => (
        <Word3D
          key={i}
          datum={d}
          position={positions[i]}
          index={i}
          color={colors[i % colors.length]}
        />
      ))}
    </group>
  );
}

export function WordCloud3D({ words }: WordCloud3DProps) {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas camera={{ position: [0, 0, 11], fov: 60 }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 4, 6]} intensity={1.2} />

        {/* Softer, elegant star background */}
        <Stars radius={80} count={500} factor={3} fade />

        <SpreadCloud words={words} />

        <OrbitControls enableZoom enablePan enableRotate />
      </Canvas>
    </div>
  );
}
