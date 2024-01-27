<template>
  <div
    class="w-full min-h-screen mt-4 flex flex-col items-center"
  >
    <DrinkCompareChart
      v-if="drinksData"
      class="w-full md:h-[80vh]"
      :users="users"
      :series-data="series"
      :title="'Cumulative Drinks'"
    />
    <button
      class="p-2 bg-slate-300 rounded-lg shadow-md mt-4"
      @click="getAllDrinks"
    >
      Get Drinks
    </button>
  </div>
</template>

<script setup lang="ts">
import DrinkCompareChart from '@/components/charts/DrinkCompareChart.vue';
import { computed, onMounted, ref } from 'vue';
import { type DrinksData, useMockBeerData } from '@/stores/MockBeerData';
import type { StackedBar } from '@/interfaces/BarCharts';
import { useDrinks } from '@/stores/drinkStore';

const { DrinksState, generateUserData, getDrinkData } = useMockBeerData();
const { drinksState, getAllDrinks } = useDrinks();

const drinksData = ref<DrinksData | null>(null);

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
  generateUserData(['Felix', 'Igi', 'Levi', 'Rafi', 'Stefan', 'Sebi'], 5);
  drinksData.value = getDrinkData(DrinksState.data);
}
</script>
