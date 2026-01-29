// vitest.config.js
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/features/auth/_tests_/setup.js",

    exclude: [
      'node_modules', 'dist', 
      '**/__tests__/**/fixtures/**',
      'node_modules/**/*.test.js', 
      'node_modules/**/*.test.jsx'
    ],

    coverage: {
      provider: "v8",
      reportsDirectory: "./coverage",
      reporter: ["text", "html"],
      all: true,
      include: ["src/**/*.{js,jsx}"],
    },
  },
})
