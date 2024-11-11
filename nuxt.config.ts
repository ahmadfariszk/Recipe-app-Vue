// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  pages: true,
  ssr: false,
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/<Recipe-app-Vue>/' : '/', 
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/eslint",
    "@pinia/nuxt",
    "@primevue/nuxt-module",
    "nuxt-lodash"
  ],
  primevue: {
    options: {
      theme: "none",
    },
  },
  css: ["@/assets/css/tailwind.css", "@/assets/css/base.css"],
  tailwindcss: {
    cssPath: ["~/assets/css/tailwind.css", { injectPosition: "first" }],
    configPath: "tailwind.config",
    exposeConfig: {
      level: 2,
    },
    config: {},
    viewer: true,
  },
  plugins: [
    { src: '~/plugins/disableHoverOnMobile.ts', mode: 'client' },
    '~/plugins/localFavourites.ts',
    '~/plugins/removeDarkMode.ts'
  ],
  postcss: {
    plugins: {
      "postcss-import": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  lodash: {
    prefix: false,
    prefixSkip: false,
    upperAfterPrefix: false,
  },
});
