<script setup>
import { inject } from 'vue'

const t = inject('t')
</script>

<template>
  <section id="sobre" class="container-shell" style="padding-top: 110px;">
    <div
      class="reveal about-card"
    >
      <div class="flex flex-col items-center" style="gap: 14px;">
        <img
          src="/image.jpeg"
          alt="William Galleti"
          width="220"
          height="220"
          loading="lazy"
          class="photo"
        />
        <span class="font-mono text-faint" style="font-size: 11px;">{{ t('aboutLocation') }}</span>
      </div>

      <div class="flex flex-col" style="gap: 18px;">
        <span class="eyebrow">{{ t('aboutEyebrow') }}</span>
        <h2 class="m-0" style="font-size: 36px; font-weight: 900; letter-spacing: -0.02em;">
          {{ t('aboutTitle1') }}<br />{{ t('aboutTitle2') }}
        </h2>
        <p class="text-text-soft m-0" style="font-size: 15.5px; line-height: 1.7;">{{ t('aboutBio1') }}</p>
        <p class="text-text-soft m-0" style="font-size: 15.5px; line-height: 1.7;">{{ t('aboutBio2') }}</p>

        <div class="flex font-mono" style="gap: 22px; font-size: 12.5px;">
          <a href="https://github.com/wgalleti" target="_blank" rel="noopener" class="text-muted no-underline hover:text-cyan transition-colors">github ↗</a>
          <a href="https://linkedin.com/in/wgalleti" target="_blank" rel="noopener" class="text-muted no-underline hover:text-cyan transition-colors">linkedin ↗</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-card {
  background: #110A26;
  border: 1px solid #2D1F5E;
  border-radius: 22px;
  padding: 48px;
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 44px;
  align-items: center;
}

.photo {
  width: 220px;
  height: 220px;
  border-radius: 9999px;
  object-fit: cover;
  object-position: center top;
  border: 1px solid #2D1F5E;
  box-shadow: 0 12px 32px -16px rgba(139, 92, 246, 0.45);
  display: block;
}

@media (max-width: 760px) {
  .about-card {
    grid-template-columns: 1fr;
    padding: 32px;
    gap: 28px;
  }
}
</style>
