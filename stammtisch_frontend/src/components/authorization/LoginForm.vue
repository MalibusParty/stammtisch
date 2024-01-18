<template>
  <form
    class="p-4 rounded-md shadow-md"
    @submit.prevent="handleLogin"
  >
    <h2>Einloggen</h2>
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
    <input
      class="p-2 bg-slate-400 rounded-md"
      type="submit"
      value="Login"
    >
  </form>
</template>

<script setup lang="ts">
import InputLabel from '@/components/misc/InputLabel.vue';
import { ref } from 'vue';
import { useLogin } from '@/stores/loginStore';

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