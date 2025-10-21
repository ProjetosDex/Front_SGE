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
        typeForm === 'Criar Conta'
          ? 'form-register-inputs'
          : 'form-login-inputs'
      "
    >
      <template
        v-if="typeForm === 'Criar Conta'"
        v-for="field in Object.values(formRegisterInputs)"
        :key="'register-' + field.id"
      >
        <!-- Campos de senha com olhinho -->
        <v-text-field
          v-if="field.type === 'password'"
          v-model="field.value"
          :label="field.label"
          :id="field.id"
          :type="
            showPassword[field.id as keyof typeof showPassword]
              ? 'text'
              : 'password'
          "
          :placeholder="field.placeholder"
          :append-inner-icon="
            showPassword[field.id as keyof typeof showPassword]
              ? 'mdi-eye-off'
              : 'mdi-eye'
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

      <template
        v-else
        v-for="field in Object.values(formLoginInputs)"
        :key="'login-' + field.id"
      >
        <!-- Campos de senha com olhinho -->
        <v-text-field
          v-if="field.type === 'password'"
          v-model="field.value"
          :label="field.label"
          :id="field.id"
          :type="
            showPassword[field.id as keyof typeof showPassword]
              ? 'text'
              : 'password'
          "
          :placeholder="field.placeholder"
          :append-inner-icon="
            showPassword[field.id as keyof typeof showPassword]
              ? 'mdi-eye-off'
              : 'mdi-eye'
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
import { computed, reactive, ref, toRefs, watch } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import { socketService } from '@/services/socketService';
import { useRouter } from 'vue-router';
import InputGroup from '@/presentation/molecules/input-group.vue';
import ActionButton from '@/presentation/atoms/action-button.vue';

const props = defineProps({
  typeForm: {
    type: String as () => 'Entrar' | 'Criar Conta',
    default: 'Entrar',
  },
});

const { typeForm } = toRefs(props);

const authStore = useAuthStore();
const router = useRouter();
const feedBack = ref('');
const formRegisterInputs = reactive({
  name: {
    label: 'Nome',
    id: 'input-name',
    type: 'text',
    placeholder: 'Nome',
    value: '',
  },
  email: {
    label: 'Email',
    id: 'input-email',
    type: 'text',
    placeholder: 'email@email.com',
    value: '',
  },
  academicRegistrationCode: {
    label: 'Matrícula',
    id: 'input-academicRegistrationCode',
    type: 'number',
    placeholder: 'Matrícula',
    value: '',
  },
  telephone: {
    label: 'Telefone',
    id: 'input-telephone',
    type: 'text',
    placeholder: 'Telefone',
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
  cpf: {
    label: 'CPF',
    id: 'input-cpf',
    type: 'text',
    placeholder: 'CPF',
    value: '',
  },
  rg: {
    label: 'RG',
    id: 'input-rg',
    type: 'text',
    placeholder: 'RG',
    value: '',
  },
  courseStudy: {
    label: 'Curso',
    id: 'input-course-study',
    type: 'text',
    placeholder: 'Curso',
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

const formLoginInputs = reactive({
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
});

const title = computed(() =>
  typeForm.value === 'Entrar' ? 'Faça login em sua conta!' : 'Crie sua conta!',
);

const subTitle = computed(() =>
  typeForm.value === 'Entrar'
    ? 'Faça o login para acessar o sistema'
    : 'Preencha os seguintes dados para começar a utilizar o sistema',
);

const login = async () => {
  try {
    await authStore.login({
      email: formLoginInputs.email.value,
      password: formLoginInputs.password.value,
    });

    const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:3002';
    socketService.connect(wsUrl, authStore.userId);
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
  try {
    await authStore.register(formRegisterInputs);

    const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:3002';
    socketService.connect(wsUrl, authStore.userId);
    await router.push('home');
  } catch (error: any) {
    console.log('Erro durante a requisição de registro:', error);
    feedBack.value = error.response.data.message;
  }
};

async function handleKeydownForm(event: any, executionFunction: any) {
  if (event.key === 'Enter') {
    await executionFunction();
  }
}

const formAction = computed(() =>
  typeForm.value === 'Entrar' ? login : register,
);

const showPassword = reactive({
  'input-password': false,
  'input-confirm-password': false,
});

function toggleShowPassword(id: string) {
  showPassword[id as keyof typeof showPassword] =
    !showPassword[id as keyof typeof showPassword];
}
</script>

<style
  src="@/presentation/organisms/auth-form/auth-form.scss"
  lang="scss"
  scoped
></style>
