<template>
  <nav class="h-full flex items-center">
    <RouterLink
      class="h-full flex items-center cursor-pointer font-bold px-2 hover:text-primary"
      :class="{'text-primary': isCurrentRoute}"
      :to="`/${to}`"
    >
    <span
      v-if="text !== 'Logout'"
      class="font-head"
    >
      {{ text }}
    </span>
    <ArrowRightEndOnRectangleIcon
      v-else
      class="h-[30px] hover:fill-primary"
    />
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { ArrowRightEndOnRectangleIcon } from '@heroicons/vue/24/solid';
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();

const props = withDefaults(defineProps<{
  to?: string,
  text: string
}>(), {
  to: ''
});

const isCurrentRoute = computed(() => route.path === `/${props.to}`);

</script>