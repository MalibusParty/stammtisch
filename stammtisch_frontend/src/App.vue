<template>
  <div
    class="flex min-h-screen flex-col"
  >
    <header>
      <div
        class="top-0 h-[60px] w-full shadow-md"
      >
        <nav>
          <RouterLink to="/">Home</RouterLink>
        </nav>
      </div>
    </header>
    <div
      class="relative grow-[1]"
    >
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
