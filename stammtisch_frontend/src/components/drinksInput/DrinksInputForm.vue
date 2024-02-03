<template>
  <form
    class="bg-darkess flex w-[450px] flex-col gap-4 rounded-xl p-6 shadow-md"
    @submit.prevent=""
  >
    <!-- <NumberInput
      v-model=""
      label="Bier 0,4l"
    /> -->
    <BasicButton
      :outline="false"
    >
      Eintragen
    </BasicButton>
  </form>
</template>

<script setup lang="ts">
import BasicButton from '@/components/misc/BasicButton.vue';
import NumberInput from '@/components/misc/NumberInput.vue';
import { ref } from 'vue';


</script>