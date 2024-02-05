<template>
  <nav class="flex h-full items-center">
    <RouterLink
      class="hover:text-primary flex h-full cursor-pointer items-center px-2 font-bold"
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
      class="hover:fill-primary h-[30px]"
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