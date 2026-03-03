/**
 * Theme management composable
 * Handles dark/light mode toggling with smooth transitions
 */
import { onMounted, ref, watch } from 'vue';

const theme = ref(localStorage.getItem('lumicore-theme') || 'dark');

export function useTheme() {
  const isDark = ref(theme.value === 'dark');

  const applyTheme = () => {
    document.documentElement.setAttribute('data-theme', theme.value);
    document.documentElement.classList.toggle('dark', theme.value === 'dark');
    localStorage.setItem('lumicore-theme', theme.value);
    isDark.value = theme.value === 'dark';
  };

  const toggleTheme = () => {
    // Add transition class for smooth theme switch
    document.documentElement.classList.add('theme-transitioning');
    theme.value = theme.value === 'dark' ? 'light' : 'dark';
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
    }, 500);
  };

  onMounted(applyTheme);
  watch(theme, applyTheme);

  return { theme, isDark, toggleTheme };
}
