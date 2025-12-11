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

  // Soft breathing animation
  useFrame((state) => {
    if (!ref.current) return;

    const t = state.clock.elapsedTime;

    // Tiny floating movement
    ref.current.position.y = position[1] + Math.sin(t * 0.6 + index) * 0.15;
    ref.current.position.x = position[0] + Math.cos(t * 0.4 + index) * 0.1;

    // Soft hover scale animation
    const scale = hovered ? 1.25 : 1;
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

    const MIN_DISTANCE = 2.2; // Minimum distance between words
    const MAX_TRIES = 30;

    words.forEach(() => {
      let pos: [number, number, number];
      let tries = 0;

      do {
        // Larger spread → words fill the screen better
        pos = [
          THREE.MathUtils.randFloatSpread(20), // x range -20 to +20
          THREE.MathUtils.randFloatSpread(10), // y range -10 to +10
          THREE.MathUtils.randFloatSpread(3), // z range -3 to +3
        ];

        tries++;
        // Retry if too close to any existing word
      } while (
        result.some(
          (p) =>
            Math.sqrt(
              Math.pow(p[0] - pos[0], 2) +
                Math.pow(p[1] - pos[1], 2) +
                Math.pow(p[2] - pos[2], 2)
            ) < MIN_DISTANCE
        ) &&
        tries < MAX_TRIES
      );

      result.push(pos);
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
