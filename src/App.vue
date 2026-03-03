<script setup>
/**
 * App.vue - Root layout with header, navigation, side rail, and footer
 * Handles theme management and page transitions
 */
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ParticleNetwork from './components/ParticleNetwork.vue';
import { useTheme } from './composables/useTheme';

const router = useRouter();
const route = useRoute();
const { isDark, toggleTheme } = useTheme();

const navItems = [
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: () => router.push('/'),
  },
  {
    label: 'Services',
    icon: 'pi pi-th-large',
    command: () => router.push('/services'),
  },
  {
    label: 'About',
    icon: 'pi pi-info-circle',
    command: () => router.push('/about'),
  },
  {
    label: 'Contact',
    icon: 'pi pi-send',
    command: () => router.push('/contact'),
  },
];

const homeAnchors = [
  { icon: 'pi pi-sparkles', href: '#hero', label: 'Top' },
  { icon: 'pi pi-info-circle', href: '#about', label: 'About' },
  { icon: 'pi pi-th-large', href: '#services', label: 'Services' },
  { icon: 'pi pi-briefcase', href: '#case-studies', label: 'Work' },
  { icon: 'pi pi-star', href: '#testimonials', label: 'Reviews' },
  { icon: 'pi pi-send', href: '#contact', label: 'Contact' },
];

const servicesAnchors = [{ icon: 'pi pi-th-large', href: '#services', label: 'Services' }];

const aboutAnchors = [{ icon: 'pi pi-heart', href: '#about', label: 'About' }];

const contactAnchors = [{ icon: 'pi pi-send', href: '#contact', label: 'Contact' }];

const anchors = computed(() => {
  switch (route.name) {
    case 'home':
      return homeAnchors;
    case 'services':
      return servicesAnchors;
    case 'about':
      return aboutAnchors;
    case 'contact':
      return contactAnchors;
    default:
      return [];
  }
});
</script>

<template>
  <div class="app-container">
    <!-- Three.js Background -->
    <ParticleNetwork />

    <!-- Header -->
    <header class="sticky top-0 z-50 app-header" style="height: var(--nav-height)">
      <Menubar :model="navItems" class="px-4 py-2">
        <template #start>
          <div class="flex items-center gap-2 cursor-pointer" @click="router.push('/')">
            <img src="/logo.png" alt="Lumicore Labs Logo" class="logo-image" />
            <span class="text-lg font-bold" style="color: var(--text-color)">
              Lumicore
              <span style="color: var(--accent-color)">Labs</span>
            </span>
          </div>
        </template>
        <template #end>
          <div class="flex items-center gap-3">
            <!-- Theme toggle -->
            <button
              class="theme-toggle"
              @click="toggleTheme"
              :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            >
              <i :class="['pi', isDark ? 'pi-sun' : 'pi-moon']"></i>
            </button>
            <!-- CTA button -->
            <button class="nav-cta" @click="router.push('/contact')">Let's Talk</button>
          </div>
        </template>
      </Menubar>
    </header>

    <!-- Side Rail -->
    <nav class="side-rail" aria-label="Section quick nav">
      <a v-for="link in anchors" :key="link.href" :href="link.href" :title="link.label">
        <i :class="link.icon"></i>
      </a>
    </nav>

    <!-- Main Content -->
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Footer -->
    <footer class="site-footer py-16">
      <div class="container">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Brand -->
          <div>
            <div class="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="Lumicore Labs Logo" class="logo-image-footer" />
              <span class="text-xl font-bold">
                Lumicore
                <span style="color: var(--accent-color)">Labs</span>
              </span>
            </div>
            <p class="opacity-80 text-sm leading-relaxed">
              Engineering digital intelligence for ambitious startups. High-performance web
              platforms, SaaS products, and digital experiences.
            </p>
          </div>

          <!-- Links -->
          <div>
            <h3 class="text-base font-bold mb-4">Quick Links</h3>
            <ul class="list-none p-0 space-y-2">
              <li>
                <router-link to="/" class="animated-link opacity-80 text-sm">Home</router-link>
              </li>
              <li>
                <router-link to="/services" class="animated-link opacity-80 text-sm">
                  Services
                </router-link>
              </li>
              <li>
                <router-link to="/about" class="animated-link opacity-80 text-sm">
                  About
                </router-link>
              </li>
              <li>
                <router-link to="/contact" class="animated-link opacity-80 text-sm">
                  Contact
                </router-link>
              </li>
            </ul>
          </div>

          <!-- Connect -->
          <div>
            <h3 class="text-base font-bold mb-4">Connect</h3>
            <div class="flex gap-3 mb-4">
              <a href="#" class="footer-social" aria-label="Twitter">
                <i class="pi pi-twitter"></i>
              </a>
              <a href="#" class="footer-social" aria-label="LinkedIn">
                <i class="pi pi-linkedin"></i>
              </a>
              <a href="#" class="footer-social" aria-label="GitHub">
                <i class="pi pi-github"></i>
              </a>
              <a href="#" class="footer-social" aria-label="Instagram">
                <i class="pi pi-instagram"></i>
              </a>
            </div>
            <p class="opacity-60 text-sm">hello@lumicorelabs.com</p>
            <p class="mt-4 opacity-50 text-xs">© 2026 Lumicore Labs. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.logo-image {
  height: 40px;
  width: auto;
  object-fit: contain;
  transition: opacity 0.3s ease;
}

.logo-image:hover {
  opacity: 0.8;
}

.logo-image-footer {
  height: 36px;
  width: auto;
  object-fit: contain;
}

.nav-cta {
  padding: 0.55rem 1.25rem;
  background: linear-gradient(135deg, #8b5cf6, #6366f1);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.35);
}

.footer-social {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: all 0.3s ease;
  font-size: 1rem;
}

.footer-social:hover {
  border-color: var(--accent-color);
  color: var(--accent-color) !important;
  background: rgba(139, 92, 246, 0.1);
}
</style>
