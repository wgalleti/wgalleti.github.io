<script setup>
defineProps({
  description: String
})
</script>

<template>
  <section class="relative bg-gradient-to-br from-purple-100 to-violet-100 dark:from-gray-800 dark:to-gray-700 py-20">
    <div class="section-container text-center">
      <h2 class="text-4xl font-bold mb-4 gradient-text" data-sr-left>Soluções que Transformam</h2>
      <p class="text-lg text-gray-700 dark:text-gray-200 max-w-2xl mx-auto mb-8" data-sr-right>{{ description }}</p>
      <div data-sr-bottom>
        <lottie-player 
          src="https://assets10.lottiefiles.com/packages/lf20_w51pcehl.json"
          background="transparent"
          speed="1"
          class="w-72 h-72 mx-auto"
          loop
          autoplay
        ></lottie-player>
      </div>
    </div>
    <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent"></div>
  </section>
</template> 