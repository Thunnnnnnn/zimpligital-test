// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  css: ["bootstrap/dist/css/bootstrap.min.css"],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  hub: {
    db: "postgresql",
  },
  runtimeConfig: {
    public: {
      DATABASE_URL:
        process.env.DATABASE_URL,
    },
  },
});
