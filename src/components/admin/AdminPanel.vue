<script setup>
import { ref, inject } from 'vue'
import ProductList from './ProductList.vue'
import ProductForm from './ProductForm.vue'
import TechList from './TechList.vue'
import TechForm from './TechForm.vue'

const products = inject('products')
const technologies = inject('technologies')

// Panel state
const isOpen = ref(false)
const activeTab = ref('products')
const editingProduct = ref(null)   // null = list view, undefined = new, object = editing
const editingTech = ref(null)
const showForm = ref(false)
const saveStatus = ref('idle')

// Save to disk via Vite plugin endpoint
const saveToFile = async (file, data) => {
  saveStatus.value = 'saving'
  try {
    const res = await fetch('/__admin/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ file, data })
    })
    if (!res.ok) throw new Error(await res.text())
    saveStatus.value = 'saved'
    setTimeout(() => saveStatus.value = 'idle', 2500)
  } catch (e) {
    console.error('[Admin]', e)
    saveStatus.value = 'error'
    setTimeout(() => saveStatus.value = 'idle', 3500)
  }
}

// Download JSON as fallback
const downloadJSON = (filename, data) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

const saveCurrent = () => {
  if (activeTab.value === 'products') {
    saveToFile('products', products.value)
  } else {
    saveToFile('technologies', technologies.value)
  }
}

const downloadCurrent = () => {
  if (activeTab.value === 'products') {
    downloadJSON('products.json', products.value)
  } else {
    downloadJSON('technologies.json', technologies.value)
  }
}

// Product handlers
const onEditProduct = (product) => {
  editingProduct.value = product
  showForm.value = true
}
const onAddProduct = () => {
  editingProduct.value = undefined
  showForm.value = true
}
const onProductSaved = () => {
  editingProduct.value = null
  showForm.value = false
}
const onProductCancel = () => {
  editingProduct.value = null
  showForm.value = false
}

// Tech handlers
const onEditTech = (tech) => {
  editingTech.value = tech
  showForm.value = true
}
const onAddTech = () => {
  editingTech.value = undefined
  showForm.value = true
}
const onTechSaved = () => {
  editingTech.value = null
  showForm.value = false
}
const onTechCancel = () => {
  editingTech.value = null
  showForm.value = false
}

// Tab switch resets form
const switchTab = (tab) => {
  activeTab.value = tab
  showForm.value = false
  editingProduct.value = null
  editingTech.value = null
}
</script>

<template>
  <!-- Floating gear trigger -->
  <button
    v-if="!isOpen"
    @click="isOpen = true"
    class="fixed bottom-6 left-6 z-[200] w-12 h-12 rounded-full bg-brand-600/80 backdrop-blur-sm border border-brand-400/30 flex items-center justify-center text-brand-200 hover:bg-brand-500 hover:scale-110 transition-all duration-300 shadow-lg shadow-brand-500/20"
    title="Admin Panel (dev only)"
  >
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
    </svg>
  </button>

  <!-- Admin Drawer -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" class="fixed inset-0 z-[150] flex">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" @click="isOpen = false" />

        <!-- Drawer panel -->
        <div class="relative w-full max-w-xl h-full bg-slate-900/95 backdrop-blur-xl border-r border-white/[0.08] shadow-2xl flex flex-col overflow-hidden admin-slide-in">

          <!-- Header -->
          <div class="flex items-center justify-between px-5 py-4 border-b border-white/[0.06] bg-slate-950/50">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center">
                <svg class="w-4 h-4 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div>
                <h2 class="text-sm font-display font-bold text-white">Admin Panel</h2>
                <p class="text-[10px] text-slate-500 font-display">Dev only — not in production</p>
              </div>
            </div>
            <button @click="isOpen = false" class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <!-- Tabs -->
          <div class="flex border-b border-white/[0.06]">
            <button
              @click="switchTab('products')"
              :class="[
                'flex-1 px-4 py-2.5 text-xs font-display font-semibold transition-colors relative',
                activeTab === 'products'
                  ? 'text-brand-300'
                  : 'text-slate-500 hover:text-slate-300'
              ]"
            >
              Products
              <span class="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full" :class="activeTab === 'products' ? 'bg-brand-500/20 text-brand-300' : 'bg-white/[0.04] text-slate-600'">{{ products.length }}</span>
              <div v-if="activeTab === 'products'" class="absolute bottom-0 left-2 right-2 h-0.5 bg-brand-500 rounded-full"></div>
            </button>
            <button
              @click="switchTab('technologies')"
              :class="[
                'flex-1 px-4 py-2.5 text-xs font-display font-semibold transition-colors relative',
                activeTab === 'technologies'
                  ? 'text-brand-300'
                  : 'text-slate-500 hover:text-slate-300'
              ]"
            >
              Technologies
              <span class="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full" :class="activeTab === 'technologies' ? 'bg-brand-500/20 text-brand-300' : 'bg-white/[0.04] text-slate-600'">{{ technologies.length }}</span>
              <div v-if="activeTab === 'technologies'" class="absolute bottom-0 left-2 right-2 h-0.5 bg-brand-500 rounded-full"></div>
            </button>
          </div>

          <!-- Content -->
          <div class="flex-1 overflow-hidden">
            <!-- Products tab -->
            <template v-if="activeTab === 'products'">
              <ProductForm
                v-if="showForm"
                :product="editingProduct || undefined"
                @save="onProductSaved"
                @cancel="onProductCancel"
              />
              <ProductList
                v-else
                @edit="onEditProduct"
                @add="onAddProduct"
              />
            </template>

            <!-- Technologies tab -->
            <template v-if="activeTab === 'technologies'">
              <TechForm
                v-if="showForm"
                :tech="editingTech || undefined"
                @save="onTechSaved"
                @cancel="onTechCancel"
              />
              <TechList
                v-else
                @edit="onEditTech"
                @add="onAddTech"
              />
            </template>
          </div>

          <!-- Footer with save actions -->
          <div class="border-t border-white/[0.06] px-4 py-3 flex items-center justify-between gap-3 bg-slate-950/50">
            <!-- Status indicator -->
            <div class="flex items-center gap-2 text-xs font-display">
              <template v-if="saveStatus === 'saving'">
                <div class="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></div>
                <span class="text-brand-300">Saving...</span>
              </template>
              <template v-else-if="saveStatus === 'saved'">
                <div class="w-2 h-2 rounded-full bg-emerald-400"></div>
                <span class="text-emerald-400">Saved to disk</span>
              </template>
              <template v-else-if="saveStatus === 'error'">
                <div class="w-2 h-2 rounded-full bg-red-400"></div>
                <span class="text-red-400">Save failed</span>
              </template>
              <template v-else>
                <div class="w-2 h-2 rounded-full bg-slate-600"></div>
                <span class="text-slate-600">Ready</span>
              </template>
            </div>

            <div class="flex items-center gap-2">
              <!-- Download fallback -->
              <button @click="downloadCurrent" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-display font-medium text-slate-400 bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:text-white transition-colors">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                Download
              </button>

              <!-- Primary save -->
              <button @click="saveCurrent" class="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[11px] font-display font-semibold text-white bg-brand-600 hover:bg-brand-500 transition-colors shadow-sm shadow-brand-500/20">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/></svg>
                Save to File
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.admin-slide-in {
  animation: slideInLeft 0.3s ease-out;
}

@keyframes slideInLeft {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
