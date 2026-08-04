<script setup>
/**
 * Services Section - Expandable cards with hover effects
 * Glassmorphism cards with technology tags
 */
import { onMounted, ref } from 'vue';
import { services } from '../data/mockData';

const expandedId = ref(null);
const isVisible = ref(false);
const sectionRef = ref(null);

const toggleExpand = (id) => {
  expandedId.value = expandedId.value === id ? null : id;
};

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        observer.disconnect();
      }
    },
    { threshold: 0.1 },
  );
  if (sectionRef.value) observer.observe(sectionRef.value);
});
</script>

<template>
  <section id="services" ref="sectionRef" class="services-section">
    <div class="services-container">
      <!-- Header -->
      <div class="services-header" :class="{ 'slide-up': isVisible }">
        <span class="section-label">What We Build</span>
        <h2 class="section-title">
          Services designed for
          <br />
          <span class="gradient-text">ambitious startups</span>
        </h2>
        <p class="section-desc">
          From concept to scale — we cover the full spectrum of product engineering with obsessive
          attention to quality and speed.
        </p>
      </div>

      <!-- Services grid -->
      <div class="services-grid">
        <div
          v-for="(service, i) in services"
          :key="service.id"
          class="service-card"
          :class="{
            expanded: expandedId === service.id,
            'slide-up': isVisible,
          }"
          :style="{ transitionDelay: `${0.1 + i * 0.1}s` }"
          @click="toggleExpand(service.id)"
        >
          <!-- Top accent glow -->
          <div
            class="card-glow"
            :style="{ background: `linear-gradient(135deg, ${service.color}20, transparent)` }"
          />

          <!-- Icon -->
          <div class="service-icon" :style="{ color: service.color }">
            <i :class="service.icon"></i>
          </div>

          <!-- Content -->
          <h3 class="service-title">{{ service.title }}</h3>
          <p class="service-desc">{{ service.shortDesc }}</p>

          <!-- Expanded content -->
          <div class="service-expanded" v-show="expandedId === service.id">
            <p class="service-full-desc">{{ service.fullDesc }}</p>
            <div class="tech-tags">
              <span v-for="tech in service.technologies" :key="tech" class="tech-tag">
                {{ tech }}
              </span>
            </div>
          </div>

          <!-- Expand indicator -->
          <div class="expand-indicator">
            <i :class="['pi', expandedId === service.id ? 'pi-minus' : 'pi-plus']"></i>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services-section {
  position: relative;
  padding: 6rem 2rem;
  z-index: 2;
}

.services-container {
  max-width: 1100px;
  margin: 0 auto;
}

.services-header {
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
  max-width: 550px;
  margin: 0 auto;
  font-size: 1.1rem;
  color: var(--text-secondary-color);
  line-height: 1.7;
}

/* Services grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.service-card {
  position: relative;
  padding: 2.25rem;
  background: var(--surface-card);
  border: 1px solid var(--surface-border);
  border-radius: 24px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  backdrop-filter: blur(12px);
}

[data-theme='dark'] .service-card {
  background: rgba(15, 23, 42, 0.5);
}

.service-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--glow);
  border-color: rgba(139, 92, 246, 0.3);
}

.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 120px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.service-card:hover .card-glow {
  opacity: 1;
}

.service-icon {
  font-size: 2rem;
  margin-bottom: 1.25rem;
  transition: transform 0.4s ease;
}

.service-card:hover .service-icon {
  transform: scale(1.1);
}

.service-title {
  font-size: 1.35rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--text-color);
}

.service-desc {
  font-size: 0.95rem;
  color: var(--text-secondary-color);
  line-height: 1.6;
}

/* Expanded state */
.service-expanded {
  margin-top: 1.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--surface-border);
  animation: fadeIn 0.4s ease;
}

.service-full-desc {
  font-size: 0.95rem;
  color: var(--text-secondary-color);
  line-height: 1.7;
  margin-bottom: 1rem;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  padding: 0.3rem 0.75rem;
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 8px;
  font-size: 0.8rem;
  color: var(--accent-color);
  font-weight: 500;
}

.expand-indicator {
  position: absolute;
  top: 2rem;
  right: 2rem;
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: rgba(139, 92, 246, 0.1);
  color: var(--accent-color);
  font-size: 0.85rem;
  transition: all 0.3s ease;
}

.service-card:hover .expand-indicator {
  background: rgba(139, 92, 246, 0.2);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
  .services-section {
    padding: 4rem 1.5rem;
  }
}
</style>
