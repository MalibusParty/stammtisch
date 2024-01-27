<template>
  <div
    class="w-full flex flex-col items-center mt-4"
  >
    <div class="mb-4 w-fit flex flex-row">
      <BasicButton
        class="mt-8  mr-4 w-fit"
        :outline="!isLoginForm"
        @click="isLoginForm = true"
      >
        Einloggen
      </BasicButton>
      <BasicButton
        class="mt-8 w-fit"
        :outline="isLoginForm"
        @click="isLoginForm = false"
      >
        Registrieren
      </BasicButton>
    </div>
    <div
      class="w-[300px] md:w-[450px]"
    >
      <LoginForm
        v-if="isLoginForm"
      />
      <RegisterForm
        v-else
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useLogin } from '@/stores/loginStore';
import LoginForm from '@/components/authorization/LoginForm.vue';
import RegisterForm from '@/components/authorization/RegisterForm.vue';
import router from '@/router';
import BasicButton from '@/components/misc/BasicButton.vue';

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