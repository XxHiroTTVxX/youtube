export default defineNuxtConfig({
  devtools: { enabled: true },
  pages: true,
  modules: [
    'nuxt-lucide-icons'
  ],
  lucide: {
    namePrefix: 'Icon'
  }
})