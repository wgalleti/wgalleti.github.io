<script setup>
import { inject } from 'vue'

const t = inject('t')

// Ícones de linha 22×22, stroke 1.6 — copiados do protótipo.
const KNOT_ICONS = [
  // #01 spreadsheet
  '<rect x="3.5" y="4.5" width="17" height="15" rx="2"></rect><path d="M3.5 9.5h17M9.5 9.5v10"></path>',
  // #02 mobile
  '<rect x="7" y="3" width="10" height="18" rx="2.4"></rect><path d="M11 17.5h2"></path>',
  // #03 cycle/automation
  '<path d="M20.5 12a8.5 8.5 0 0 1-15.2 5.2"></path><path d="M3.5 12a8.5 8.5 0 0 1 15.2-5.2"></path><path d="M18.7 4v2.8h-2.8"></path><path d="M5.3 20v-2.8h2.8"></path>',
  // #04 cube/legacy
  '<path d="M12 3l8 4.6v8.8L12 21l-8-4.6V7.6L12 3z"></path><path d="M12 12l8-4.4M12 12L4 7.6M12 12v9"></path>',
  // #05 cloud upload
  '<path d="M6.5 18.5h11a3.5 3.5 0 0 0 .7-6.93 5.5 5.5 0 0 0-10.8-1.2A4 4 0 0 0 6.5 18.5z"></path><path d="M12 15.5v-4.4M9.9 13.2 12 11.1l2.1 2.1"></path>',
]

const knots = [
  { num: 'nó #01', title: 'knot1Title', desc: 'knot1Desc', foot: 'knot1Foot', icon: KNOT_ICONS[0] },
  { num: 'nó #02', title: 'knot2Title', desc: 'knot2Desc', foot: 'knot2Foot', icon: KNOT_ICONS[1] },
  { num: 'nó #03', title: 'knot3Title', desc: 'knot3Desc', foot: 'knot3Foot', icon: KNOT_ICONS[2] },
  { num: 'nó #04', title: 'knot4Title', desc: 'knot4Desc', foot: 'knot4Foot', icon: KNOT_ICONS[3] },
  { num: 'nó #05', title: 'knot5Title', desc: 'knot5Desc', foot: 'knot5Foot', icon: KNOT_ICONS[4] },
]

// As labels "nó #01" não mudam de idioma na referência (mesma tipografia mono).
// "knot #01" em EN — derivado da lingua atual.
const currentLang = inject('currentLang')
const labelFor = (i) => (currentLang.value === 'en' ? `knot #0${i + 1}` : `nó #0${i + 1}`)

// Chat/balão para card CTA
const ctaIcon = '<path d="M20 14a2 2 0 0 1-2 2H9.5L5 19.5V6a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v8z"></path><path d="M9 9.5h6M9 12.5h4"></path>'
</script>

<template>
  <section
    id="problemas"
    class="container-shell flex flex-col"
    style="padding-top: 100px; gap: 40px;"
  >
    <div class="reveal flex flex-col" style="gap: 14px;">
      <span class="eyebrow">{{ t('knotEyebrow') }}</span>
      <h2 class="h2-section">{{ t('knotTitle') }}</h2>
      <p class="text-muted m-0" style="font-size: 16.5px; line-height: 1.65; max-width: 600px;">
        {{ t('knotIntro') }}
      </p>
    </div>

    <div class="knot-grid">
      <article
        v-for="(k, i) in knots"
        :key="k.title"
        class="reveal knot-card"
      >
        <div class="flex items-center justify-between" style="gap: 12px;">
          <div class="icon-chip">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" v-html="k.icon" />
          </div>
          <span class="font-mono text-violet" style="font-size: 11.5px;">{{ labelFor(i) }}</span>
        </div>
        <h3 class="m-0" style="font-size: 19px; font-weight: 600; line-height: 1.35;">{{ t(k.title) }}</h3>
        <p class="text-muted m-0" style="font-size: 14.5px; line-height: 1.6; flex: 1;">{{ t(k.desc) }}</p>
        <span class="font-mono text-cyan" style="font-size: 12px;">{{ t(k.foot) }}</span>
      </article>

      <!-- Card CTA -->
      <article
        class="reveal flex flex-col justify-center"
        style="
          background: linear-gradient(135deg, rgba(139,92,246,0.12), rgba(34,211,238,0.08));
          border: 1px solid #3D2C78;
          border-radius: 18px;
          padding: 28px;
          gap: 12px;
        "
      >
        <div class="icon-chip icon-chip-cyan">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" v-html="ctaIcon" />
        </div>
        <h3 class="m-0" style="font-size: 19px; font-weight: 600; line-height: 1.35;">{{ t('knotCtaTitle') }}</h3>
        <p class="text-text-soft m-0" style="font-size: 14.5px; line-height: 1.6;">{{ t('knotCtaDesc') }}</p>
        <a
          :href="t('whatsappUrl')"
          target="_blank"
          rel="noopener"
          class="font-mono text-cyan no-underline"
          style="font-size: 13px; font-weight: 700;"
        >{{ t('knotCtaLink') }}</a>
      </article>
    </div>
  </section>
</template>

<style scoped>
.knot-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
  gap: 18px;
}

@media (max-width: 480px) {
  .knot-grid {
    grid-template-columns: 1fr;
  }
}
</style>
