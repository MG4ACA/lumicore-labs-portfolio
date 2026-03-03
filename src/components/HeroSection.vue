<script setup>
/**
 * Hero Section - Bold animated headline with CTAs
 * Features animated gradient text, floating glow shapes, magnetic buttons
 */
import { onMounted, ref } from 'vue';
import { useMagneticButton } from '../composables/useMagneticButton';

const heroRef = ref(null);
const ctaPrimary = ref(null);
const ctaSecondary = ref(null);
const isVisible = ref(false);

useMagneticButton(ctaPrimary, 0.25);
useMagneticButton(ctaSecondary, 0.2);

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 100);
});

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: 'smooth' });
};
</script>

<template>
  <section id="hero" ref="heroRef" class="hero-section">
    <!-- Floating glow orbs -->
    <div class="glow-orb orb-1"></div>
    <div class="glow-orb orb-2"></div>
    <div class="glow-orb orb-3"></div>

    <div class="hero-content" :class="{ 'hero-visible': isVisible }">
      <!-- Badge -->
      <div class="hero-badge">
        <span class="badge-dot"></span>
        <span>Web Development & SaaS Engineering Studio</span>
      </div>

      <!-- Headline -->
      <h1 class="hero-headline">
        <span class="hero-line">Engineering</span>
        <span class="hero-line gradient-text">Digital Intelligence</span>
      </h1>

      <!-- Subheadline -->
      <p class="hero-sub">
        We build high-performance web platforms, SaaS products, and digital experiences for
        ambitious startups ready to scale globally.
      </p>

      <!-- CTAs -->
      <div class="hero-ctas">
        <button ref="ctaPrimary" class="cta-primary" @click="scrollToSection('contact')">
          <span>Book a Discovery Call</span>
          <i class="pi pi-arrow-right"></i>
        </button>
        <button ref="ctaSecondary" class="cta-secondary" @click="scrollToSection('case-studies')">
          <span>View Our Work</span>
          <i class="pi pi-external-link"></i>
        </button>
      </div>

      <!-- Trust indicators -->
      <div class="hero-trust">
        <div class="trust-avatars">
          <img
            v-for="i in 4"
            :key="i"
            :src="`https://i.pravatar.cc/80?img=${i + 10}`"
            :alt="`Client ${i}`"
          />
        </div>
        <span class="trust-text">
          Trusted by
          <strong>40+</strong>
          startups worldwide
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8rem 2rem 4rem;
  overflow: hidden;
}

/* Floating glow orbs */
.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  pointer-events: none;
  animation: float 20s ease-in-out infinite;
}

.orb-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.3), transparent 70%);
  top: -10%;
  right: -5%;
  animation-delay: 0s;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.25), transparent 70%);
  bottom: -5%;
  left: -8%;
  animation-delay: -7s;
}

.orb-3 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(236, 72, 153, 0.2), transparent 70%);
  top: 40%;
  left: 50%;
  animation-delay: -14s;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(30px, -30px) scale(1.05);
  }
  50% {
    transform: translate(-20px, 20px) scale(0.95);
  }
  75% {
    transform: translate(20px, 10px) scale(1.02);
  }
}

/* Hero content */
.hero-content {
  max-width: 860px;
  text-align: center;
  position: relative;
  z-index: 2;
  opacity: 0;
  transform: translateY(40px);
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Badge */
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.25rem;
  background: var(--surface-card);
  border: 1px solid var(--surface-border);
  border-radius: 100px;
  font-size: 0.85rem;
  color: var(--text-secondary-color);
  margin-bottom: 2rem;
  backdrop-filter: blur(12px);
}

.badge-dot {
  width: 8px;
  height: 8px;
  background: #22c55e;
  border-radius: 50%;
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.8);
  }
}

/* Headline */
.hero-headline {
  font-size: clamp(3rem, 7vw, 5.5rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.03em;
  margin-bottom: 1.5rem;
}

.hero-line {
  display: block;
}

.gradient-text {
  background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 30%, #06b6d4 60%, #a855f7 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-shift 6s ease-in-out infinite;
}

@keyframes gradient-shift {
  0%,
  100% {
    background-position: 0% center;
  }
  50% {
    background-position: 100% center;
  }
}

/* Subheadline */
.hero-sub {
  font-size: clamp(1.05rem, 2vw, 1.3rem);
  color: var(--text-secondary-color);
  max-width: 600px;
  margin: 0 auto 2.5rem;
  line-height: 1.7;
}

/* CTAs */
.hero-ctas {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 3rem;
}

.cta-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #8b5cf6, #6366f1);
  color: white;
  border: none;
  border-radius: 14px;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  box-shadow: 0 4px 20px rgba(139, 92, 246, 0.35);
}

.cta-primary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #a78bfa, #818cf8);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.cta-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(139, 92, 246, 0.45);
}

.cta-primary:hover::before {
  opacity: 1;
}

.cta-primary span,
.cta-primary i {
  position: relative;
  z-index: 1;
}

.cta-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: transparent;
  color: var(--text-color);
  border: 1px solid var(--surface-border);
  border-radius: 14px;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  backdrop-filter: blur(12px);
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.cta-secondary:hover {
  border-color: var(--accent-color);
  color: var(--accent-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(139, 92, 246, 0.15);
}

/* Trust section */
.hero-trust {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.trust-avatars {
  display: flex;
}

.trust-avatars img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid var(--surface-ground);
  margin-left: -10px;
  object-fit: cover;
}

.trust-avatars img:first-child {
  margin-left: 0;
}

.trust-text {
  font-size: 0.9rem;
  color: var(--text-secondary-color);
}

.trust-text strong {
  color: var(--accent-color);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-section {
    padding: 6rem 1.5rem 3rem;
    min-height: 90vh;
  }

  .hero-ctas {
    flex-direction: column;
    align-items: center;
  }

  .cta-primary,
  .cta-secondary {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
}
</style>
