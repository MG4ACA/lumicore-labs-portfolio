/**
 * Animated counter composable
 * Smoothly counts up from 0 to target value when element enters viewport
 */
import { onMounted, onUnmounted, ref } from 'vue';

export function useCountUp(targetValue, duration = 2000, elementRef = null) {
  const count = ref(0);
  let observer = null;
  let animationFrame = null;

  const animate = () => {
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      count.value = Math.round(eased * targetValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);
  };

  onMounted(() => {
    if (!elementRef?.value) {
      animate();
      return;
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(elementRef.value);
  });

  onUnmounted(() => {
    observer?.disconnect();
    if (animationFrame) cancelAnimationFrame(animationFrame);
  });

  return count;
}
