<template>
  <div class="mt-4 w-full flex flex-col items-center">
    Trage hier deinen Mist ein!
    <form
      class="w-[450px] flex flex-col bg-darkess gap-4 shadow-md rounded-lg p-6"
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