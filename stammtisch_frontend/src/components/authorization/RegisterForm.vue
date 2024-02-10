<template>
  <form
  v-if="!isRegistered"
    class="rounded-lg bg-darkess p-4 shadow-md"
    @submit.prevent=""
  >
    <h2 class="w-full text-center font-head text-xl font-bold text-outline">
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
  <div
    v-else
    class="flex flex-row items-center justify-center gap-2 rounded-lg bg-darkess p-4 shadow-md"
  >
    <CheckCircleIcon
      class="size-8 fill-green-600"
    />
    <span class="text-center text-bright">
      Registrieren hat funktioniert!
    </span>
  </div>
</template>

<script setup lang="ts">
import InputLabel from '@/components/misc/InputLabel.vue';
import { ref } from 'vue';
import { useLogin } from '@/stores/loginStore';
import BasicButton from '../misc/BasicButton.vue';
import { ButtonType } from '@/enums/ButtonType';
import { CheckCircleIcon } from '@heroicons/vue/24/solid';

const { register } = useLogin();

const isRegistered = ref(false);

const registerData = ref({
  firstname: '',
  lastname: '',
  username: '',
  password: ''
});

async function handleRegister() {
  if (isRegistered.value) {
    return;
  }
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
    isRegistered.value = true;
  } else {
    console.log('Error on register');
  }
}
</script>