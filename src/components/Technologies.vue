<script setup>
import { inject } from 'vue'

const t = inject('t')

// Stack chips com logos via simple-icons CDN.
// Em produção idealmente baixar os SVGs como assets locais (vide README).
const stack = [
  { name: 'Python',     slug: 'python',     hex: '4B8BBE' },
  { name: 'Django',     slug: 'django',     hex: '44B78B' },
  { name: 'FastAPI',    slug: 'fastapi',    hex: '009688' },
  { name: 'JavaScript', slug: 'javascript', hex: 'F7DF1E' },
  { name: 'Vue.js',     slug: 'vuedotjs',   hex: '4FC08D' },
  { name: 'Nuxt',       slug: 'nuxt',       hex: '00DC82' },
  { name: 'React',      slug: 'react',      hex: '61DAFB' },
  { name: 'Next.js',    slug: 'nextdotjs',  hex: 'FFFFFF' },
  { name: 'Flutter',    slug: 'flutter',    hex: '54C5F8' },
  { name: 'Dart',       slug: 'dart',       hex: '29B6F6' },
  { name: 'Go',         slug: 'go',         hex: '00ADD8' },
  { name: 'Supabase',   slug: 'supabase',   hex: '3FCF8E' },
]
</script>

<template>
  <section
    id="stack"
    class="container-shell flex flex-col"
    style="padding-top: 110px; gap: 32px;"
  >
    <div class="reveal flex flex-col" style="gap: 14px;">
      <span class="eyebrow">{{ t('stackEyebrow') }}</span>
      <h2 class="h2-section">{{ t('stackTitle') }}</h2>
    </div>

    <div class="reveal flex flex-wrap" style="gap: 12px;">
      <span
        v-for="tech in stack"
        :key="tech.slug"
        class="stack-chip"
      >
        <img
          :src="`https://cdn.simpleicons.org/${tech.slug}/${tech.hex}`"
          width="16"
          height="16"
          alt=""
          loading="lazy"
          style="display: block;"
        />
        {{ tech.name }}
      </span>
    </div>
  </section>
</template>
