/**
 * Magnetic button effect composable
 * Creates a subtle magnetic pull toward cursor on hover
 */
import { onMounted, onUnmounted } from 'vue';

export function useMagneticButton(buttonRef, strength = 0.3) {
  let isHovering = false;

  const handleMouseMove = (e) => {
    if (!buttonRef.value || !isHovering) return;

    const rect = buttonRef.value.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    buttonRef.value.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  };

  const handleMouseEnter = () => {
    isHovering = true;
  };

  const handleMouseLeave = () => {
    isHovering = false;
    if (buttonRef.value) {
      buttonRef.value.style.transform = 'translate(0, 0)';
    }
  };

  onMounted(() => {
    if (!buttonRef.value) return;
    buttonRef.value.style.transition = 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)';
    buttonRef.value.addEventListener('mouseenter', handleMouseEnter);
    buttonRef.value.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousemove', handleMouseMove);
  });

  onUnmounted(() => {
    if (!buttonRef.value) return;
    buttonRef.value.removeEventListener('mouseenter', handleMouseEnter);
    buttonRef.value.removeEventListener('mouseleave', handleMouseLeave);
    window.removeEventListener('mousemove', handleMouseMove);
  });
}
