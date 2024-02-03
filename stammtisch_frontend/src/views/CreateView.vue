<template>
  <div class="mt-4 flex w-full flex-col items-center">
    <h2>Erstelle einen neuen Drink</h2>
    <form
      class="flex w-[450px] flex-col gap-4 rounded-xl bg-darkess p-6 shadow-md"
      @submit.prevent="handleCreate"
    >
      <Listbox v-model="drinkType">
        <ListboxButton
          class="w-full cursor-pointer rounded-full border-[1px] border-primary bg-background px-5 py-2 font-italic font-bold text-primary shadow-md active:bg-darkess"
        >
          {{ drinkType }}
        </ListboxButton>
        <ListboxOptions
          class="w-full cursor-pointer rounded-[21px] border-[1px] border-primary bg-background px-5 py-2 font-italic font-bold text-primary shadow-md hover:cursor-pointer active:bg-darkess"
        >
          <ListboxOption
            v-for="option in options"
            :key="option"
            :value="option"
            class="p-2 border-b-[1px] border-primary hover:text-bright last:border-b-0"
          >
            {{ option }}
          </ListboxOption>
        </ListboxOptions>
      </Listbox>
      <InputLabel
        v-model="volume"
        type="number"
        label-text="Volume in 100ml"
        :required="true"
      />
      <BasicButton
        :outline="false"
        @click="handleCreate"
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
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue';

const { createDrink } = useDrinks();

const options = [
  DrinkType.BEER,
  DrinkType.WINE,
  DrinkType.LONGDRINK,
  DrinkType.LIQUEUR,
  DrinkType.LIQUOR,
];

const volume = ref('0');
const drinkType = ref(options[0]);

async function handleCreate() {
  const drink: DrinkDTO = {
    drink_id: 0,
    drinkType: drinkType.value,
    volume: parseInt(volume.value) * 100,
  };

  await createDrink(drink);
}
</script>
