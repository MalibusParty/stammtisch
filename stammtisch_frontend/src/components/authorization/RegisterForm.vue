<template>
  <form
    class="p-4 rounded-md shadow-md"
    @submit.prevent="handleRegister"
  >
    <h2>Register</h2>
    <InputLabel
      v-model="registerData.firstname"
      :label-visible="true"
      :label-text="'Vorname'"
      :required="true"
    />
    <InputLabel
      v-model="registerData.lastname"
      :label-visible="true"
      :label-text="'Nachname'"
      :required="true"
    />
    <InputLabel
      v-model="registerData.username"
      :label-visible="true"
      :label-text="'Benutzername'"
      :required="true"
    />
    <InputLabel
      v-model="registerData.password"
      :label-visible="true"
      :label-text="'Passwort'"
      :required="true"
      :type="'password'"
    />
    <input
      class="p-2 bg-slate-400 rounded-md"
      type="submit"
      value="Registrieren"
    >
  </form>
</template>

<script setup lang="ts">
import InputLabel from '@/components/misc/InputLabel.vue';
import { ref } from 'vue';
import { useLogin } from '@/stores/loginStore';

const { register } = useLogin();

const registerData = ref({
  firstname: '',
  lastname: '',
  username: '',
  password: ''
});

async function handleRegister() {
  const result = await register(
    registerData.value.firstname,
    registerData.value.lastname,
    registerData.value.username,
    registerData.value.password
  );

  // TODO: handle after register better
  if (result !== undefined && result === true) {
    registerData.value.firstname = ''
    registerData.value.lastname = ''
    registerData.value.username = ''
    registerData.value.password = ''
  } else {
    console.log('Error on register');
  }
}
</script>