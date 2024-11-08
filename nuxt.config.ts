// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  pages: true,
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/eslint",
    "@pinia/nuxt",
    "@primevue/nuxt-module",
  ],
  primevue: {options: {
    theme: 'none'
}
  },
  tailwindcss: {
    cssPath: ['~/assets/css/tailwind.css', { injectPosition: "first" }],
    configPath: 'tailwind.config',
    exposeConfig: {
      level: 2
    },
    config: {},
    viewer: true,
  }
});