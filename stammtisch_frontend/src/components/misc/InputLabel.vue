<template>
  <div class="w-full">
    <label
      v-if="labelText !== '' && labelVisible"
      :for="labelText"
      class="w-full px-4 text-start text-xs font-medium text-primary"
    >
      {{ labelText }}
    </label>
    <div
      class="invalid flex h-[46px] w-full flex-row items-center overflow-hidden rounded-full border-[1px] border-solid border-primary px-4 py-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/75 focus-visible:ring-offset-2"
    >
      <input
        :id="labelText"
        v-model="value"
        :type="type"
        :name="labelText"
        :placeholder="labelText"
        :min="min"
        :required="required"
        class="w-full truncate border-none bg-[rgba(0,0,0,0)] text-[14px] text-primary font-medium invalid:border-autumn focus:outline-none focus:bg-transparent autofill:bg-transparent active:bg-transparent"
      >
      <XMarkIcon
        v-if="value !== '' && xButtonActive === true"
        class="h-full w-10 cursor-pointer justify-self-end transition-transform hover:scale-[120%]"
        aria-hidden="true"
        @click="value = ''"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/solid';

const props = withDefaults(defineProps<{
  labelText?: string,
  modelValue: string,
  type?: string,
  min?: number,
  labelVisible?: boolean,
  required?: boolean,
  xButtonActive?: boolean
}>(), {
  labelText: '',
  type: 'text',
  min: 0,
  labelVisible: true,
  required: false,
  xButtonActive: false
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

<style scoped>
input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active{
    -webkit-background-clip: text;
    -webkit-text-fill-color: #ffb4a7;
    transition: background-color 5000s ease-in-out 0s;
    box-shadow: inset 0 0 20px 20px #23232329;
}
</style>