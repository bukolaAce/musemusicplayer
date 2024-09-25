// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/icon"],
  runtimeConfig:{
    SPOTIFY_CLIENT_ID:process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET:process.env.SPOTIFY_CLIENT_SECRET

  }

});