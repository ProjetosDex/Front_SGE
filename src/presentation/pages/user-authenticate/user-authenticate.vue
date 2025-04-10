<template>
  <div class="authenticate-container">
    <div class="system-title">
      <img src="@/assets/images/Logo-IFPA.png" alt="" class="logo-ifpa" />
      <h1>Bem vindo ao sistema de gerenciamento de estágio do IFPA</h1>
    </div>
    <div class="form-authenticate">
      <FormSelector
        :radio-options="authOptions"
        v-model="authenticationOption"
      />

      <AuthForm :type-form="authenticationOption"></AuthForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AuthForm from '@/presentation/organisms/auth-form/auth-form.vue';
import FormSelector from '@/presentation/organisms/form-selector/form-selector.vue';

enum AuthOption {
  LOGIN = 'Login',
  REGISTER = 'Register',
}

type AuthOptionType = {
  value: AuthOption;
  label: string;
};

const authOptions: AuthOptionType[] = [
  { value: AuthOption.LOGIN, label: 'Login' },
  { value: AuthOption.REGISTER, label: 'Registrar' },
];

const authenticationOption = ref<AuthOption>(AuthOption.LOGIN);
</script>

<style
  src="@/presentation/pages/user-authenticate/user-authenticate.scss"
  lang="scss"
  scoped
></style>
