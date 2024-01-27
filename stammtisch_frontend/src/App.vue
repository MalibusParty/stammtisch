<template>
  <div
    class="flex min-h-screen flex-col bg-background text-bright font-sans max-w-[100vw] overflow-x-hidden"
  >
    <header
      v-if="authState.loggedIn"
    >
      <div
        class="flex flex-row justify-center items-center bg-darkess gap-3 top-0 h-[60px] w-full shadow-md px-4 md:justify-start"
      >
        <NavigationLink
          text="Home"
        />
        <NavigationLink
          to="drinks"
          text="Eintragen"
        />
        <NavigationLink
          v-if="authState.username === 'febe94'"
          to="create"
          text="Erstellen"
        />
        <NavigationLink
          class="ml-auto"
          to="login"
          text="Logout"
          @click="logout"
        />
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
import { RouterView } from 'vue-router';
import NavigationLink from '@/components/navigation/NavigationLink.vue';
import { useLogin } from './stores/loginStore';

const { logout, authState } = useLogin();
</script>
