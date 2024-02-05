<template>
  <form
    class="bg-darkess rounded-lg p-4 shadow-md"
    @submit.prevent=""
  >
    <h2 class="text-outline font-head w-full text-center text-xl font-bold">
      Register
    </h2>
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
    <BasicButton
      class="mt-5"
      :type="ButtonType.BUTTON"
      :outline="false"
      @click="handleRegister"
    >
      Registrieren
    </BasicButton>
  </form>
</template>

<script setup lang="ts">
import InputLabel from '@/components/misc/InputLabel.vue';
import { ref } from 'vue';
import { useLogin } from '@/stores/loginStore';
import BasicButton from '../misc/BasicButton.vue';
import { ButtonType } from '@/enums/ButtonType';

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