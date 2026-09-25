<script setup>
import { inject } from 'vue'
import SectionNode from './SectionNode.vue'

const t = inject('t')
</script>

<template>
  <section id="frentes" class="relative" style="padding-top: 110px; padding-bottom: 40px">
    <SectionNode />
    <div class="home-shell">
      <div class="h-reveal flex flex-col lg:flex-row lg:justify-between lg:items-end gap-5">
        <div class="flex flex-col gap-4">
          <span class="h-eyebrow">01 — {{ t('frentesEyebrow') }}</span>
          <h2 class="h-title">{{ t('frentesTitle') }}</h2>
        </div>
        <p class="m-0 lg:mb-2.5 text-[20px] text-text-soft">{{ t('frentesSub') }}</p>
      </div>

      <div class="h-reveal mt-16 xl:mt-[90px] grid md:grid-cols-3 gap-6 xl:flex xl:gap-0 xl:items-center" style="perspective: 1600px">
        <!-- Sistemas -->
        <div class="h-3d-left xl:flex-1 min-w-0" style="transform-style: preserve-3d">
          <div class="h-fl h-card">
            <div class="h-card-visual" style="perspective: 700px">
              <div class="relative" style="width: 120px; height: 120px; transform: rotateX(58deg) rotateZ(-45deg); transform-style: preserve-3d">
                <div class="h-lay absolute inset-0 rounded-[14px]" style="--z: 0px; border: 1.5px solid #3D2C78; background: rgba(61,44,120,0.35)"></div>
                <div class="h-lay absolute inset-0 rounded-[14px]" style="--z: 30px; animation-delay: -0.6s; border: 1.5px solid #6B7FE8; background: rgba(107,127,232,0.18)"></div>
                <div class="h-lay absolute inset-0 rounded-[14px]" style="--z: 60px; animation-delay: -1.2s; border: 1.5px solid #A78BFA; background: rgba(139,92,246,0.22)"></div>
              </div>
            </div>
            <h3 class="h-card-title">{{ t('frenteSys') }}</h3>
            <div class="flex flex-wrap gap-2 mt-auto">
              <span v-for="c in ['Django', 'Vue', 'Go', 'Postgres']" :key="c" class="h-chip">{{ c }}</span>
            </div>
          </div>
        </div>

        <!-- conector -->
        <div class="hidden xl:block relative shrink-0" style="width: 100px; height: 60px" aria-hidden="true">
          <svg width="100" height="60" viewBox="0 0 100 60" fill="none" class="absolute inset-0"><path class="h-dash" d="M0 30 L100 30" stroke="#6B7FE8" stroke-width="2" stroke-dasharray="4 4" /></svg>
          <div class="h-mv absolute left-0 top-0 rounded-full" style="--d: 1.8s; width: 10px; height: 10px; margin: -5px 0 0 -5px; background: #A78BFA; box-shadow: 0 0 14px 3px rgba(167,139,250,0.7); offset-path: path('M0 30 L100 30')"></div>
          <span class="absolute left-1/2 -translate-x-1/2 mono text-[11px] text-muted" style="top: -6px">{{ t('frenteLinkData') }}</span>
        </div>

        <!-- IA -->
        <div class="h-3d-center xl:flex-1 min-w-0" style="transform-style: preserve-3d">
          <div class="h-fl h-card" style="animation-delay: -2s; border-color: #5B47C2; background: linear-gradient(160deg, #1D1242, #0C0720); box-shadow: 0 60px 110px -40px rgba(34,211,238,0.45)">
            <div class="h-card-visual relative" style="perspective: 600px">
              <div class="absolute" style="width: 150px; height: 150px; transform-style: preserve-3d">
                <div class="h-spa absolute inset-0 rounded-full" style="border: 1.5px solid rgba(167,139,250,0.7)"><div class="absolute rounded-full" style="left: 50%; top: -5px; width: 10px; height: 10px; margin-left: -5px; background: #A78BFA"></div></div>
                <div class="h-spb absolute rounded-full" style="inset: 10px; border: 1.5px solid rgba(34,211,238,0.7)"><div class="absolute rounded-full" style="left: 50%; top: -5px; width: 10px; height: 10px; margin-left: -5px; background: #22D3EE"></div></div>
              </div>
              <div class="h-glow rounded-full" style="width: 46px; height: 46px; background: radial-gradient(circle at 35% 35%, #EDEAFF, #8B5CF6 45%, #22D3EE); box-shadow: 0 0 40px 8px rgba(139,92,246,0.5)"></div>
            </div>
            <h3 class="h-card-title">{{ t('frenteAi') }}</h3>
            <div class="flex flex-wrap gap-2 mt-auto">
              <span v-for="c in ['Claude', 'OpenAI', 'Gemini', t('frenteVision')]" :key="c" class="h-chip" style="border-color: #3D2C78; color: #EDEAFF">{{ c }}</span>
            </div>
          </div>
        </div>

        <!-- conector -->
        <div class="hidden xl:block relative shrink-0" style="width: 100px; height: 60px" aria-hidden="true">
          <svg width="100" height="60" viewBox="0 0 100 60" fill="none" class="absolute inset-0"><path class="h-dash" d="M0 30 L100 30" stroke="#22D3EE" stroke-width="2" stroke-dasharray="4 4" /></svg>
          <div class="h-mv absolute left-0 top-0 rounded-full" style="--d: 1.8s; animation-delay: -0.9s; width: 10px; height: 10px; margin: -5px 0 0 -5px; background: #22D3EE; box-shadow: 0 0 14px 3px rgba(34,211,238,0.7); offset-path: path('M0 30 L100 30')"></div>
          <span class="absolute left-1/2 -translate-x-1/2 mono text-[11px] text-muted" style="top: -6px">{{ t('frenteLinkActions') }}</span>
        </div>

        <!-- Apps & operação -->
        <div class="h-3d-right xl:flex-1 min-w-0" style="transform-style: preserve-3d">
          <div class="h-fl h-card" style="animation-delay: -4s; box-shadow: 0 50px 90px -40px rgba(34,211,238,0.4)">
            <div class="h-card-visual" style="perspective: 600px">
              <div class="relative" style="width: 78px; height: 144px; border-radius: 16px; border: 2px solid #6B7FE8; background: rgba(17,10,38,0.9); transform: rotateY(-22deg) rotateX(8deg); box-shadow: 18px 18px 0 -2px rgba(34,211,238,0.15)">
                <div class="absolute rounded" style="left: 50%; top: 8px; width: 22px; height: 4px; margin-left: -11px; background: #3D2C78"></div>
                <div class="h-toast absolute mono whitespace-nowrap" style="left: -34px; top: 34px; padding: 6px 10px; border-radius: 10px; background: #34D399; color: #0A0618; font-size: 10px; font-weight: 600">{{ t('frenteToastPay') }}</div>
                <div class="h-toast absolute mono whitespace-nowrap" style="animation-delay: -2.2s; left: 30px; top: 88px; padding: 6px 10px; border-radius: 10px; background: #22D3EE; color: #0A0618; font-size: 10px; font-weight: 600">{{ t('frenteToastWa') }}</div>
              </div>
            </div>
            <h3 class="h-card-title">{{ t('frenteOps') }}</h3>
            <div class="flex flex-wrap gap-2 mt-auto">
              <span v-for="c in ['Flutter', 'WhatsApp', 'PIX', 'AWS']" :key="c" class="h-chip">{{ c }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.h-card {
  height: 440px;
  box-sizing: border-box;
  border-radius: 28px;
  border: 1px solid #2D1F5E;
  background: linear-gradient(160deg, #150D31, #0C0720);
  padding: 30px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 50px 90px -40px rgba(139, 92, 246, 0.5);
}
.h-card-visual {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.h-card-title {
  margin: 0;
  font-size: 30px;
  font-weight: 900;
  letter-spacing: -0.02em;
}
@media (max-width: 767px) {
  .h-card { height: 400px; }
}
</style>
