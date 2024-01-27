<template>
  <div class="mt-4 w-full flex flex-col items-center">
    <h2>
      Erstelle einen neuen Drink
    </h2>
    <form
      class="w-[450px] flex flex-col bg-darkess gap-4 shadow-md rounded-lg p-6"
      @submit.prevent="handleCreate"
    >
      <input
        list="drinktypes"
        name="drinktypes"
        v-model="drinkType"
      >
      <datalist id="drinktypes">
        <option
          v-for="drink in options"
          :key="drink"
        >
          {{ drink }}
        </option>
      </datalist>
      <InputLabel
        v-model="volume"
        type="number"
        label-text="Volume in 100ml"
        :required="true"
      />
      <BasicButton
        :outline="false"
      >
        Erstellen
      </BasicButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import BasicButton from '@/components/misc/BasicButton.vue';
import InputLabel from '@/components/misc/InputLabel.vue';
import { DrinkType } from '@/enums/DrinkType';
import { ref } from 'vue';
import { useDrinks } from '@/stores/drinkStore';
import type DrinkDTO from '@/interfaces/DrinkDTO';

const { createDrink } = useDrinks();

const options = [
  DrinkType.BEER, DrinkType.WINE, DrinkType.LONGDRINK, DrinkType.LIQUEUR, DrinkType.LIQUOR
]

const volume = ref('0');
const drinkType = ref(options[0]);

async function handleCreate() {
  const drink: DrinkDTO = {
    drink_id: 0,
    drinkType: drinkType.value,
    volume: parseInt(volume.value) * 100
  }

  await createDrink(drink);
}
</script>