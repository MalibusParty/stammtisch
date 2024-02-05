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
          v-if="authState.role === Role.ADMIN"
          to="create"
          text="Erstellen"
        />
        <nav class="ml-auto flex h-full items-center">
          <ArrowRightEndOnRectangleIcon
            class="hover:fill-primary h-[30px]"
            @click="handleLogoutBtn"
          />
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
    console.log(`Login Status changed from ${prevLoggedIn} to ${afterLoggedIn} and is now ${authState.loggedIn}`);
    if (!prevLoggedIn && afterLoggedIn) {
      console.log('getting data after login');
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
