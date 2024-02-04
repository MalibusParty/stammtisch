<template>
  <div class="flex size-full flex-col gap-1">
    <span
      class="ml-4 flex flex-row items-center gap-1"
      :class="darkLabel ? 'text-background' : 'text-primary fill-primary'"
    >
      <slot />
      {{ label }}
    </span>
    <div
      class="grid grid-cols-[auto_minmax(0,1fr)_auto] grid-rows-1 items-center rounded-full shadow-md"
      :class="outline ? 'text-primary bg-background border-[1px] border-primary' : 'bg-primary text-background'"
    >
      <button
        class="h-full rounded-l-full border-r-2 px-4 py-2 font-bold transition-colors"
        :class="outline ? 'border-primary active:bg-darkess' : 'border-background active:bg-peach'"
        type="button"
        @click="value > 0 ? value -= 1 : void 0"
      >
        <MinusIcon
          class="w-[24px]"
        />
      </button>
      <span
        class="text-center font-italic font-bold"
      >
        {{ value }}
      </span>
      <button
        class="h-full rounded-r-full border-l-2 px-4 py-2 font-bold transition-colors"
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