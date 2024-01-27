<template>
  <div class="flex flex-col w-full h-full gap-1">
    <span
      class="ml-4 flex flex-row items-center gap-1"
      :class="darkLabel ? 'text-background' : 'text-primary fill-primary'"
    >
      <slot />
      {{ label }}
    </span>
    <div
      class="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center grid-rows-1 shadow-md rounded-full"
      :class="outline ? 'text-primary bg-background border-[1px] border-primary' : 'bg-primary text-background'"
    >
      <button
        class="h-full py-2 px-4 border-r-2 rounded-l-full font-bold transition-colors"
        :class="outline ? 'border-primary active:bg-darkess' : 'border-background active:bg-peach'"
        type="button"
        @click="value > 0 ? value -= 1 : void 0"
      >
        <MinusIcon
          class="w-[24px]"
        />
      </button>
      <span
        class="text-center font-bold font-italic"
      >
        {{ value }}
      </span>
      <button
        class="h-full py-2 px-4 border-l-2 rounded-r-full font-bold transition-colors"
        :class="outline ? 'border-primary active:bg-darkess' : 'border-background active:bg-peach'"
        type="button"
        @click="value += 1"
      >
        <PlusIcon
          class="w-[24px]"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { MinusIcon, PlusIcon } from '@heroicons/vue/24/solid';


const props = withDefaults(defineProps<{
  modelValue: number,
  label?: string,
  outline?: boolean,
  darkLabel?: boolean
}>(),{
  label: '',
  outline: true,
  darkLabel: false
});

const emit = defineEmits(['update:modelValue']);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  }
});

</script>