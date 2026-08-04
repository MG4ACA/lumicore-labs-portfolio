<script setup>
/**
 * ServicesView - Dedicated services page
 */
import ContactSection from '../components/ContactSection.vue';
import ServicesSection from '../components/ServicesSection.vue';
</script>

<template>
  <div class="services-view">
    <div class="page-hero">
      <div class="container">
        <span class="page-label">Our Expertise</span>
        <h1 class="page-title">
          Full-spectrum
          <br />
          <span class="gradient-text">engineering services</span>
        </h1>
        <p class="page-desc">
          We build every layer of your product — from pixel-perfect interfaces to bulletproof
          backend architecture.
        </p>
      </div>
    </div>
    <ServicesSection />
    <ContactSection />
  </div>
</template>

<style scoped>
.services-view {
  position: relative;
  z-index: 1;
}

.page-label {
  display: inline-block;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent-color);
  margin-bottom: 1rem;
}

.page-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 1.5rem;
  color: var(--text-color);
}

.gradient-text {
  background: linear-gradient(135deg, #8b5cf6, #3b82f6, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-desc {
  max-width: 550px;
  margin: 0 auto;
  font-size: 1.1rem;
  color: var(--text-secondary-color);
  line-height: 1.7;
}
</style>
