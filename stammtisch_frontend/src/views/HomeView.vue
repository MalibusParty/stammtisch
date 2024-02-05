<template>
  <div
    class="mt-4 flex min-h-screen w-full flex-col items-center"
  >
    <DrinkCompareChart
      v-if="DrinkTransactionsState.drinksData"
      class="w-full md:h-[80vh]"
      :users="users"
      :series-data="series"
      :title="'Cumulative Drinks'"
    />
    <button
      class="mt-4 rounded-lg bg-slate-300 p-2 shadow-md"
      @click="getAllDrinkTransactions"
    >
      Get Drinks
    </button>
  </div>
</template>

<script setup lang="ts">
import DrinkCompareChart from '@/components/charts/DrinkCompareChart.vue';
import { computed, onMounted } from 'vue';
import type { StackedBar } from '@/interfaces/BarCharts';
import { useDrinkTransactions } from '@/stores/drinkTransactionStore';
import { DrinkType } from '@/enums/DrinkType';

const { DrinkTransactionsState, getAllDrinkTransactions } = useDrinkTransactions();

const users = computed(() => DrinkTransactionsState.drinksData ? Object.keys(DrinkTransactionsState.drinksData) : []);

onMounted(async () => {
  if (Object.keys(DrinkTransactionsState.drinksData).length === 0) {
    await getAllDrinkTransactions();
  }
});


const series = computed<StackedBar[]>(() => {
  return [
    {
      name: "Bier",
      type: 'column',
      data: DrinkTransactionsState.drinksData ? getAllDataForDrink(DrinkType.BEER) : []
    },
    {
      name: "Wein",
      type: 'column',
      data: DrinkTransactionsState.drinksData ? getAllDataForDrink(DrinkType.WINE) : []
    },
    {
      name: "Longdrinks",
      type: 'column',
      data: DrinkTransactionsState.drinksData ? getAllDataForDrink(DrinkType.LONGDRINK) : []
    },
    {
      name: "Likör",
      type: 'column',
      data: DrinkTransactionsState.drinksData ? getAllDataForDrink(DrinkType.LIQUEUR) : []
    },
    {
      name: "Schnapps",
      type: 'column',
      data: DrinkTransactionsState.drinksData ? getAllDataForDrink(DrinkType.LIQUOR) : []
    }
  ]
});

function getAllDataForDrink(type: DrinkType) {
  return Object.values(DrinkTransactionsState.drinksData)
    .map(data => Object.values(data)
    .reduce((acc, val) => {
      return acc + val[type].volume
    },0));
}
</script>
