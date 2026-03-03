<script setup>
/**
 * Testimonials Section - Glass cards with carousel
 * PrimeVue-based carousel with smooth transitions
 */
import { onMounted, ref } from 'vue';
import { testimonials } from '../data/mockData';

const isVisible = ref(false);
const sectionRef = ref(null);
const activeIndex = ref(0);
let intervalId = null;

const next = () => {
  activeIndex.value = (activeIndex.value + 1) % testimonials.length;
};

const prev = () => {
  activeIndex.value = (activeIndex.value - 1 + testimonials.length) % testimonials.length;
};

const goTo = (index) => {
  activeIndex.value = index;
  resetInterval();
};

const resetInterval = () => {
  clearInterval(intervalId);
  intervalId = setInterval(next, 6000);
};

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        observer.disconnect();
      }
    },
    { threshold: 0.15 },
  );
  if (sectionRef.value) observer.observe(sectionRef.value);

  intervalId = setInterval(next, 6000);
});
</script>

<template>
  <section id="testimonials" ref="sectionRef" class="testimonials-section">
    <div class="testimonials-container">
      <!-- Header -->
      <div class="testimonials-header" :class="{ 'slide-up': isVisible }">
        <span class="section-label">Client Love</span>
        <h2 class="section-title">
          What founders say
          <br />
          <span class="gradient-text">about working with us</span>
        </h2>
      </div>

      <!-- Testimonial carousel -->
      <div class="testimonial-carousel" :class="{ 'slide-up': isVisible }">
        <div class="carousel-viewport">
          <TransitionGroup name="testimonial">
            <div
              v-for="(t, i) in testimonials"
              v-show="i === activeIndex"
              :key="t.id"
              class="testimonial-slide"
            >
              <div class="glass-card">
                <!-- Quote icon -->
                <div class="quote-icon">
                  <i class="pi pi-comments"></i>
                </div>

                <!-- Quote text -->
                <blockquote class="testimonial-quote">"{{ t.quote }}"</blockquote>

                <!-- Author -->
                <div class="testimonial-author">
                  <img :src="t.avatar" :alt="t.name" class="author-avatar" />
                  <div class="author-info">
                    <span class="author-name">{{ t.name }}</span>
                    <span class="author-role">{{ t.role }}, {{ t.company }}</span>
                  </div>
                  <div class="rating">
                    <i v-for="s in t.rating" :key="s" class="pi pi-star-fill star-icon"></i>
                  </div>
                </div>
              </div>
            </div>
          </TransitionGroup>
        </div>

        <!-- Controls -->
        <div class="carousel-controls">
          <button class="carousel-btn" @click="prev" aria-label="Previous">
            <i class="pi pi-chevron-left"></i>
          </button>

          <div class="carousel-dots">
            <button
              v-for="(_, i) in testimonials"
              :key="i"
              class="dot"
              :class="{ active: i === activeIndex }"
              @click="goTo(i)"
              :aria-label="`Go to testimonial ${i + 1}`"
            />
          </div>

          <button class="carousel-btn" @click="next" aria-label="Next">
            <i class="pi pi-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonials-section {
  position: relative;
  padding: 6rem 2rem;
  z-index: 2;
}

.testimonials-container {
  max-width: 860px;
  margin: 0 auto;
}

.testimonials-header {
  text-align: center;
  margin-bottom: 3rem;
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

/* Carousel */
.carousel-viewport {
  position: relative;
  min-height: 320px;
}

.testimonial-slide {
  width: 100%;
}

.glass-card {
  padding: 3rem;
  background: var(--surface-card);
  border: 1px solid var(--surface-border);
  border-radius: 28px;
  backdrop-filter: blur(16px);
  position: relative;
}

[data-theme='dark'] .glass-card {
  background: rgba(15, 23, 42, 0.5);
  border-color: rgba(139, 92, 246, 0.15);
  box-shadow: 0 8px 40px rgba(139, 92, 246, 0.08);
}

.quote-icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(99, 102, 241, 0.15));
  border-radius: 16px;
  display: grid;
  place-items: center;
  color: var(--accent-color);
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.testimonial-quote {
  font-size: 1.2rem;
  line-height: 1.8;
  color: var(--text-color);
  font-weight: 500;
  margin-bottom: 2rem;
  border: none;
  padding: 0;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--surface-border);
}

.author-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.author-name {
  font-weight: 700;
  color: var(--text-color);
  font-size: 1rem;
}

.author-role {
  font-size: 0.85rem;
  color: var(--text-secondary-color);
}

.rating {
  display: flex;
  gap: 0.25rem;
}

.star-icon {
  color: #f59e0b;
  font-size: 0.9rem;
}

/* Controls */
.carousel-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
}

.carousel-btn {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  border: 1px solid var(--surface-border);
  background: var(--surface-card);
  color: var(--text-color);
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: all 0.3s ease;
}

.carousel-btn:hover {
  border-color: var(--accent-color);
  color: var(--accent-color);
}

.carousel-dots {
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: var(--surface-border);
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background: var(--accent-color);
  width: 28px;
  border-radius: 5px;
}

/* Transitions */
.testimonial-enter-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.testimonial-leave-active {
  transition: all 0.3s ease;
  position: absolute;
  width: 100%;
}

.testimonial-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.testimonial-leave-to {
  opacity: 0;
  transform: translateX(-30px);
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
@media (max-width: 640px) {
  .glass-card {
    padding: 2rem 1.5rem;
  }
  .testimonials-section {
    padding: 4rem 1.5rem;
  }
  .testimonial-author {
    flex-wrap: wrap;
  }
}
</style>
