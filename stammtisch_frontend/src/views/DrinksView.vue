<template>
  <div class="mt-4 flex w-full flex-col items-center">
    Trage hier deinen Mist ein!
    <form
      class="bg-darkess flex w-[450px] flex-col gap-4 rounded-xl p-6 shadow-md"
      @submit.prevent=""
    >
      <NumberInput
        v-model="num"
        label="Bier 0,4l"
      />
      <BasicButton
        :outline="false"
      >
        Eintragen
      </BasicButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import BasicButton from '@/components/misc/BasicButton.vue';
import NumberInput from '@/components/misc/NumberInput.vue';
import { ref } from 'vue';

const num = ref(0);
</script>