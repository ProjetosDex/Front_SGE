<template>
  <div class="authenticate-container">
    <div class="titulo-sistema">
      <img src="../../assets/Logo-IFPA.png" alt="" class="logo-ifpa" />
      <h1>Bem vindo ao sistema de gerenciamento de estágio do IFPA</h1>
    </div>
    <div class="form-authenticate">
      <div class="radio-inputs">
        <label class="radio">
          <input
            type="radio"
            name="radio"
            value="login"
            v-model="opcaoAutenticacao"
            checked
          />
          <span class="name">Login</span>
        </label>

        <label class="radio">
          <input
            type="radio"
            name="radio"
            value="registrar"
            v-model="opcaoAutenticacao"
          />
          <span class="name">Registrar</span>
        </label>
      </div>
      <div v-if="opcaoAutenticacao === 'login'">
        <form class="form_container">
          <div class="title_container">
            <p class="title">Faça login em sua conta !</p>
            <span class="subtitle">Faça o login para acessar o sistema</span>
          </div>
          <br />
          <div class="input_container">
            <label class="input_label" for="email_field">Email</label>
            <input
              placeholder="name@mail.com"
              title="Inpit title"
              name="input-name"
              type="text"
              class="input_field"
              id="email_field"
              v-model="formLogin.email"
            />
          </div>
          <div class="input_container">
            <label class="input_label" for="password_field">Password</label>
            <input
              placeholder="Password"
              title="Inpit title"
              name="input-name"
              type="password"
              class="input_field"
              id="password_field"
              v-model="formLogin.password"
            />
          </div>
          <v-btn title="Sign In" class="sign-in_btn" @click="login">
            <span>Login</span>
          </v-btn>
          <p class="infoLogin">{{ formLogin.infoLogin }}</p>
          <p class="note">Terms of use &amp; Conditions</p>
        </form>
      </div>
      <div v-else>
        <form class="form_container">
          <div class="title_container">
            <p class="title">Cria sua conta !</p>
            <span class="subtitle"
              >Preencha os seguintes dados para começar a utilizar o
              sistema</span
            >
          </div>
          <div class="form-register-inputs">
            <div class="input_container">
              <label class="input_label" for="email_field">Email</label>
              <input
                placeholder="name@mail.com"
                title="Inpit title"
                name="input-name"
                type="text"
                class="input_field"
                id="email_field"
              />
            </div>
            <div class="input_container">
              <label class="input_label" for="password_field">Senha</label>
              <input
                placeholder="Password"
                title="Inpit title"
                name="input-name"
                type="password"
                class="input_field"
                id="password_field"
              />
            </div>
            <div class="input_container">
              <label class="input_label" for="password_field"
                >Confirmação de Senha</label
              >
              <input
                placeholder="Password"
                title="Inpit title"
                name="input-name"
                type="password"
                class="input_field"
                id="password_field"
              />
            </div>
            <div class="input_container">
              <label class="input_label" for="email_field">Matrícula</label>
              <input
                placeholder="00000000000"
                title="Inpit title"
                name="input-name"
                type="text"
                class="input_field"
                id="email_field"
              />
            </div>
            <div class="input_container">
              <label class="input_label" for="email_field">Cpf</label>
              <input
                placeholder="000.000.000-00"
                title="Inpit title"
                name="input-name"
                type="text"
                class="input_field"
                id="email_field"
              />
            </div>
            <div class="input_container">
              <label class="input_label" for="email_field"
                >data de nascimento</label
              >
              <input
                title="Inpit title"
                name="input-name"
                type="date"
                class="input_field"
                id="email_field"
              />
            </div>
          </div>
          <v-btn title="Sign In" class="sign-in_btn" @click="register">
            <span>Registrar</span>
          </v-btn>
          <p class="note">Terms of use &amp; Conditions</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
import { useUserAuthStore } from '@/stores/userAuth.store';
const userAuthStore = useUserAuthStore();

import axiosInstance from '@/interceptors/axios-interceptor';
import { socketService } from '@/services/socketService';
const opcaoAutenticacao = ref('login');

const formLogin = reactive({
  email: '',
  password: '',
  infoLogin: '',
});

async function login() {
  try {
    const response = await axiosInstance.post('auth/login', formLogin);
    const tokens = response.data;
    const uuidUser = tokens.uuidUser;
    if (tokens && tokens.access_token && tokens.refresh_token) {
      userAuthStore.setAccessToken(tokens.access_token);
      userAuthStore.setRefreshToken(tokens.refresh_token);
      userAuthStore.setUuidUser(uuidUser);
      socketService.connect('ws://localhost:3002', uuidUser);
      router.push('home');
    }
  } catch (error: any) {
    if (!error.response) {
      formLogin.infoLogin = 'Servidor temporariamente fora do ar';
    } else if (error.response.status === 500) {
      formLogin.infoLogin = 'Email ou senha Incorretos';
    } else {
      console.log('Erro durante a requisição de login:');
    }
  }
}

async function register() {
  try {
    const response = await axiosInstance.post('user/createAluno', formLogin);
    const tokens = response.data;
    if (tokens && tokens.access_token && tokens.refresh_token) {
      userAuthStore.setAccessToken(tokens.access_token);
      userAuthStore.setRefreshToken(tokens.refresh_token);
      router.push('home');
    }
  } catch (error: any) {
    if (!error.response) {
      formLogin.infoLogin = 'Servidor temporariamente fora do ar';
    } else if (error.response.status === 500) {
      formLogin.infoLogin = 'Email ou senha Incorretos';
    } else {
      console.log('Erro durante a requisição de login:');
    }
  }
}
</script>

<style lang="scss" scoped>
.infoLogin {
  color: red;
}
.form-authenticate {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
}

.authenticate-container {
  display: flex;
  height: 100vh;
}

.form-register-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.titulo-sistema {
  display: flex;
  flex-direction: column;
  padding-top: 10%;
  align-items: center;
  justify-content: flex-start;
  background-color: #078640;
  color: #fff;
  width: 50%;
}

.titulo-sistema h1 {
  font-size: 1.5em;
  text-align: center;
}

h1 {
  font-size: 1.8rem;
}

.logo-ifpa {
  width: 100px;
}

.form_container {
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: 50px 40px 20px 40px;
  background-color: #ffffff;
  box-shadow:
    0px 106px 42px rgba(0, 0, 0, 0.01),
    0px 59px 36px rgba(0, 0, 0, 0.05),
    0px 26px 26px rgba(0, 0, 0, 0.09),
    0px 7px 15px rgba(0, 0, 0, 0.1),
    0px 0px 0px rgba(0, 0, 0, 0.1);
  border-radius: 11px;
  font-family: 'Inter', sans-serif;
}

.logo_container {
  box-sizing: border-box;
  width: 80px;
  height: 80px;
  background: linear-gradient(
    180deg,
    rgba(248, 248, 248, 0) 50%,
    #f8f8f888 100%
  );
  border: 1px solid #f7f7f8;
  filter: drop-shadow(0px 0.5px 0.5px #efefef)
    drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
  border-radius: 11px;
}

.title_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #212121;
}

.subtitle {
  font-size: 0.725rem;
  max-width: 80%;
  text-align: center;
  line-height: 1.1rem;
  color: #8b8e98;
}

.input_container {
  width: 100%;
  height: fit-content;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.input_label {
  font-size: 0.75rem;
  color: #8b8e98;
  font-weight: 600;
}

.input_field {
  width: auto;
  height: 40px;
  padding: 0 0 0 40px;
  border-radius: 7px;
  outline: none;
  border: 1px solid #e5e5e5;
  filter: drop-shadow(0px 1px 0px #efefef)
    drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
  transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
}

.input_field:focus {
  border: 1px solid transparent;
  box-shadow: 0px 0px 0px 2px #242424;
  background-color: transparent;
}

.sign-in_btn {
  width: 100%;
  height: 40px;
  border: 0;
  background: #078640;
  border-radius: 7px;
  outline: none;
  color: #ffffff;
  cursor: pointer;
}

.note {
  font-size: 0.75rem;
  color: #8b8e98;
  text-decoration: underline;
}

.radio-inputs {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  border-radius: 0.5rem;
  background-color: #eee;
  box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
  padding: 0.25rem;
  width: 25%;
  margin-bottom: 10px;
  font-size: 0.9rem;
}

.radio-inputs .radio {
  flex: 1 1 auto;
  text-align: center;
}

.radio-inputs .radio input {
  display: none;
}

.radio-inputs .radio .name {
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  border: none;
  padding: 0.5rem 0;
  color: rgba(51, 65, 85, 1);
  transition: all 0.15s ease-in-out;
}

.radio-inputs .radio input:checked + .name {
  background-color: #078640;
  color: #fff;
  font-weight: 600;
}

@media screen and (max-width: 860px) {
  .authenticate-container {
    flex-direction: column;
    width: 100%;
  }

  .titulo-sistema {
    display: flex;
    flex-direction: row;
    padding-top: 0;
    align-items: center;
    justify-content: flex-start;
    background-color: #078640;
    color: #fff;
    width: 100%;
  }

  .titulo-sistema h1 {
    font-size: 0.9rem;
  }

  .logo-ifpa {
    width: 3rem;
    height: 4.1rem;
  }

  .form-authenticate {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .form_container {
    max-width: 327px;
    margin-bottom: 20%;
  }

  .form-register-inputs {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .radio-inputs {
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    border-radius: 0.5rem;
    background-color: #eee;
    box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
    padding: 0.25rem;
    width: 80%;
    margin-top: 10%;
    margin-bottom: 5%;
    font-size: 0.9rem;
  }
}

@media screen and (max-width: 1200px) {
  .form-register-inputs {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}
</style>
