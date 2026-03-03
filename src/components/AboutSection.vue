<script setup>
/**
 * About Section - Positioning + animated stat counters
 */
import { onMounted, ref } from 'vue';
import { useCountUp } from '../composables/useCountUp';
import { stats } from '../data/mockData';

const sectionRef = ref(null);
const isVisible = ref(false);

// Counter refs
const statRefs = ref([]);
const counters = stats.map((stat, i) => {
  const elRef = ref(null);
  return {
    ...stat,
    elRef,
    count: useCountUp(stat.value, 2000 + i * 200, elRef),
  };
});

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        observer.disconnect();
      }
    },
    { threshold: 0.2 },
  );
  if (sectionRef.value) observer.observe(sectionRef.value);
});
</script>

<template>
  <section id="about" ref="sectionRef" class="about-section">
    <div class="about-container">
      <!-- Header -->
      <div class="about-header" :class="{ 'slide-up': isVisible }">
        <span class="section-label">About Lumicore Labs</span>
        <h2 class="section-title">
          We don't just build software.
          <br />
          <span class="gradient-text">We engineer competitive advantages.</span>
        </h2>
        <p class="section-desc">
          Lumicore Labs is a specialized web development and SaaS engineering studio. We partner
          with ambitious startup founders who need more than a vendor — they need a technical
          co-pilot who understands product, scale, and speed.
        </p>
      </div>

      <!-- Values -->
      <div class="values-grid" :class="{ 'slide-up': isVisible }">
        <div class="value-card">
          <div class="value-icon"><i class="pi pi-bolt"></i></div>
          <h3>Engineering-First</h3>
          <p>
            Every decision is driven by technical excellence, not shortcuts. Clean code, scalable
            architecture, always.
          </p>
        </div>
        <div class="value-card">
          <div class="value-icon"><i class="pi pi-users"></i></div>
          <h3>Founder-Aligned</h3>
          <p>
            We think like co-founders. Your runway, your metrics, your growth — we optimize for what
            matters to you.
          </p>
        </div>
        <div class="value-card">
          <div class="value-icon"><i class="pi pi-globe"></i></div>
          <h3>Global Delivery</h3>
          <p>
            Serving clients across 12+ countries with async-first workflows and timezone-smart
            communication.
          </p>
        </div>
      </div>

      <!-- Stats -->
      <div class="stats-grid">
        <div
          v-for="(stat, i) in counters"
          :key="i"
          :ref="
            (el) => {
              if (el) stat.elRef.value = el;
            }
          "
          class="stat-card"
          :class="{ 'slide-up': isVisible }"
          :style="{ transitionDelay: `${0.3 + i * 0.1}s` }"
        >
          <span class="stat-value">{{ stat.count.value }}{{ stat.suffix }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  position: relative;
  padding: 6rem 2rem;
  z-index: 2;
}

.about-container {
  max-width: 1100px;
  margin: 0 auto;
}

.about-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-label {
  display: inline-block;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent-color);
  margin-bottom: 1rem;
}

.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin-bottom: 1.5rem;
  color: var(--text-color);
}

.gradient-text {
  background: linear-gradient(135deg, #8b5cf6, #3b82f6, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-desc {
  max-width: 650px;
  margin: 0 auto;
  font-size: 1.1rem;
  color: var(--text-secondary-color);
  line-height: 1.7;
}

/* Values grid */
.values-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;
}

.value-card {
  padding: 2rem;
  background: var(--surface-card);
  border: 1px solid var(--surface-border);
  border-radius: 20px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  backdrop-filter: blur(12px);
}

[data-theme='dark'] .value-card {
  background: rgba(15, 23, 42, 0.6);
}

.value-card:hover {
  transform: translateY(-6px);
  border-color: var(--accent-color);
  box-shadow: var(--glow);
}

.value-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto 1rem;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(99, 102, 241, 0.15));
  border-radius: 16px;
  display: grid;
  place-items: center;
  font-size: 1.5rem;
  color: var(--accent-color);
}

.value-card h3 {
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.value-card p {
  font-size: 0.95rem;
  color: var(--text-secondary-color);
  line-height: 1.6;
}

/* Stats */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.stat-card {
  text-align: center;
  padding: 2rem 1rem;
  background: var(--surface-card);
  border: 1px solid var(--surface-border);
  border-radius: 20px;
  backdrop-filter: blur(12px);
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

[data-theme='dark'] .stat-card {
  background: rgba(15, 23, 42, 0.6);
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--glow);
}

.stat-value {
  display: block;
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #8b5cf6, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-secondary-color);
  font-weight: 500;
}

/* Slide-up animation */
.slide-up {
  animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 960px) {
  .values-grid {
    grid-template-columns: 1fr;
  }
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .stats-grid {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  .about-section {
    padding: 4rem 1.5rem;
  }
}
</style>
