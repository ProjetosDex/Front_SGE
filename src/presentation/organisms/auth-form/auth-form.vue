<template>
  <v-form
    class="form_container"
    @keydown="handleKeydownForm($event, formAction)"
    @submit.prevent="formAction"
  >
    <div class="title_container">
      <p class="title">{{ title }}</p>
      <span class="subtitle">{{ subTitle }}</span>
    </div>
    <br />

    <div
      :class="
        typeForm === 'Register' ? 'form-register-inputs' : 'form-login-inputs'
      "
    >
      <template v-for="field in filteredInputs" :key="field.id">
        <!-- Campos de senha com olhinho -->
        <v-text-field
          v-if="field.type === 'password'"
          v-model="field.value"
          :label="field.label"
          :id="field.id"
          :type="showPassword[field.id] ? 'text' : 'password'"
          :placeholder="field.placeholder"
          :append-inner-icon="
            showPassword[field.id] ? 'mdi-eye-off' : 'mdi-eye'
          "
          @click:append-inner="toggleShowPassword(field.id)"
          hide-details
          dense
        />
        <!-- Outros campos -->
        <InputGroup
          v-else
          v-model="field.value"
          :label="field.label"
          :id="field.id"
          :type="field.type"
          :placeholder="field.placeholder"
        />
      </template>
    </div>

    <ActionButton :title="'Sign In'" :type="'submit'">
      <span>{{ typeForm }}</span>
    </ActionButton>
    <p class="info-login">{{ feedBack }}</p>
    <p class="note">Terms of use &amp; Conditions</p>
  </v-form>
</template>

<script setup lang="ts">
import { computed, reactive, ref, toRefs } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import { socketService } from '@/services/socketService';
import { useRouter } from 'vue-router';
import InputGroup from '@/presentation/molecules/input-group.vue';
import ActionButton from '@/presentation/atoms/action-button.vue';

const props = defineProps({
  typeForm: {
    type: String as () => 'Login' | 'Register',
    default: 'Login',
  },
});

const { typeForm } = toRefs(props);

const authStore = useAuthStore();
const router = useRouter();
const feedBack = ref('');
const formInputs = reactive({
  email: {
    label: 'Email',
    id: 'input-email',
    type: 'text',
    placeholder: 'email@email.com',
    value: '',
  },
  password: {
    label: 'Senha',
    id: 'input-password',
    type: 'password',
    placeholder: 'Senha',
    value: '',
  },
  confirmPassword: {
    label: 'Confirme sua Senha',
    id: 'input-confirm-password',
    type: 'password',
    placeholder: 'Confirme sua Senha',
    value: '',
  },
  academicRegistrationCode: {
    label: 'Matrícula',
    id: 'input-academicRegistrationCode',
    type: 'number',
    placeholder: 'Matrícula',
    value: '',
  },
  cpf: {
    label: 'CPF',
    id: 'input-cpf',
    type: 'text',
    placeholder: 'CPF',
    value: '',
  },
  birthDate: {
    label: 'Data de nascimento',
    id: 'input-birth-date',
    type: 'date',
    placeholder: 'Data de nascimento',
    value: '',
  },
});

const filteredInputs = computed(() => {
  if (typeForm.value === 'Login') {
    const { email, password } = formInputs;
    return { email, password };
  }
  return formInputs;
});

const title = computed(() =>
  typeForm.value === 'Login' ? 'Faça login em sua conta!' : 'Crie sua conta!',
);

const subTitle = computed(() =>
  typeForm.value === 'Login'
    ? 'Faça o login para acessar o sistema'
    : 'Preencha os seguintes dados para começar a utilizar o sistema',
);

const login = async () => {
  try {
    await authStore.login({
      email: formInputs.email.value,
      password: formInputs.password.value,
    });

    socketService.connect('ws://localhost:3002', authStore.userId);
    await router.push('home');
  } catch (error: any) {
    if (!error.response) {
      feedBack.value = 'Servidor temporariamente fora do ar';
    } else if (error.response.status === 500) {
      feedBack.value = 'Email ou senha Incorretos';
    } else {
      console.log('Erro durante a requisição de login:');
    }
  }
};

const register = async () => {
  // try {
  //   const response = await axiosBackEndInstance.post(
  //     'user/createAluno',
  //     formLogin,
  //   );
  //   const tokens = response.data;
  //   if (tokens && tokens.access_token && tokens.refresh_token) {
  //     userAuthStore.setAccessToken(tokens.access_token);
  //     userAuthStore.setRefreshToken(tokens.refresh_token);
  //     router.push('home');
  //   }
  // } catch (error: any) {
  //   if (!error.response) {
  //     formLogin.infoLogin = 'Servidor temporariamente fora do ar';
  //   } else if (error.response.status === 500) {
  //     formLogin.infoLogin = 'Email ou senha Incorretos';
  //   } else {
  //     console.log('Erro durante a requisição de login:');
  //   }
  // }
};

async function handleKeydownForm(event: any, executionFunction: any) {
  if (event.key === 'Enter') {
    await executionFunction();
  }
}

const formAction = props.typeForm === 'Login' ? login : register;

// Controle do olhinho para cada campo de senha
const showPassword = reactive({
  'input-password': false,
  'input-confirm-password': false,
});

function toggleShowPassword(id: string) {
  showPassword[id] = !showPassword[id];
}
</script>

<style
  src="@/presentation/organisms/auth-form/auth-form.scss"
  lang="scss"
  scoped
></style>
