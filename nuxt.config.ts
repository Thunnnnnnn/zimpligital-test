// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  css: ["bootstrap/dist/css/bootstrap.min.css", "~/assets/css/sweetalert.css"],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },

  hub: {
    db: "postgresql",
  },

  runtimeConfig: {
    public: {
      DATABASE_URL: process.env.DATABASE_URL,
      API_URL: process.env.API_URL,
    },
  },

  modules: ["@pinia/nuxt"],
  // typescript: {
  //   typeCheck: true,
  // },
});
