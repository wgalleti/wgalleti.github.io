<script setup>
import { inject } from 'vue'
import SectionNode from './SectionNode.vue'

const t = inject('t')
</script>

<template>
  <section class="relative" style="padding-top: 40px; padding-bottom: 40px">
    <SectionNode />
    <div class="h-reveal relative mx-4 lg:ml-[130px] lg:mr-[60px] rounded-[32px] lg:rounded-[40px] overflow-hidden" style="border: 1px solid #1B3A4A; background: radial-gradient(120% 90% at 18% 50%, #0C2F3C 0%, #0A1426 45%, #080618 100%)">
      <div class="grid lg:grid-cols-[1.15fr_0.85fr] gap-6 items-center p-7 sm:p-12 lg:p-[72px]">
        <!-- monitor 3D -->
        <div class="order-2 lg:order-1 relative h-[340px] sm:h-[460px]" style="perspective: 1400px" aria-hidden="true">
          <div class="absolute left-0 sm:left-5 top-5 sm:top-10 w-[92%] sm:w-[560px] max-w-full h-[240px] sm:h-[380px]" style="transform: rotateY(18deg) rotateX(6deg); transform-style: preserve-3d">
            <div class="absolute inset-0 rounded-[22px] overflow-hidden" style="border: 1.5px solid #1F5566; background-color: #07121C; background-image: linear-gradient(rgba(34,211,238,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.07) 1px, transparent 1px); background-size: 28px 28px; box-shadow: 0 60px 100px -40px rgba(34,211,238,0.45)">
              <span class="absolute mono text-[12px]" style="left: 20px; top: 16px; color: #F87171">● REC · cam 01</span>
              <div class="h-scan absolute left-0 right-0" style="height: 2px; background: linear-gradient(90deg, rgba(34,211,238,0), #22D3EE, rgba(34,211,238,0)); box-shadow: 0 0 16px rgba(34,211,238,0.8)"></div>
              <div class="absolute rounded-xl" style="left: 34%; top: 24%; width: 27%; height: 50%; border: 2px solid #22D3EE">
                <div class="absolute mono whitespace-nowrap rounded-md" style="left: -2px; top: -30px; padding: 4px 8px; background: #22D3EE; color: #07121C; font-size: 11px; font-weight: 600">{{ t('arbDetect') }}</div>
                <div class="h-ping absolute rounded-full" style="left: 50%; top: 45%; width: 14px; height: 14px; margin: -7px 0 0 -7px; border: 2px solid #22D3EE"></div>
              </div>
            </div>
            <!-- placar flutuando à frente -->
            <div class="h-fl absolute" style="right: -30px; bottom: -50px; width: 230px; transform: translateZ(90px)">
              <div class="flex flex-col gap-2.5 mono rounded-[18px]" style="border: 1px solid #1F5566; background: rgba(7,18,28,0.95); padding: 18px; box-shadow: 0 30px 60px -20px rgba(0,0,0,0.7)">
                <div class="flex justify-between items-center rounded-xl" style="padding: 10px 14px; background: #0E3345"><span class="text-[13px]" style="color: #B6E9F3">{{ t('arbBlue') }}</span><span class="text-[30px] font-semibold text-text">4</span></div>
                <div class="flex justify-between items-center rounded-xl" style="padding: 10px 14px; background: #0B1B28"><span class="text-[13px]" style="color: #8E9FB3">{{ t('arbWhite') }}</span><span class="text-[30px] font-semibold text-text">2</span></div>
              </div>
              <div class="h-toast absolute mono whitespace-nowrap rounded-xl" style="left: -80px; top: -24px; padding: 9px 14px; background: #34D399; color: #07121C; font-size: 13px; font-weight: 600">{{ t('arbToast') }}</div>
            </div>
          </div>
        </div>

        <div class="order-1 lg:order-2 flex flex-col gap-6">
          <span class="h-eyebrow">03 — {{ t('arbEyebrow') }}</span>
          <h2 class="h-title-xl">{{ t('arbTitle1') }}<br>{{ t('arbTitle2') }}</h2>
          <p class="m-0" style="font-size: clamp(18px, 1.7vw, 22px); line-height: 1.45; color: #B6D3DC">{{ t('arbSub1') }}<br>{{ t('arbSub2') }}</p>
          <div class="flex flex-wrap gap-5 mt-3 mono text-[12px]" style="color: #7FA3AE">
            <span>Python</span><span>MediaPipe</span><span>OpenCV</span><span>{{ t('arbEvents') }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
