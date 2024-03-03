<template>
  <div
    class="flex min-h-screen max-w-[100vw] flex-col overflow-x-hidden bg-background font-sans text-bright"
  >
    <header
      v-if="authState.loggedIn"
    >
      <div
        class="top-0 flex h-[60px] w-full flex-row items-center justify-center gap-3 bg-darkess px-4 shadow-md md:justify-start"
      >
        <NavigationLink
          text="Home"
        />
        <NavigationLink
          to="drinks"
          text="Eintragen"
        />
        <NavigationLink
          v-if="authState.role === Role.ADMIN"
          to="create"
          text="Erstellen"
        />
        <nav class="ml-auto flex h-full items-center">
          <ArrowRightEndOnRectangleIcon
            class="h-[30px] hover:fill-primary"
            @click="handleLogoutBtn"
          />
        </nav>
      </div>
    </header>
    <div
      class="relative flex grow-[1]"
    >
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavigationLink from '@/components/navigation/NavigationLink.vue';
import { useLogin } from './stores/loginStore';
import { Role } from './enums/Role';
import { useDrinks } from './stores/drinkStore';
import { onMounted, watch } from 'vue';
import { useDrinkTransactions } from './stores/drinkTransactionStore';
import { useRouter } from 'vue-router';
import { ArrowRightEndOnRectangleIcon } from '@heroicons/vue/24/solid';

const { logout, authState } = useLogin();
const { receiveDrinks, endReceiveDrinks, getAllDrinks} = useDrinks();
const { receiveDrinkTransactions, endReceiveTransactions, getAllDrinkTransactions } = useDrinkTransactions();
const router = useRouter();

onMounted(async () => {
  if (authState.loggedIn) {
    await getAllDrinkTransactions();
    await getAllDrinks();
    receiveDrinks();
    receiveDrinkTransactions();
  }
});

watch(
  () => authState.loggedIn,
  async (afterLoggedIn, prevLoggedIn) => {
    if (!prevLoggedIn && afterLoggedIn) {
      await getAllDrinkTransactions();
      await getAllDrinks();
      receiveDrinks();
      receiveDrinkTransactions();
    }
  }
);

function handleLogoutBtn() {
  endReceiveDrinks();
  endReceiveTransactions();
  logout();
  router.push({ name: 'login' });
}
</script>
