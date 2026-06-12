<script setup>
import { inject } from 'vue'
import { RouterLink } from 'vue-router'

const t = inject('t')
</script>

<template>
  <section class="container-shell" style="padding-top: 84px;">
    <div class="reveal curiosity-strip">
      <span class="eyebrow">{{ t('productsEyebrow') }}</span>
      <div class="flex flex-col" style="gap: 6px;">
        <span class="text-text-soft" style="font-size: 15.5px; line-height: 1.55;">
          {{ t('productsDesc') }}
        </span>
        <RouterLink
          :to="{ name: 'products' }"
          class="font-mono text-cyan no-underline self-start curiosity-link"
          style="font-size: 13px; font-weight: 700;"
        >{{ t('productsCta') }}</RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.curiosity-strip {
  display: grid;
  grid-template-columns: 160px minmax(0, 1fr);
  gap: 32px;
  align-items: start;
  padding: 22px 0 4px;
  border-top: 1px dashed #2D1F5E;
  border-bottom: 1px dashed #2D1F5E;
}

.curiosity-strip > :first-child {
  padding-top: 2px;
}

.curiosity-link {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.curiosity-link:hover {
  transform: translateX(4px);
}

@media (max-width: 640px) {
  .curiosity-strip {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}
</style>
