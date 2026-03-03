/**
 * Scroll reveal animation composable using Intersection Observer
 * Provides smooth entrance animations for elements as they enter viewport
 */
import { onMounted, onUnmounted } from 'vue';

export function useScrollReveal(containerRef, options = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -60px 0px',
    animationClass = 'revealed',
    selector = '.reveal-item',
  } = options;

  let observer = null;

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(animationClass);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin },
    );

    const container = containerRef?.value || document;
    const elements = container.querySelectorAll(selector);
    elements.forEach((el) => observer.observe(el));
  });

  onUnmounted(() => {
    observer?.disconnect();
  });
}

/**
 * Directive-style scroll reveal for individual elements
 */
export function useElementReveal(elementRef, options = {}) {
  const { threshold = 0.15, delay = 0 } = options;
  let observer = null;

  onMounted(() => {
    if (!elementRef.value) return;

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('revealed');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold },
    );

    observer.observe(elementRef.value);
  });

  onUnmounted(() => {
    observer?.disconnect();
  });
}
