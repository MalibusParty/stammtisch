<template>
  <div
    class="max-w-[1200px] min-w-[320px]"
  >
    <LoginForm
      v-if="isLoginForm"
    />
    <RegisterForm
      v-else
    />
    <button
      class="mt-8"
      @click="isLoginForm = !isLoginForm"
    >
      {{ isLoginForm ? 'Registrieren' : 'Einloggen' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useLogin } from '@/stores/loginStore';
import LoginForm from '@/components/authorization/LoginForm.vue';
import RegisterForm from '@/components/authorization/RegisterForm.vue';
import router from '@/router';

const { logout, authState } = useLogin();

const isLoginForm = ref(true);

onMounted(() => {
  logout();
});

watch(
  authState,
  () => {
    if (authState.loggedIn && authState.token !== '') {
      router.push('/');
    }
  }
)
</script>