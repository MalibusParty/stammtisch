<template>
  <button
    class="w-full rounded-full px-5 py-2 font-italic font-bold shadow-md"
    :class="outline ? 'text-primary bg-background border-[1px] border-primary active:bg-darkess' : 'bg-primary text-background active:bg-peach'"
    :type="type"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { ButtonType } from '@/enums/ButtonType';

withDefaults(defineProps<{
  outline: boolean,
  type?: ButtonType
}>(), {
  type: ButtonType.BUTTON
});

</script>