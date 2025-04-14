<script setup>
defineProps({
  specialties: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <section class="section-container mt-12">
    <div class="card" data-sr-left>
      <h2 class="text-2xl font-semibold mb-6 gradient-text">Especialidades</h2>
      <ul class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <li 
          v-for="(item, index) in specialties" 
          :key="item"
          class="flex items-start p-4 rounded-lg bg-purple-50 dark:bg-gray-700 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg"
          :data-sr-right="index % 2 === 0"
          :data-sr-left="index % 2 !== 0"
        >
          <span class="text-gray-800 dark:text-gray-200">{{ item }}</span>
        </li>
      </ul>
    </div>
  </section>
</template> 