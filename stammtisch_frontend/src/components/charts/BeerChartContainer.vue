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
    <BeerChart
      v-if="DrinkTransactionsState.drinksData"
      class="min-md:h-[500px] w-full"
      title="Bier Gesamt"
      :series-data="seriesData"
      :users="users"
    />
  </div>
</template>

<script setup lang="ts">
import BeerChart from './BeerChart.vue';
import { useDrinkTransactions } from '@/stores/drinkTransactionStore';
import { computed, ref } from 'vue';
import { DrinkType } from '@/enums/DrinkType';
import BasicButton from '../misc/BasicButton.vue';

const { DrinkTransactionsState } = useDrinkTransactions();

const isYearly = ref(false);

const users = computed(() => Object.keys( DrinkTransactionsState.drinksData));

const seriesData = computed(() => {
  return Object.values(DrinkTransactionsState.drinksData)
    .map(data => Object.entries(data)
      .filter(drinkData => {
        if (isYearly.value) {
          return new Date(drinkData[0]).getFullYear() === new Date().getFullYear();
        }
        return true;
      })
    )
    .map(data => Object.values(data)
      .reduce((acc, val) => {
        return acc + val[1][DrinkType.BEER].volume
      },0)
    );
});

</script>