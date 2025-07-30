import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        auth: 'auth.html',
        dashboard: 'dashboard.html',
        toolkit: 'eq-toolkit.html',
        'self-awareness': 'self-awareness-exercises.html',
        'self-management': 'self-management-exercises.html',
        'social-awareness': 'social-awareness-exercises.html',
        'relationship-management': 'relationship-management-exercises.html',
        'exercise-detail': 'exercise-emotional-weather.html'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  preview: {
    port: 3000
  }
});