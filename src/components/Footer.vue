<script setup>
defineProps({
  name: String
})
</script>

<template>
  <footer class="mt-20 py-8 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
    <div class="section-container">
      &copy; {{ new Date().getFullYear() }} {{ name }}. Todos os direitos reservados.
    </div>
  </footer>
</template> 