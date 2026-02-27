<script setup>
import { ref, computed, inject, watch } from 'vue'

const props = defineProps({
  tech: { type: Object, default: null }
})

const emit = defineEmits(['save', 'cancel'])
const technologies = inject('technologies')

const isEditing = computed(() => !!props.tech)

const form = ref({
  name: '',
  slug: '',
  color: '#7C3AED'
})

const slugOverride = ref(false)

// Auto-generate slug from name
const autoSlug = computed(() => {
  return form.value.name
    .toLowerCase()
    .replace(/\./g, 'dot')
    .replace(/[^a-z0-9]+/g, '')
})

watch(() => form.value.name, () => {
  if (!slugOverride.value) {
    form.value.slug = autoSlug.value
  }
})

// Initialize from existing tech
if (props.tech) {
  form.value = { ...props.tech }
  slugOverride.value = true
}

const iconPreviewUrl = computed(() => {
  if (!form.value.slug) return null
  return `https://cdn.simpleicons.org/${form.value.slug}/${form.value.color.replace('#', '')}`
})

const isDuplicate = computed(() => {
  if (isEditing.value) return false
  return technologies.value.some(t => t.slug === form.value.slug)
})

const isValid = computed(() => {
  return form.value.name.trim() && form.value.slug.trim() && form.value.color.trim() && !isDuplicate.value
})

const save = () => {
  if (!isValid.value) return

  const data = {
    name: form.value.name.trim(),
    slug: form.value.slug.trim(),
    color: form.value.color.trim()
  }

  if (isEditing.value) {
    const idx = technologies.value.findIndex(t => t.slug === props.tech.slug)
    if (idx !== -1) {
      const arr = [...technologies.value]
      arr[idx] = data
      technologies.value = arr
    }
  } else {
    technologies.value = [...technologies.value, data]
  }

  emit('save')
}
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- Header -->
    <div class="flex items-center gap-3 px-5 py-3 border-b border-white/[0.06]">
      <button @click="emit('cancel')" class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
      </button>
      <h3 class="text-sm font-display font-semibold text-white">{{ isEditing ? 'Edit Technology' : 'Add Technology' }}</h3>
    </div>

    <!-- Form -->
    <div class="flex-1 overflow-y-auto p-5 space-y-5">
      <!-- Name -->
      <div class="space-y-1.5">
        <label class="block text-[11px] font-display font-semibold text-slate-400 uppercase tracking-wider">Name</label>
        <input v-model="form.name" class="input-field" placeholder="e.g. Vue.js" />
      </div>

      <!-- Slug -->
      <div class="space-y-1.5">
        <label class="block text-[11px] font-display font-semibold text-slate-400 uppercase tracking-wider">
          Slug
          <span class="text-slate-600 normal-case tracking-normal font-normal">(Simple Icons)</span>
        </label>
        <div class="flex gap-2">
          <input
            v-model="form.slug"
            @input="slugOverride = true"
            class="input-field flex-1 font-mono text-sm"
            placeholder="e.g. vuedotjs"
          />
          <button
            v-if="slugOverride && form.name"
            @click="slugOverride = false; form.slug = autoSlug"
            class="px-3 rounded-lg text-[10px] font-display text-slate-500 hover:text-brand-300 bg-white/[0.03] border border-white/[0.06] hover:border-brand-500/30 transition-colors whitespace-nowrap"
          >
            Auto
          </button>
        </div>
        <p v-if="isDuplicate" class="text-[10px] text-red-400 font-display">Slug already exists</p>
      </div>

      <!-- Color -->
      <div class="space-y-1.5">
        <label class="block text-[11px] font-display font-semibold text-slate-400 uppercase tracking-wider">Color</label>
        <div class="flex items-center gap-3">
          <input
            type="color"
            v-model="form.color"
            class="w-10 h-10 rounded-lg border border-white/[0.08] bg-transparent cursor-pointer appearance-none"
          />
          <input v-model="form.color" class="input-field flex-1 font-mono text-sm" placeholder="#000000" />
        </div>
      </div>

      <!-- Preview -->
      <div class="space-y-1.5">
        <label class="block text-[11px] font-display font-semibold text-slate-400 uppercase tracking-wider">Preview</label>
        <div class="card-glass p-6 flex flex-col items-center gap-3">
          <img
            v-if="iconPreviewUrl"
            :src="iconPreviewUrl"
            :alt="form.name"
            class="w-10 h-10"
            @error="$event.target.style.opacity='0.2'"
          />
          <div v-else class="w-10 h-10 rounded-lg bg-white/[0.04] flex items-center justify-center">
            <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"/></svg>
          </div>
          <span class="text-xs font-display font-medium text-slate-400">{{ form.name || 'Technology Name' }}</span>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="border-t border-white/[0.06] p-4 flex items-center gap-3">
      <button @click="emit('cancel')" class="btn-secondary !py-2 !px-4 !text-xs flex-1 justify-center">Cancel</button>
      <button @click="save" :disabled="!isValid" class="btn-primary !py-2 !px-4 !text-xs flex-1 justify-center disabled:opacity-40 disabled:pointer-events-none">
        {{ isEditing ? 'Update' : 'Add' }}
      </button>
    </div>
  </div>
</template>
