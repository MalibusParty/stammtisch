<template>
  <div class="w-full min-w-[300px] max-w-[450px] p-2">
    <form
      v-if="isLoaded"
      class="flex w-full min-w-[300px] max-w-[450px] flex-col gap-4 rounded-xl bg-darkess p-6 shadow-md"
      @submit.prevent=""
    >
      <NumberInput
        v-for="potentialTransaction in potentialDrinkTransactions"
        :key="potentialTransaction.drink_id"
        v-model="potentialTransaction.count"
        :label="convertDrinkToName(getDrinkById(potentialTransaction.drink_id))"
      />
      <BasicButton
        :outline="false"
        @click="handleSubmit"
      >
        Eintragen
      </BasicButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import BasicButton from '@/components/misc/BasicButton.vue';
import NumberInput from '@/components/misc/NumberInput.vue';
import { onMounted, ref, type Ref, watch } from 'vue';
import { useDrinks } from '@/stores/drinkStore';
import { useLogin } from '@/stores/loginStore';
import { useDrinkTransactions } from '@/stores/drinkTransactionStore';
import type DrinkTransactionDTO from '@/interfaces/DrinkTransactionDTO';
import { useRouter } from 'vue-router';

const { drinksState, getAllDrinks, getDrinkById, convertDrinkToName } = useDrinks();
const { authState } = useLogin();
const { addDrinkTransactions } = useDrinkTransactions();

const isLoaded = ref(false);
const potentialDrinkTransactions: Ref<DrinkTransactionDTO[]> = ref([]);
const router = useRouter();

onMounted(async () => {
  if (drinksState.value.length === 0) {
    await getAllDrinks();
  }

  potentialDrinkTransactions.value = getPotentialTransactions();
  isLoaded.value = true;
});

watch(
  drinksState.value,
  () => potentialDrinkTransactions.value = getPotentialTransactions()
);

async function handleSubmit() {
  const transactionsToAdd = generateTransactions();
  const worked = await addDrinkTransactions(transactionsToAdd);
  if (worked) {
    potentialDrinkTransactions.value.forEach(drinkTransaction => drinkTransaction.count = 0);
    router.push('/');
  }
}

function generateTransactions() {
  // TODO: replace with event selection
  const currentDate = new Date().toISOString();

  return potentialDrinkTransactions.value
    .filter(drinkTransaction => drinkTransaction.count > 0)
    .map(drinkTransaction => {
      return {
        drink_id: drinkTransaction.drink_id,
        count: drinkTransaction.count,
        username: drinkTransaction.username,
        timestamp: currentDate
      }
    });
}

function getPotentialTransactions() {
  return drinksState.value.map(drink => {
    return {
      drink_id: drink.drink_id,
      count: 0,
      username: authState.username,
      timestamp: ''
    };
  });
}
</script>