<template>
  <div
    class="flex w-full flex-col items-center gap-4"
  >
    <div
      class="flex w-[300px] flex-row gap-2"
    >
      <BasicButton
        :outline="isYearly"
        @click="isYearly = false"
      >
        All Time
      </BasicButton>
      <BasicButton
        :outline="!isYearly"
        @click="isYearly = true"
      >
        Yährlich
      </BasicButton>
    </div>
    <DrinkCompareChart
      v-if="DrinkTransactionsState.drinksData"
      class="min-md:h-[500px] w-full"
      :users="users"
      :series-data="series"
      :title="'Cumulative Drinks'"
    />
  </div>
</template>

<script setup lang="ts">
import DrinkCompareChart from '@/components/charts/DrinkCompareChart.vue';
import { computed, ref } from 'vue';
import type { StackedBar } from '@/interfaces/BarCharts';
import { useDrinkTransactions } from '@/stores/drinkTransactionStore';
import { DrinkType } from '@/enums/DrinkType';
import { useUsers } from '@/stores/userStore';
import BasicButton from '../misc/BasicButton.vue';

const { DrinkTransactionsState } = useDrinkTransactions();
const { usersState } = useUsers();

const isYearly = ref(false);

const users = computed(() => {
  if (DrinkTransactionsState.drinksData) {
    return Object.keys(DrinkTransactionsState.drinksData).map(username => {
      if (usersState.value[username]) {
        return usersState.value[username];
      }
      return username;
    });
  } 
  return [];
});

const series = computed<StackedBar[]>(() => {
  return [
    {
      name: "Bier",
      type: 'column',
      data: DrinkTransactionsState.drinksData ? getAllDataForDrink(DrinkType.BEER, isYearly.value) : []
    },
    {
      name: "Wein",
      type: 'column',
      data: DrinkTransactionsState.drinksData ? getAllDataForDrink(DrinkType.WINE, isYearly.value) : []
    },
    {
      name: "Longdrinks",
      type: 'column',
      data: DrinkTransactionsState.drinksData ? getAllDataForDrink(DrinkType.LONGDRINK, isYearly.value) : []
    },
    {
      name: "Likör",
      type: 'column',
      data: DrinkTransactionsState.drinksData ? getAllDataForDrink(DrinkType.LIQUEUR, isYearly.value) : []
    },
    {
      name: "Schnapps",
      type: 'column',
      data: DrinkTransactionsState.drinksData ? getAllDataForDrink(DrinkType.LIQUOR, isYearly.value) : []
    }
  ]
});

function getAllDataForDrink(type: DrinkType, isYearly: boolean = false) {
  return Object.values(DrinkTransactionsState.drinksData)
    .map(data => Object.entries(data)
      .filter(drinkData => {
        if (isYearly) {
          return new Date(drinkData[0]).getFullYear() === new Date().getFullYear();
        }
        return true;
      })
    )
    .map(data => Object.values(data)
      .reduce((acc, val) => {
        return acc + val[1][type].volume
      },0)
    );
}
</script>