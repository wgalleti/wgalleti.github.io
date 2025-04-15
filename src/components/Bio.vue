<script setup>
defineProps({
  bio: {
    type: String,
    default: ''
  },
  cvLinkPtBr: {
    type: String,
    default: '#'
  },
  cvLinkEn: {
    type: String,
    default: '#'
  },
  coverLetterLink: {
    type: String,
    default: '#'
  }
})
</script>

<template>
  <section class="section-container mt-12">
    <div class="card" data-sr-left>
      <h2 class="text-2xl font-semibold mb-6 gradient-text">Sobre Mim</h2>
      <div class="flex flex-col md:flex-row items-center gap-6">
        <div 
          class="w-28 h-28 md:w-36 md:h-36 relative overflow-hidden rounded-full shadow-xl border-4 border-purple-200 dark:border-gray-600 flex-shrink-0 transition-all duration-300 hover:shadow-2xl"
          data-sr-left
        >
          <img 
            src="/me.jpeg" 
            alt="Profile Photo" 
            class="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
            style="image-rendering: -webkit-optimize-contrast; transform: translateZ(0);"
          />
        </div>
        <div class="flex-grow" data-sr-right>
          <p v-for="(paragraph, index) in bio.split('\n\n')" :key="index" class="text-gray-800 dark:text-gray-200 mb-4">
            {{ paragraph }}
          </p>
          <div class="flex flex-wrap gap-3">
            <a 
              :href="cvLinkPtBr" 
              class="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              download
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              CV Português
            </a>
            <a 
              :href="cvLinkEn" 
              class="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              download
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              CV English
            </a>
            <a 
              :href="coverLetterLink" 
              class="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              download
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Carta de Apresentação
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template> 