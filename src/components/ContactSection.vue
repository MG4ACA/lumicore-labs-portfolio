<script setup>
/**
 * Contact Section - Premium form with Calendly placeholder
 * PrimeVue form components with validation
 */
import { onMounted, ref } from 'vue';

const isVisible = ref(false);
const sectionRef = ref(null);
const isSubmitted = ref(false);

const form = ref({
  name: '',
  email: '',
  company: '',
  message: '',
});


const handleSubmit = async () => {
  // TODO: Replace with your actual Web3Forms access key from web3forms.com
  const accessKey = '3efe8ce9-c423-49ee-8f39-1d7113534e2d';

  if (!accessKey || accessKey === 'YOUR_ACCESS_KEY_HERE') {
    alert('Please set your Web3Forms access key in ContactSection.vue');
    return;
  }

  isSubmitted.value = true;

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: form.value.name,
        email: form.value.email,
        company: form.value.company,
        message: form.value.message,
        subject: `New Inquiry from ${form.value.name}`,
      }),
    });

    const result = await response.json();
    if (result.success) {
      setTimeout(() => {
        isSubmitted.value = false;
        form.value = { name: '', email: '', company: '', message: '' };
      }, 4000);
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('Error sending message:', error);
    alert('Something went wrong. Please try again later.');
    isSubmitted.value = false;
  }
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
  <section id="contact" ref="sectionRef" class="contact-section">
    <div class="contact-container">
      <div class="contact-grid">
        <!-- Left side - Info -->
        <div class="contact-info" :class="{ 'slide-up': isVisible }">
          <span class="section-label">Let's Talk</span>
          <h2 class="section-title">
            Ready to build
            <br />
            <span class="gradient-text">something remarkable?</span>
          </h2>
          <p class="contact-desc">
            Whether you're launching a new product, scaling an existing platform, or need a
            technical co-pilot — we'd love to hear about your vision.
          </p>

          <!-- Calendly placeholder -->
          <div class="calendly-card">
            <div class="calendly-icon">
              <i class="pi pi-calendar"></i>
            </div>
            <div class="calendly-text">
              <h4>Prefer a live conversation?</h4>
              <p>Book a free 30-minute discovery call</p>
            </div>
            <!-- Replace the href below with your actual Calendly booking link -->
            <a href="https://calendly.com/dev-mg4" target="_blank" rel="noopener noreferrer" class="calendly-btn">
              <span>Schedule Call</span>
              <i class="pi pi-arrow-right"></i>
            </a>
          </div>

          <!-- Contact details -->
          <div class="contact-details">
            <div class="contact-item">
              <i class="pi pi-map-marker"></i>
              <span>Remote-first · Global Delivery</span>
            </div>
          </div>
        </div>

        <!-- Right side - Form -->
        <div class="contact-form-wrap" :class="{ 'slide-up': isVisible }">
          <form class="contact-form" @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="name">Your Name</label>
              <InputText id="name" v-model="form.name" placeholder="John Doe" class="form-input" />
            </div>

            <div class="form-group">
              <label for="email">Work Email</label>
              <InputText
                id="email"
                v-model="form.email"
                type="email"
                placeholder="john@startup.com"
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label for="company">Company</label>
              <InputText
                id="company"
                v-model="form.company"
                placeholder="Your Startup Inc."
                class="form-input"
              />
            </div>


            <div class="form-group">
              <label for="message">Tell us about your project</label>
              <Textarea
                id="message"
                v-model="form.message"
                rows="4"
                placeholder="Describe your project, goals, and timeline..."
                class="form-input"
              />
            </div>

            <Button type="submit" class="submit-btn" :disabled="isSubmitted">
              <template v-if="!isSubmitted">
                <span>Send Message</span>
                <i class="pi pi-send"></i>
              </template>
              <template v-else>
                <i class="pi pi-check"></i>
                <span>Message Sent!</span>
              </template>
            </Button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  position: relative;
  padding: 6rem 2rem;
  z-index: 2;
}

.contact-container {
  max-width: 1100px;
  margin: 0 auto;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

/* Info side */
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
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin-bottom: 1.25rem;
  color: var(--text-color);
}

.gradient-text {
  background: linear-gradient(135deg, #8b5cf6, #3b82f6, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.contact-desc {
  font-size: 1.05rem;
  color: var(--text-secondary-color);
  line-height: 1.7;
  margin-bottom: 2rem;
}

/* Calendly placeholder */
.calendly-card {
  padding: 1.5rem;
  background: var(--surface-card);
  border: 1px solid var(--surface-border);
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(12px);
  transition: all 0.4s ease;
}

[data-theme='dark'] .calendly-card {
  background: rgba(15, 23, 42, 0.5);
}

.calendly-card:hover {
  border-color: var(--accent-color);
  box-shadow: var(--glow);
}

.calendly-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(99, 102, 241, 0.15));
  border-radius: 14px;
  display: grid;
  place-items: center;
  color: var(--accent-color);
  font-size: 1.25rem;
  flex-shrink: 0;
}

.calendly-text {
  flex: 1;
}

.calendly-text h4 {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 0.15rem;
}

.calendly-text p {
  font-size: 0.85rem;
  color: var(--text-secondary-color);
}

.calendly-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.25rem;
  background: linear-gradient(135deg, #8b5cf6, #6366f1);
  color: white;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
  transition: all 0.3s ease;
}

.calendly-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.35);
  color: white;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-secondary-color);
  font-size: 0.95rem;
}

.contact-item i {
  color: var(--accent-color);
}

/* Form side */
.contact-form-wrap {
  padding: 2.5rem;
  background: var(--surface-card);
  border: 1px solid var(--surface-border);
  border-radius: 28px;
  backdrop-filter: blur(12px);
}

[data-theme='dark'] .contact-form-wrap {
  background: rgba(15, 23, 42, 0.5);
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.form-input {
  width: 100% !important;
}

/* Override PrimeVue input styles */
:deep(.p-inputtext),
:deep(.p-textarea) {
  width: 100%;
  background: var(--surface-ground) !important;
  border: 1px solid var(--surface-border) !important;
  border-radius: 14px !important;
  padding: 0.85rem 1rem !important;
  color: var(--text-color) !important;
  font-size: 0.95rem !important;
  transition: all 0.3s ease !important;
}

:deep(.p-inputtext:focus),
:deep(.p-textarea:focus) {
  border-color: var(--accent-color) !important;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.15) !important;
}


/* Submit button */
.submit-btn {
  width: 100%;
  padding: 1rem !important;
  background: linear-gradient(135deg, #8b5cf6, #6366f1) !important;
  border: none !important;
  border-radius: 14px !important;
  font-size: 1.05rem !important;
  font-weight: 600 !important;
  display: flex !important;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.4s ease !important;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(139, 92, 246, 0.35);
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
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}

@media (max-width: 640px) {
  .contact-section {
    padding: 4rem 1.5rem;
  }
  .contact-form-wrap {
    padding: 1.5rem;
  }
}
</style>
