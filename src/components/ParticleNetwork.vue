<script setup>
/**
 * ParticleNetwork - Interactive Three.js particle background
 * Neural mesh effect with mouse-reactive particles
 * Performance-optimized with requestAnimationFrame
 */
import * as THREE from 'three';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useTheme } from '../composables/useTheme';

const canvasRef = ref(null);
const { isDark } = useTheme();

let scene, camera, renderer, particles, lines;
let mouseX = 0,
  mouseY = 0;
let animationId = null;
let positions, velocities, particleCount;

const PARTICLE_COUNT = 120;
const CONNECTION_DISTANCE = 150;
const MOUSE_INFLUENCE = 80;

onMounted(() => {
  if (!canvasRef.value) return;
  init();
  animate();
  window.addEventListener('resize', onResize);
  window.addEventListener('mousemove', onMouseMove);
});

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId);
  window.removeEventListener('resize', onResize);
  window.removeEventListener('mousemove', onMouseMove);
  renderer?.dispose();
  scene?.clear();
});

watch(isDark, () => {
  updateColors();
});

function init() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
  camera.position.z = 400;

  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    alpha: true,
    antialias: false,
    powerPreference: 'low-power',
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  particleCount = PARTICLE_COUNT;

  // Create particles
  const geometry = new THREE.BufferGeometry();
  positions = new Float32Array(particleCount * 3);
  velocities = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * width;
    positions[i * 3 + 1] = (Math.random() - 0.5) * height;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 200;

    velocities[i * 3] = (Math.random() - 0.5) * 0.5;
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    size: 2.5,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // Connection lines
  const lineGeometry = new THREE.BufferGeometry();
  const linePositions = new Float32Array(particleCount * particleCount * 6);
  lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  lineGeometry.setDrawRange(0, 0);

  const lineMaterial = new THREE.LineBasicMaterial({
    transparent: true,
    opacity: 0.15,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  lines = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(lines);

  updateColors();
}

function updateColors() {
  if (!particles || !lines) return;

  if (isDark.value) {
    particles.material.color.setHex(0x8b5cf6);
    lines.material.color.setHex(0x6366f1);
  } else {
    particles.material.color.setHex(0x7c3aed);
    lines.material.color.setHex(0xa78bfa);
    particles.material.opacity = 0.4;
    lines.material.opacity = 0.08;
  }
}

function animate() {
  animationId = requestAnimationFrame(animate);

  // Update particle positions
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] += velocities[i * 3];
    positions[i * 3 + 1] += velocities[i * 3 + 1];
    positions[i * 3 + 2] += velocities[i * 3 + 2];

    // Boundary wrapping
    const hw = window.innerWidth / 2;
    const hh = window.innerHeight / 2;
    if (positions[i * 3] > hw) positions[i * 3] = -hw;
    if (positions[i * 3] < -hw) positions[i * 3] = hw;
    if (positions[i * 3 + 1] > hh) positions[i * 3 + 1] = -hh;
    if (positions[i * 3 + 1] < -hh) positions[i * 3 + 1] = hh;

    // Mouse influence
    const dx = positions[i * 3] - mouseX;
    const dy = positions[i * 3 + 1] - mouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < MOUSE_INFLUENCE) {
      const force = ((MOUSE_INFLUENCE - dist) / MOUSE_INFLUENCE) * 0.02;
      velocities[i * 3] += dx * force;
      velocities[i * 3 + 1] += dy * force;
    }

    // Damping
    velocities[i * 3] *= 0.99;
    velocities[i * 3 + 1] *= 0.99;
    velocities[i * 3 + 2] *= 0.99;
  }

  particles.geometry.attributes.position.needsUpdate = true;

  // Update connections
  const linePositions = lines.geometry.attributes.position.array;
  let lineIndex = 0;

  for (let i = 0; i < particleCount; i++) {
    for (let j = i + 1; j < particleCount; j++) {
      const dx = positions[i * 3] - positions[j * 3];
      const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
      const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (dist < CONNECTION_DISTANCE) {
        linePositions[lineIndex++] = positions[i * 3];
        linePositions[lineIndex++] = positions[i * 3 + 1];
        linePositions[lineIndex++] = positions[i * 3 + 2];
        linePositions[lineIndex++] = positions[j * 3];
        linePositions[lineIndex++] = positions[j * 3 + 1];
        linePositions[lineIndex++] = positions[j * 3 + 2];
      }
    }
  }

  lines.geometry.setDrawRange(0, lineIndex / 3);
  lines.geometry.attributes.position.needsUpdate = true;

  // Subtle camera movement
  camera.position.x += (mouseX * 0.02 - camera.position.x) * 0.02;
  camera.position.y += (-mouseY * 0.02 - camera.position.y) * 0.02;

  renderer.render(scene, camera);
}

function onResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

function onMouseMove(e) {
  mouseX = e.clientX - window.innerWidth / 2;
  mouseY = e.clientY - window.innerHeight / 2;
}
</script>

<template>
  <canvas ref="canvasRef" class="particle-canvas" />
</template>

<style scoped>
.particle-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  opacity: 0.7;
  transition: opacity 0.5s ease;
}
</style>
