<script setup>
/**
 * ContactView - Dedicated contact page
 */
import ContactSection from '../components/ContactSection.vue';
</script>

<template>
  <div class="contact-view">
    <div class="page-hero">
      <div class="container">
        <span class="page-label">Get in Touch</span>
        <h1 class="page-title">
          Let's build
          <br />
          <span class="gradient-text">your next big thing</span>
        </h1>
        <p class="page-desc">
          Whether you're launching an MVP or scaling to millions of users, we'd love to hear about
          your vision.
        </p>
      </div>
    </div>
    <ContactSection />
  </div>
</template>

<style scoped>
.contact-view {
  position: relative;
  z-index: 1;
}

.page-hero {
  padding: 8rem 2rem 2rem;
  text-align: center;
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
