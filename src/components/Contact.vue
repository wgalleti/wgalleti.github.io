<script setup>
import { inject } from 'vue'

defineProps({
  currentLang: String
})

const t = inject('t')

const whatsappUrl = 'https://wa.me/5565999448004?text=' + encodeURIComponent('Olá! Vim pelo site da wGalleti Tech e gostaria de saber mais sobre as soluções de vocês.')
</script>

<template>
  <section id="contact" class="section-padding relative overflow-hidden">
    <!-- Background accent -->
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-brand-950/30 to-transparent pointer-events-none"></div>

    <div class="container-section relative z-10">
      <!-- Section header -->
      <div class="text-center mb-16 reveal">
        <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-display font-medium bg-brand-500/10 text-brand-300 border border-brand-500/20 mb-6">
          {{ t('contactTag') }}
        </span>
        <h2 class="heading-section text-white mb-6">{{ t('contactTitle') }}</h2>
        <p class="text-lg text-slate-400 max-w-2xl mx-auto font-body">{{ t('contactDescription') }}</p>
      </div>

      <div class="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        <!-- WhatsApp CTA -->
        <div class="card-glass p-8 md:p-10 flex flex-col items-center justify-center text-center reveal">
          <div class="w-20 h-20 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6">
            <svg class="w-10 h-10 text-emerald-400" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </div>
          <h3 class="text-2xl font-display font-bold text-white mb-3">WhatsApp</h3>
          <p class="text-slate-400 font-body mb-8 leading-relaxed">{{ t('contactDescription') }}</p>
          <a
            :href="whatsappUrl"
            target="_blank"
            rel="noopener"
            class="btn-whatsapp text-base !py-4 !px-10 w-full sm:w-auto justify-center"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            {{ t('contactWhatsapp') }}
          </a>
          <p class="text-xs text-slate-500 mt-4 font-body">{{ t('contactResponseTime') }}</p>
        </div>

        <!-- Contact Form -->
        <div class="card-glass p-8 md:p-10 reveal reveal-delay-2">
          <h3 class="text-xl font-display font-bold text-white mb-6">{{ t('contactFormTitle') }}</h3>
          <form class="space-y-5" name="contact" data-netlify="true">
            <input type="hidden" name="form-name" value="contact" />
            <div>
              <input class="input-field" name="name" :placeholder="t('contactName')" required />
            </div>
            <div>
              <input class="input-field" name="email" type="email" :placeholder="t('contactEmail')" required />
            </div>
            <div>
              <textarea class="input-field min-h-[120px] resize-none" name="message" :placeholder="t('contactMessage')" rows="4" required></textarea>
            </div>
            <button type="submit" class="btn-primary w-full justify-center">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
              {{ t('contactSend') }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
