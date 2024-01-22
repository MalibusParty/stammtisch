<template>
  <main>
    <div class="flex h-2 w-3 flex-1 rounded border-2 shadow-md">
      Logged in!
    </div>
    <DrinkCompareChart
      v-if="drinksData"
      :users="users"
      :series-data="series"
      :title="'Cumulative Drinks'"
    />
    <button
      class="p-2 bg-slate-300 rounded-lg shadow-md"
      @click="updateChart"
    >
      Update
    </button>
  </main>
</template>

<script setup lang="ts">
import DrinkCompareChart from '@/components/charts/DrinkCompareChart.vue';
import { computed, onMounted, ref } from 'vue';
import { type DrinksData, useMockBeerData } from '@/stores/MockBeerData';
import type { StackedBar } from '@/interfaces/BarCharts';

const { DrinksState, generateUserData, getDrinkData } = useMockBeerData();

const drinksData = ref<DrinksData | null>(null);

// const users = ['Felix', 'Igi', 'Levi'];
const users = computed(() => {
  if (drinksData.value) {
    return Object.keys(drinksData.value)
  }
  return [];
})

onMounted(() => {
  generateUserData(['Felix', 'Igi', 'Levi', 'Rafi', 'Stefan', 'Sebi'], 3);
  drinksData.value = getDrinkData(DrinksState.data);
});


const series = computed<StackedBar[]>(() => {
  return [
    {
      name: "Bier",
      type: 'column',
      data: drinksData.value ? Object.values(drinksData.value).map(data => data.beer) : []
    },
    {
      name: "Wein",
      type: 'column',
      data: users.value.map(user => drinksData.value?.[user].wine) as number[]
    },
    {
      name: "Longdrinks",
      type: 'column',
      data: users.value.map(user => drinksData.value?.[user].longdrink) as number[]
    },
    {
      name: "Likör",
      type: 'column',
      data: users.value.map(user => drinksData.value?.[user].liqueur) as number[]
    },
    {
      name: "Schnapps",
      type: 'column',
      data: users.value.map(user => drinksData.value?.[user].liquor) as number[]
    }
  ]
});

function updateChart() {
  // const max = 90;
  // const min = 5;
  // const newData = series.value[0].data.map(() => Math.floor(Math.random() * (max - min + 1)) + min);
  // const colors = ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"];

  // chartOptions.value = {
  //   ...chartOptions.value,
  //   colors: [colors[Math.floor(Math.random() * colors.length)]]
  // }

  // series.value[0].data = newData;
  generateUserData(['Felix', 'Igi', 'Levi', 'Rafi', 'Stefan', 'Sebi'], 5);
  drinksData.value = getDrinkData(DrinksState.data);
}
</script>
