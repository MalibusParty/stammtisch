<template>
  <div
    class="flex w-full flex-col items-center gap-4"
  >
    <PersonalBeerChart
      v-if="DrinkTransactionsState.drinksData"
      class="min-md:h-[500px] w-full"
      :dates="dates"
      :seriesData="series"
      title="Bier"
    />
  </div>
</template>

<script setup lang="ts">
import { useDrinkTransactions } from '@/stores/drinkTransactionStore';
import PersonalBeerChart from './PersonalBeerChart.vue';
import { computed } from 'vue';
import { useLogin } from '@/stores/loginStore';

const { DrinkTransactionsState } = useDrinkTransactions();
const { authState } = useLogin()

const dates = computed(() => {
  return Object.keys(DrinkTransactionsState.drinksData[authState.username]).sort((a, b) => {
    if (new Date(a) > new Date(b)) return 1;
    else return -1;
  });
});

const series = computed(() => {
  return Object.entries(DrinkTransactionsState.drinksData[authState.username])
  .sort((a, b) => {
    if (new Date(a[0]) > new Date(b[0])) return 1;
    else return -1;
  })
  .map(datapoint => datapoint[1]['BEER'].volume);
});
</script>