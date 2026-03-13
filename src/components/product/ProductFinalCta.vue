<script setup>
defineProps({
  product: { type: Object, required: true },
  whatsappUrl: { type: String, required: true },
  lang: { type: String, required: true }
})
</script>

<template>
  <section class="section-padding relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-brand-950/30 to-transparent pointer-events-none"></div>
    <div class="absolute top-20 right-[10%] hidden w-48 h-48 opacity-10 animate-float pointer-events-none md:block">
      <svg viewBox="0 0 200 200" fill="none">
        <polygon points="100,10 190,60 190,140 100,190 10,140 10,60" stroke="url(#ctaGrad)" stroke-width="1" fill="none"/>
        <defs><linearGradient id="ctaGrad" x1="0" y1="0" x2="200" y2="200"><stop offset="0%" stop-color="#7C3AED"/><stop offset="100%" stop-color="#0EA5E9"/></linearGradient></defs>
      </svg>
    </div>
    <div class="absolute bottom-32 left-[5%] hidden w-32 h-32 opacity-10 animate-float-delayed pointer-events-none md:block">
      <svg viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="45" stroke="#7C3AED" stroke-width="0.5"/>
        <circle cx="50" cy="50" r="30" stroke="#0EA5E9" stroke-width="0.5"/>
        <circle cx="50" cy="50" r="15" stroke="#7C3AED" stroke-width="0.5"/>
      </svg>
    </div>

    <div class="container-section relative z-10">
      <div class="max-w-3xl mx-auto text-center reveal">
        <div class="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/20 to-accent-500/10">
          <svg class="w-8 h-8 text-brand-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
        </div>
        <h2 class="heading-section mb-6 text-white">
          {{ lang === 'pt' ? 'Quer uma solucao com a mesma ambicao do' : 'Want a solution with the same level of ambition as' }}
          <span class="text-gradient"> {{ product.name }}</span>?
        </h2>
        <p class="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-400 font-body">
          {{ lang === 'pt'
            ? 'A conversa aqui nao parte de um template pronto. Ela parte do seu processo, dos gargalos da operacao e da solucao que precisa existir.'
            : 'The conversation does not start from a template. It starts from your process, your operational bottlenecks, and the solution that needs to exist.'
          }}
        </p>
        <div class="flex flex-col justify-center gap-4 sm:flex-row">
          <a v-if="product.url && !product.confidential" :href="product.url" target="_blank" rel="noopener" class="btn-primary text-base !py-4 !px-8">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            {{ lang === 'pt' ? 'Explorar o produto' : 'Explore the product' }}
          </a>
          <a :href="whatsappUrl" target="_blank" rel="noopener" class="btn-whatsapp text-base !py-4 !px-8">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            {{ lang === 'pt' ? 'Conversar sobre o projeto' : 'Discuss your project' }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
