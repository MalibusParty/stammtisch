<template>
  <div
    class="mt-4 flex size-full grow flex-col items-center px-4"
  >
    <div class="absolute z-50 w-[300px]">
      <Listbox
        v-model="selectedOption"
        v-slot="{ open }"
      >
        <ListboxButton
          class="w-full cursor-pointer border-[1px] border-primary bg-background px-5 py-2 font-italic font-bold text-primary shadow-md active:bg-darkess"
          :class="open ? 'rounded-t-3xl' : ' rounded-3xl'"
        >
          {{ selectedOption }}
        </ListboxButton>
        <ListboxOptions
          class="w-full cursor-pointer rounded-b-[21px] border-[1px] border-primary bg-background px-5 py-2 font-italic font-bold text-primary shadow-md hover:cursor-pointer active:bg-darkess"
        >
          <ListboxOption
            v-for="option in options"
            :key="option"
            :value="option"
            class="border-b-[1px] border-primary p-2 last:border-b-0 hover:text-bright"
            v-slot="{ selected }"
          >
            <span
              :class="{ 'text-bright': selected }"
            >
              {{ option }}
            </span>
          </ListboxOption>
        </ListboxOptions>
      </Listbox>
    </div>
    <div
      class="mx-auto mt-[60px] flex size-full items-center justify-center"
    >
      <BeerChartContainer
        v-if="selectedOption === options[0]"
      />
      <DrinkCompareContainer
        v-if="selectedOption === options[1]"
      />
      <PersonalBeerContainer
        v-if="selectedOption === options[2]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useDrinkTransactions } from '@/stores/drinkTransactionStore';
import { useUsers } from '@/stores/userStore';
import DrinkCompareContainer from '@/components/charts/DrinkCompareContainer.vue';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue';
import PersonalBeerContainer from '@/components/charts/PersonalBeerContainer.vue';
import BeerChartContainer from '@/components/charts/BeerChartContainer.vue';

const { DrinkTransactionsState, getAllDrinkTransactions } = useDrinkTransactions();
const { fetchUsers } = useUsers();

const options = [
  'Bier',
  'Gesamt',
  'Persönlich Bier'
]
const selectedOption = ref(options[0]);

onMounted(async () => {
  await fetchUsers();
  if (Object.keys(DrinkTransactionsState.drinksData).length === 0) {
    await getAllDrinkTransactions();
  }
});

</script>
