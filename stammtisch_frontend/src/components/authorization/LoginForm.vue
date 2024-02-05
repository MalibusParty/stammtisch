<template>
  <form
    class="bg-darkess rounded-lg p-4 shadow-md"
    @submit.prevent=""
  >
    <h2 class="text-outline font-head w-full text-center text-xl font-bold">
      Einloggen
    </h2>
    <InputLabel
      v-model="loginData.username"
      :label-visible="true"
      :label-text="'Benutzername'"
      :required="true"
    />
    <InputLabel
      v-model="loginData.password"
      :label-visible="true"
      :label-text="'Passwort'"
      :required="true"
      :type="'password'"
    />
    <BasicButton
      class="mt-5"
      :type="ButtonType.BUTTON"
      :outline="false"
      @click="handleLogin"
    >
      Login
    </BasicButton>
  </form>
</template>

<script setup lang="ts">
import InputLabel from '@/components/misc/InputLabel.vue';
import { ref } from 'vue';
import { useLogin } from '@/stores/loginStore';
import BasicButton from '../misc/BasicButton.vue';
import { ButtonType } from '@/enums/ButtonType';

const { login } = useLogin();

const loginData = ref({
  username: '',
  password: ''
});

async function handleLogin() {
  await login(
    loginData.value.username,
    loginData.value.password
  );
}
</script>