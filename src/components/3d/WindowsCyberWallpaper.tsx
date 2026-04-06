"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function DataNodes({ count = 3000 }) {
  const mesh = useRef<THREE.Points>(null!);
  const lightRef = useRef<THREE.PointLight>(null!);
  const elapsedRef = useRef(0);

  const { positions, colors, randoms } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const randoms = new Float32Array(count);

    const baseColor1 = new THREE.Color("#0078D7");
    const baseColor2 = new THREE.Color("#00BCF2");

    for (let i = 0; i < count; i++) {
      // Spread nodes across the screen
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      // Assign a random speed/offset multiplier
      randoms[i] = Math.random();

      // Blend between base colors randomly
      const mixedColor = baseColor1.clone().lerp(baseColor2, Math.random());

      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    return { positions, colors, randoms };
  }, [count]);

  const pointerTracker = useRef(new THREE.Vector2(0, 0));

  useFrame((state, delta) => {
    // Smoothly track mouse pointer for background parallax
    pointerTracker.current.x = THREE.MathUtils.lerp(
      pointerTracker.current.x,
      state.pointer.x * 2,
      0.1,
    );
    pointerTracker.current.y = THREE.MathUtils.lerp(
      pointerTracker.current.y,
      state.pointer.y * 2,
      0.1,
    );

    elapsedRef.current += delta;
    const time = elapsedRef.current;
    const posAttribute = mesh.current.geometry.attributes.position;

    // Organic wave movement (simulating data flow/neural net)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = posAttribute.array[i3];
      const z = posAttribute.array[i3 + 2];

      posAttribute.array[i3 + 1] +=
        Math.sin(time * 0.5 + x * 0.1) * 0.01 * randoms[i];
      posAttribute.array[i3] +=
        Math.cos(time * 0.5 + z * 0.1) * 0.01 * randoms[i];
    }
    posAttribute.needsUpdate = true;

    // Parallax scene rotation based on exact mouse coordinates
    mesh.current.rotation.y = pointerTracker.current.x * 0.1;
    mesh.current.rotation.x = -pointerTracker.current.y * 0.1;

    // Spotlight/Flashlight effect following the mouse
    if (lightRef.current) {
      lightRef.current.position.x = pointerTracker.current.x * 5;
      lightRef.current.position.y = pointerTracker.current.y * 5;
    }
  });

  return (
    <group>
      <pointLight ref={lightRef} distance={15} intensity={3} color="#00BCF2" />
      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            count={count}
            array={colors}
            itemSize={3}
            args={[colors, 3]}
          />
        </bufferGeometry>
        {/* Soft glowing points */}
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default function WindowsCyberWallpaper() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 2]}>
        {/* Deep tech background */}
        <color attach="background" args={["#11000b"]} />
        <ambientLight intensity={0.5} />

        <DataNodes count={4000} />
      </Canvas>
    </div>
  );
}
