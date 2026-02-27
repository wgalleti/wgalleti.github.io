<script setup>
import { inject } from 'vue'
import WgLogo from './WgLogo.vue'

defineProps({
  currentLang: String
})

const t = inject('t')

const year = new Date().getFullYear()

const socialLinks = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/wgalleti/', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
  { name: 'GitHub', url: 'https://github.com/wgalleti', icon: 'M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z' },
  { name: 'Instagram', url: 'https://www.instagram.com/wgalleti/', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' }
]

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <footer class="relative border-t border-white/[0.06] bg-slate-950/50">
    <div class="container-section py-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <!-- Brand -->
        <div class="md:col-span-1">
          <WgLogo size="md" />
          <p class="text-slate-500 font-body text-sm mt-4 leading-relaxed max-w-xs">
            {{ t('footerDescription') }}
          </p>
        </div>

        <!-- Links -->
        <div>
          <h4 class="font-display font-semibold text-white text-sm mb-4">{{ t('footerLinks') }}</h4>
          <nav class="flex flex-col gap-2.5">
            <button @click="scrollTo('about')" class="text-sm text-slate-500 hover:text-brand-400 transition-colors text-left font-body">{{ t('navAbout') }}</button>
            <button @click="scrollTo('services')" class="text-sm text-slate-500 hover:text-brand-400 transition-colors text-left font-body">{{ t('navServices') }}</button>
            <button @click="scrollTo('tech')" class="text-sm text-slate-500 hover:text-brand-400 transition-colors text-left font-body">{{ t('navTech') }}</button>
            <button @click="scrollTo('products')" class="text-sm text-slate-500 hover:text-brand-400 transition-colors text-left font-body">{{ t('navProducts') }}</button>
            <button @click="scrollTo('contact')" class="text-sm text-slate-500 hover:text-brand-400 transition-colors text-left font-body">{{ t('navContact') }}</button>
          </nav>
        </div>

        <!-- Contact info -->
        <div>
          <h4 class="font-display font-semibold text-white text-sm mb-4">{{ t('footerContact') }}</h4>
          <div class="flex flex-col gap-2.5 text-sm text-slate-500 font-body">
            <a href="mailto:william.galleti@gmail.com" class="hover:text-brand-400 transition-colors">william.galleti@gmail.com</a>
            <a href="https://wa.me/5565999448004" target="_blank" class="hover:text-brand-400 transition-colors">+55 65 99944-8004</a>
            <p>{{ t('footerCnpj') }}: 50.326.042/0001-95</p>
          </div>
          <!-- Social -->
          <div class="flex items-center gap-3 mt-5">
            <a
              v-for="link in socialLinks"
              :key="link.name"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-slate-500 hover:text-brand-400 hover:border-brand-400/30 hover:bg-brand-400/5 transition-all duration-300"
              :title="link.name"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path :d="link.icon"/></svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="divider-gradient mb-6"></div>
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 font-body">
        <p>&copy; {{ year }} wGalleti Tech. {{ t('footerRights') }}</p>
        <p>{{ t('footerMadeWith') }} <span class="text-brand-400">&#9829;</span> &amp; Vue.js</p>
      </div>
    </div>
  </footer>
</template>
