// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxtjs/supabase', 'nuxt-api-party'],
  supabase: {
    redirect: false
  },
  apiParty: {
    endpoints: {
      jsonPlaceholder: {
        url: "https://nominatim.openstreetmap.org",
        // Global headers sent with each request
        headers: {
        }
      }
    }
  }
})