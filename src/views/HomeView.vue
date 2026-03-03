<script setup>
/**
 * HomeView - Main landing page with all sections
 * Composition of Hero, About, Services, CaseStudies, Testimonials, Contact
 */
import AboutSection from '../components/AboutSection.vue';
import CaseStudiesSection from '../components/CaseStudiesSection.vue';
import ContactSection from '../components/ContactSection.vue';
import HeroSection from '../components/HeroSection.vue';
import ServicesSection from '../components/ServicesSection.vue';
import TestimonialsSection from '../components/TestimonialsSection.vue';
</script>

<template>
  <div class="home-view">
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <CaseStudiesSection />
    <TestimonialsSection />
    <ContactSection />
  </div>
</template>

<style scoped>
.home-view {
  position: relative;
  z-index: 1;
}
</style>
