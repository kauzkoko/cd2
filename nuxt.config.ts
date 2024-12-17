// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      arenaApiToken: process.env.NUXT_ARENA_API_TOKEN,
    },
  },
  ssr: false,
  modules: ["@vueuse/nuxt", "@unocss/nuxt"],
  app: {
    head: {
      script: [
        {
          src: "/p5.min.js",
        },
      ],
    },
  },
});
