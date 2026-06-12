<script setup>
import { inject, ref } from 'vue'
import { useLogoCanvas } from '../utils/useLogoCanvas'

const t = inject('t')

const logoRef = ref(null)
useLogoCanvas(logoRef)
</script>

<template>
  <section
    id="topo"
    class="container-shell hero-grid"
    style="padding-top: 150px; padding-bottom: 70px; min-height: 96vh;"
  >
    <!-- Coluna esquerda -->
    <div class="flex flex-col" style="gap: 26px;">
      <span class="eyebrow-hero">{{ t('heroEyebrow') }}</span>

      <h1 class="h1-hero">
        {{ t('heroTitle1') }}<br />
        <span class="text-brand-gradient">{{ t('heroTitle2') }}</span>
      </h1>

      <p class="text-text-soft m-0" style="font-size: 17.5px; line-height: 1.65; max-width: 540px;">
        {{ t('heroDescription') }}
      </p>

      <div class="flex flex-wrap" style="gap: 14px;">
        <a :href="t('whatsappUrl')" target="_blank" rel="noopener" class="btn-brand">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          {{ t('heroCtaPrimary') }}
        </a>
        <a href="#processo" class="btn-ghost">{{ t('heroCtaSecondary') }}</a>
      </div>

      <div
        class="flex border-t border-border"
        style="gap: 40px; padding-top: 22px; margin-top: 8px;"
      >
        <div class="flex flex-col" style="gap: 3px;">
          <span style="font-size: 30px; font-weight: 900; letter-spacing: -0.02em;">{{ t('heroStat1Num') }}</span>
          <span class="font-mono text-muted" style="font-size: 11.5px;">{{ t('heroStat1Label') }}</span>
        </div>
        <div class="flex flex-col" style="gap: 3px;">
          <span style="font-size: 30px; font-weight: 900; letter-spacing: -0.02em;">{{ t('heroStat2Num') }}</span>
          <span class="font-mono text-muted" style="font-size: 11.5px;">{{ t('heroStat2Label') }}</span>
        </div>
        <div class="flex flex-col" style="gap: 3px;">
          <span style="font-size: 30px; font-weight: 900; letter-spacing: -0.02em;">{{ t('heroStat3Num') }}</span>
          <span class="font-mono text-muted" style="font-size: 11.5px;">{{ t('heroStat3Label') }}</span>
        </div>
      </div>
    </div>

    <!-- Coluna direita: canvas da logo -->
    <div class="flex flex-col items-center" style="gap: 10px;">
      <canvas
        ref="logoRef"
        class="block w-full"
        style="max-width: 530px; aspect-ratio: 1 / 1;"
        aria-label="wgalleti logo animation"
      ></canvas>
      <span class="font-mono text-faint" style="font-size: 11px;">{{ t('heroLogoCaption') }}</span>
    </div>
  </section>
</template>

<style scoped>
.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: 40px;
  align-items: center;
}

@media (max-width: 900px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 56px;
  }
}
</style>
