import { useEffect, useRef } from "react";
import * as THREE from "three";

type Pointer = {
  x: number;
  y: number;
};

function canUseWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")),
    );
  } catch {
    return false;
  }
}

export default function NeuralFieldCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !canUseWebGL()) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer: Pointer = { x: 0, y: 0 };
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setClearColor(0x07111f, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 120);
    camera.position.set(0, 1.3, 8.2);

    const group = new THREE.Group();
    scene.add(group);

    const count = prefersReducedMotion ? 720 : 1800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const colorA = new THREE.Color("#7fb5d6");
    const colorB = new THREE.Color("#c6a25d");
    const colorC = new THREE.Color("#a8433a");

    for (let index = 0; index < count; index += 1) {
      const angle = index * 0.139 + Math.sin(index * 0.011) * 0.45;
      const layer = (index % 97) / 97;
      const radius = 1.4 + Math.sqrt(index / count) * 4.8 + Math.sin(index * 0.027) * 0.5;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius - 1.4;
      const wave = Math.sin(x * 0.95 + z * 0.38) * 0.75;
      const y = wave + (layer - 0.5) * 2.2;
      positions.set([x, y, z], index * 3);

      const mixed = colorA.clone().lerp(colorB, layer * 0.65);
      if (index % 37 === 0) {
        mixed.lerp(colorC, 0.42);
      }
      colors.set([mixed.r, mixed.g, mixed.b], index * 3);
    }

    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pointsGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const pointsMaterial = new THREE.PointsMaterial({
      size: 0.036,
      vertexColors: true,
      transparent: true,
      opacity: 0.86,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    group.add(points);

    const linePositions: number[] = [];
    for (let index = 0; index < count - 19; index += 23) {
      const a = index * 3;
      const b = (index + 19) * 3;
      linePositions.push(
        positions[a],
        positions[a + 1],
        positions[a + 2],
        positions[b],
        positions[b + 1],
        positions[b + 2],
      );
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3),
    );
    const lineMaterial = new THREE.LineBasicMaterial({
      color: "#6788a4",
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    group.add(lines);

    const ringGeometry = new THREE.TorusGeometry(3.9, 0.006, 8, 140);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: "#c6a25d",
      transparent: true,
      opacity: 0.28,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.set(Math.PI * 0.5, 0.2, -0.35);
    group.add(ring);

    function resize() {
      if (!mount) {
        return;
      }
      const { clientWidth, clientHeight } = mount;
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / Math.max(clientHeight, 1);
      camera.updateProjectionMatrix();
    }

    function onPointerMove(event: PointerEvent) {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
    }

    let frame = 0;
    const clock = new THREE.Clock();

    function render() {
      const elapsed = clock.getElapsedTime();
      const scroll = window.scrollY / Math.max(window.innerHeight, 1);

      group.rotation.y = elapsed * 0.045 + pointer.x * 0.16 + scroll * 0.08;
      group.rotation.x = -0.15 + pointer.y * 0.06;
      group.position.y = Math.sin(elapsed * 0.35) * 0.09 - scroll * 0.16;
      ring.rotation.z = -0.35 + elapsed * 0.055;
      ring.rotation.x = Math.PI * 0.5 + Math.sin(elapsed * 0.2) * 0.08;

      renderer.render(scene, camera);
      if (!prefersReducedMotion) {
        frame = window.requestAnimationFrame(render);
      }
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.cancelAnimationFrame(frame);
      pointsGeometry.dispose();
      pointsMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="neural-field" aria-hidden="true" />;
}
