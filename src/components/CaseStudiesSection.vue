<script setup>
/**
 * Case Studies Section - Filterable grid with hover overlays
 * Smooth image zoom and category filtering
 */
import { computed, onMounted, ref } from 'vue';
import { caseStudies, categories } from '../data/mockData';

const activeCategory = ref('All');
const isVisible = ref(false);
const sectionRef = ref(null);

const filteredStudies = computed(() => {
  if (activeCategory.value === 'All') return caseStudies;
  return caseStudies.filter((s) => s.category === activeCategory.value);
});

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
  <section id="case-studies" ref="sectionRef" class="cases-section">
    <div class="cases-container">
      <!-- Header -->
      <div class="cases-header" :class="{ 'slide-up': isVisible }">
        <span class="section-label">Our Work</span>
        <h2 class="section-title">
          Case studies that
          <br />
          <span class="gradient-text">speak for themselves</span>
        </h2>
      </div>

      <!-- Filter tabs -->
      <div class="filter-tabs" :class="{ 'slide-up': isVisible }">
        <button
          v-for="cat in categories"
          :key="cat"
          class="filter-tab"
          :class="{ active: activeCategory === cat }"
          @click="activeCategory = cat"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Grid -->
      <div class="cases-grid">
        <TransitionGroup name="case-card">
          <div
            v-for="(study, i) in filteredStudies"
            :key="study.id"
            class="case-card"
            :class="{ 'slide-up': isVisible }"
            :style="{ transitionDelay: `${0.1 + i * 0.1}s` }"
          >
            <!-- Image -->
            <div class="case-image-wrap">
              <img :src="study.image" :alt="study.title" class="case-image" loading="lazy" />
              <div class="case-overlay">
                <div class="overlay-content">
                  <div class="case-metrics">
                    <div v-for="(val, key) in study.metrics" :key="key" class="metric">
                      <span class="metric-value">{{ val }}</span>
                      <span class="metric-key">{{ key }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Info -->
            <div class="case-info">
              <div class="case-top">
                <span
                  class="case-category"
                  :style="{ color: study.color, borderColor: study.color + '40' }"
                >
                  {{ study.category }}
                </span>
              </div>
              <h3 class="case-title">{{ study.title }}</h3>
              <p class="case-desc">{{ study.description }}</p>
              <div class="case-tags">
                <span v-for="tag in study.tags" :key="tag" class="case-tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cases-section {
  position: relative;
  padding: 6rem 2rem;
  z-index: 2;
}

.cases-container {
  max-width: 1200px;
  margin: 0 auto;
}

.cases-header {
  text-align: center;
  margin-bottom: 2.5rem;
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
  color: var(--text-color);
}

.gradient-text {
  background: linear-gradient(135deg, #8b5cf6, #3b82f6, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Filters */
.filter-tabs {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.filter-tab {
  padding: 0.5rem 1.25rem;
  border: 1px solid var(--surface-border);
  border-radius: 100px;
  background: transparent;
  color: var(--text-secondary-color);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-tab:hover {
  border-color: var(--accent-color);
  color: var(--accent-color);
}

.filter-tab.active {
  background: linear-gradient(135deg, #8b5cf6, #6366f1);
  color: white;
  border-color: transparent;
}

/* Grid */
.cases-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.case-card {
  background: var(--surface-card);
  border: 1px solid var(--surface-border);
  border-radius: 24px;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  backdrop-filter: blur(12px);
}

[data-theme='dark'] .case-card {
  background: rgba(15, 23, 42, 0.5);
}

.case-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--glow);
}

/* Image & overlay */
.case-image-wrap {
  position: relative;
  overflow: hidden;
  aspect-ratio: 3 / 2;
}

.case-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.case-card:hover .case-image {
  transform: scale(1.08);
}

.case-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(11, 15, 25, 0.9), rgba(11, 15, 25, 0.3));
  opacity: 0;
  transition: opacity 0.4s ease;
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;
}

.case-card:hover .case-overlay {
  opacity: 1;
}

.case-metrics {
  display: flex;
  gap: 1.5rem;
}

.metric {
  text-align: center;
}

.metric-value {
  display: block;
  font-size: 1.25rem;
  font-weight: 800;
  color: white;
}

.metric-key {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  text-transform: capitalize;
}

/* Info */
.case-info {
  padding: 1.5rem;
}

.case-top {
  margin-bottom: 0.5rem;
}

.case-category {
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border: 1px solid;
  border-radius: 6px;
}

.case-title {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.case-desc {
  font-size: 0.9rem;
  color: var(--text-secondary-color);
  line-height: 1.5;
  margin-bottom: 1rem;
}

.case-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.case-tag {
  font-size: 0.75rem;
  padding: 0.2rem 0.6rem;
  background: rgba(139, 92, 246, 0.08);
  border-radius: 6px;
  color: var(--text-secondary-color);
}

/* TransitionGroup */
.case-card-enter-active {
  transition: all 0.5s ease;
}
.case-card-leave-active {
  transition: all 0.3s ease;
}
.case-card-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
.case-card-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Slide-up */
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
  .cases-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .cases-grid {
    grid-template-columns: 1fr;
  }
  .cases-section {
    padding: 4rem 1.5rem;
  }
}
</style>
