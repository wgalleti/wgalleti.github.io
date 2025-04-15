<template>
  <section class="section-container mt-12">
    <div class="card" data-sr-left>
      <h2 class="text-2xl font-semibold mb-6 gradient-text">Perfil</h2>

      <ul class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Big Five -->
        <li class="flex flex-col items-start p-4 rounded-lg bg-purple-50 dark:bg-gray-700 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg" data-sr-left>
          <h2 class="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4">Big Five</h2>
          <div v-for="(item, index) in bigFive" :key="index" class="mb-4 w-full">
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
          <h2 class="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4">DISC</h2>
          <canvas ref="discChart" height="200" class="w-full"></canvas>
        </li>

        <!-- MBTI e Eneagrama -->
        <li class="flex flex-col items-start p-4 rounded-lg bg-purple-50 dark:bg-gray-700 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg" data-sr-left>
          <h2 class="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4">MBTI</h2>
          <p
            class="text-lg font-bold bg-purple-700 text-purple-50 inline-block px-3 py-1 rounded"
          >
            {{ mbti }}
          </p>

          <h2 class="text-xl font-semibold text-purple-600 dark:text-purple-400 mt-6 mb-2">
            Eneagrama
          </h2>
          <p class="text-lg text-gray-700 dark:text-gray-200">
            Tipo {{ eneagrama.tipo }} com asa {{ eneagrama.asa }}
            <span
              class="ml-2 bg-purple-700 text-purple-50 font-semibold px-2 py-1 rounded"
              >{{ eneagrama.tipo }}w{{ eneagrama.asa }}</span
            >
          </p>
          <ul class="mt-4 list-disc list-inside text-gray-700 dark:text-gray-300">
            <li
              v-for="(caracteristica, index) in eneagrama.caracteristicas"
              :key="index"
            >
              {{ caracteristica }}
            </li>
          </ul>
        </li>

        <!-- Forças e Riscos -->
        <li class="flex flex-col items-start p-4 rounded-lg bg-purple-50 dark:bg-gray-700 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg" data-sr-right>
          <h2 class="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4">
            Forças e Riscos
          </h2>
          <div class="mb-4">
            <h3 class="font-semibold text-purple-600 dark:text-purple-300 mb-1">Pontos Fortes</h3>
            <ul class="list-disc list-inside text-gray-700 dark:text-gray-300">
              <li v-for="(forca, index) in forcas" :key="'forca' + index">
                {{ forca }}
              </li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold text-purple-600 dark:text-purple-300 mb-1">Riscos</h3>
            <ul class="list-disc list-inside text-red-600 dark:text-red-400">
              <li v-for="(risco, index) in riscos" :key="'risco' + index">
                {{ risco }}
              </li>
            </ul>
          </div>
        </li>

        <!-- Valores -->
        <li class="flex flex-col items-center p-4 rounded-lg bg-purple-50 dark:bg-gray-700 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg col-span-1 md:col-span-2" data-sr-bottom>
          <h2 class="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4">
            Valores Essenciais
          </h2>
          <div class="flex gap-4 flex-wrap justify-center">
            <span
              v-for="(valor, index) in valores"
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
import { ref, onMounted, reactive } from "vue";
import Chart from "chart.js/auto";

// Props dinâmicas
const props = defineProps({
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

const discChart = ref(null);

onMounted(() => {
  if (discChart.value) {
    const ctx = discChart.value.getContext("2d");
    new Chart(ctx, {
      type: "radar",
      data: {
        labels: Object.keys(props.disc),
        datasets: [
          {
            label: "Perfil DISC",
            data: Object.values(props.disc),
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
</style>
