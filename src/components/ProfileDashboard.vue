<template>
  <section class="section-container mt-12">
    <div class="card" data-sr-left>
      <h2 class="text-2xl font-semibold mb-6 gradient-text">{{ t('profile') }}</h2>

      <ul class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Big Five -->
        <li class="flex flex-col items-start p-4 rounded-lg bg-purple-50 dark:bg-gray-700 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg" data-sr-left>
          <h2 class="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4">{{ t('bigFive') }}</h2>
          <div v-for="(item, index) in translatedBigFive" :key="index" class="mb-4 w-full">
            <p class="mb-1 text-gray-700 dark:text-gray-200">{{ item.label }}</p>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                class="bg-purple-500 h-2.5 rounded-full transition-all duration-700"
                :style="{ width: item.percent + '%' }"
              ></div>
            </div>
          </div>
        </li>

        <!-- DISC com Chart -->
        <li class="flex flex-col items-start p-4 rounded-lg bg-purple-50 dark:bg-gray-700 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg" data-sr-right>
          <h2 class="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4">{{ t('disc') }}</h2>
          <canvas ref="discChart" height="200" class="w-full"></canvas>
        </li>

        <!-- MBTI e Eneagrama -->
        <li class="flex flex-col items-start p-4 rounded-lg bg-purple-50 dark:bg-gray-700 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg" data-sr-left>
          <h2 class="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4">{{ t('mbti') }}</h2>
          <p
            class="text-lg font-bold bg-purple-700 text-purple-50 inline-block px-3 py-1 rounded"
          >
            {{ mbti }}
          </p>

          <h2 class="text-xl font-semibold text-purple-600 dark:text-purple-400 mt-6 mb-2">
            {{ t('enneagram') }}
          </h2>
          <p class="text-lg text-gray-700 dark:text-gray-200">
            {{ t('enneagramType') }} {{ eneagrama.tipo }} {{ t('enneagramWing') }} {{ eneagrama.asa }}
            <span
              class="ml-2 bg-purple-700 text-purple-50 font-semibold px-2 py-1 rounded"
              >{{ eneagrama.tipo }}w{{ eneagrama.asa }}</span
            >
          </p>
          <ul class="mt-4 list-disc list-inside text-gray-700 dark:text-gray-300">
            <li
              v-for="(caracteristica, index) in translatedCharacteristics"
              :key="index"
            >
              {{ caracteristica }}
            </li>
          </ul>
        </li>

        <!-- Forças e Riscos -->
        <li class="flex flex-col items-start p-4 rounded-lg bg-purple-50 dark:bg-gray-700 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg" data-sr-right>
          <h2 class="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4">
            {{ t('strengths') }} e {{ t('risks') }}
          </h2>
          <div class="mb-4">
            <h3 class="font-semibold text-purple-600 dark:text-purple-300 mb-1">{{ t('strengths') }}</h3>
            <ul class="list-disc list-inside text-gray-700 dark:text-gray-300">
              <li v-for="(forca, index) in translatedStrengths" :key="'forca' + index">
                {{ forca }}
              </li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold text-purple-600 dark:text-purple-300 mb-1">{{ t('risks') }}</h3>
            <ul class="list-disc list-inside text-red-600 dark:text-red-400">
              <li v-for="(risco, index) in translatedRisks" :key="'risco' + index">
                {{ risco }}
              </li>
            </ul>
          </div>
        </li>

        <!-- Valores -->
        <li class="flex flex-col items-center p-4 rounded-lg bg-purple-50 dark:bg-gray-700 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg col-span-1 md:col-span-2" data-sr-bottom>
          <h2 class="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4">
            {{ t('coreValues') }}
          </h2>
          <div class="flex gap-4 flex-wrap justify-center">
            <span
              v-for="(valor, index) in translatedValues"
              :key="index"
              class="bg-purple-700 text-purple-50 px-4 py-2 rounded-full font-semibold"
            >
              {{ valor }}
            </span>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, reactive, computed, watch } from "vue";
import Chart from "chart.js/auto";
import { useI18n } from '../utils/i18n';

// Props dinâmicas
const props = defineProps({
  currentLang: {
    type: String,
    default: 'pt'
  },
  titulo: {
    type: String,
    default: "William Galleti – Estrategista de Sistemas",
  },
  mbti: { type: String, default: "INTJ" },
  bigFive: {
    type: Array,
    default: () => [
      { label: "Abertura à Experiência", percent: 95 },
      { label: "Conscienciosidade", percent: 90 },
      { label: "Extroversão", percent: 65 },
      { label: "Agradabilidade", percent: 70 },
      { label: "Neuroticismo", percent: 50 },
    ],
  },
  disc: {
    type: Object,
    default: () => ({
      Dominância: 85,
      Influência: 60,
      Estabilidade: 50,
      Conformidade: 95,
    }),
  },
  eneagrama: {
    type: Object,
    default: () => ({
      tipo: 1,
      asa: 3,
      caracteristicas: [
        "Motivado por excelência e ética",
        "Busca impacto e reconhecimento",
        "Exige muito de si e dos outros",
      ],
    }),
  },
  forcas: {
    type: Array,
    default: () => [
      "Visão Sistêmica",
      "Mestre em Execução",
      "Pensamento Estratégico",
    ],
  },
  riscos: {
    type: Array,
    default: () => ["Risco de Burnout", "Autocrítica Elevada"],
  },
  valores: {
    type: Array,
    default: () => ["Autonomia", "Impacto", "Excelência"],
  },
});

// Get translations
const t = computed(() => {
  const { t } = useI18n(props.currentLang);
  return t;
});

// Translated elements
const translatedBigFive = computed(() => [
  { label: t.value('openness'), percent: 95 },
  { label: t.value('conscientiousness'), percent: 90 },
  { label: t.value('extraversion'), percent: 65 },
  { label: t.value('agreeableness'), percent: 70 },
  { label: t.value('neuroticism'), percent: 50 },
]);

const translatedDisc = computed(() => [
  { label: t.value('dominance'), value: props.disc.Dominância },
  { label: t.value('influence'), value: props.disc.Influência },
  { label: t.value('steadiness'), value: props.disc.Estabilidade },
  { label: t.value('compliance'), value: props.disc.Conformidade },
]);

const translatedCharacteristics = computed(() => [
  t.value('drivenByExcellence'),
  t.value('seekingImpact'),
  t.value('demandsFromSelf')
]);

const translatedStrengths = computed(() => [
  t.value('systemicVision'),
  t.value('executionMaster'),
  t.value('strategicThinking')
]);

const translatedRisks = computed(() => [
  t.value('burnoutRisk'),
  t.value('highSelfCriticism')
]);

const translatedValues = computed(() => [
  t.value('autonomy'),
  t.value('impact'),
  t.value('excellence')
]);

const discChart = ref(null);
let chartInstance = null;

// Function to create or update the chart
const createDiscChart = () => {
  if (discChart.value) {
    // If a chart instance exists, destroy it first
    if (chartInstance) {
      chartInstance.destroy();
    }
    
    const ctx = discChart.value.getContext("2d");
    chartInstance = new Chart(ctx, {
      type: "radar",
      data: {
        labels: translatedDisc.value.map(item => item.label),
        datasets: [
          {
            label: t.value('discProfile'),
            data: translatedDisc.value.map(item => item.value),
            fill: true,
            backgroundColor: "rgba(126, 34, 206, 0.2)",
            borderColor: "rgba(126, 34, 206, 1)",
            pointBackgroundColor: "rgba(126, 34, 206, 1)",
          },
        ],
      },
      options: {
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: {
              stepSize: 20,
              color: (context) => {
                return document.documentElement.classList.contains('dark') 
                  ? "rgba(209, 213, 219, 0.8)" 
                  : "rgba(55, 65, 81, 0.8)";
              }
            },
            pointLabels: {
              color: (context) => {
                return document.documentElement.classList.contains('dark') 
                  ? "rgba(209, 213, 219, 0.8)" 
                  : "rgba(55, 65, 81, 0.8)";
              }
            },
            grid: {
              color: (context) => {
                return document.documentElement.classList.contains('dark') 
                  ? "rgba(55, 65, 81, 0.8)" 
                  : "rgba(209, 213, 219, 0.8)";
              }
            },
            angleLines: {
              color: (context) => {
                return document.documentElement.classList.contains('dark') 
                  ? "rgba(55, 65, 81, 0.8)" 
                  : "rgba(209, 213, 219, 0.8)";
              }
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: (context) => {
                return document.documentElement.classList.contains('dark') 
                  ? "rgba(209, 213, 219, 0.8)" 
                  : "rgba(55, 65, 81, 0.8)";
              }
            },
          },
        },
      },
    });
  }
};

// Watch for language changes and redraw the chart
watch(() => props.currentLang, () => {
  createDiscChart();
});

onMounted(() => {
  createDiscChart();
});
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.8s ease-out;
}

.gradient-text {
  background-image: linear-gradient(to right, #8B5CF6, #EC4899);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
</style>
