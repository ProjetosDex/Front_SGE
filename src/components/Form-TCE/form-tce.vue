<template>
    <div class="main">
      <div class="title">
        <h1 class="title1">Formulário de Solicitação Do Termo de Compromisso de Estágio (TCE)</h1>
      </div>
      <div class="form">
        <v-form>
          <div class="aluno">
            <h1 class="title2">Aluno:</h1>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    :counter="10"
                    label="Nome"
                    required
                    hide-details
                  ></v-text-field>
                </v-col>
  
                <v-col
                  cols="12"
                  md="2"
                >
                  <v-text-field
                    type="number"
                    :counter="10"
                    label="Matricula"
                    hide-details
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="2"
                >
                  <v-text-field
                    type="number"
                    :counter="10"
                    label="CPF"
                    required
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Curso"
                    hide-details
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    :counter="10"
                    label="Email"
                    required
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="3"
                >
                  <v-text-field
                    type="number"
                    :counter="10"
                    label="Celular"
                    required
                    hide-details
                  ></v-text-field>
                </v-col>
                
              </v-row>
            </v-container>
          </div>
          <div class="Concedente">
            <h1 class="title2">Concedente:</h1>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    :counter="10"
                    label="Razão Social"
                    required
                    hide-details
                  ></v-text-field>
                </v-col>
  
                <v-col
                  cols="12"
                  md="3"
                >
                  <v-text-field
                    type="number"
                    :counter="10"
                    label="CNPJ"
                    hide-details
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="2"
                >
                  <v-text-field
                    type="number"
                    :counter="10"
                    label="CEP"
                    required
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="3"
                >
                  <v-text-field
                    label="Bairro"
                    hide-details
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="3"
                >
                  <v-text-field
                    :counter="10"
                    label="Cidade"
                    required
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="1"
                >
                  <v-text-field
                    :counter="10"
                    label="UF"
                    required
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    :counter="10"
                    label="Endereço"
                    required
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    :counter="10"
                    label="Email"
                    required
                    hide-details
                  ></v-text-field>
                </v-col>
                
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    :counter="10"
                    label="Representante Legal"
                    required
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="3"
                >
                  <v-text-field
                    :counter="10"
                    label="Função"
                    required
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    :counter="10"
                    label="Supervisor"
                    required
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="3"
                >
                  <v-text-field
                    :counter="10"
                    label="Cargo"
                    required
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-row>        
            </v-container>
          </div>
          <div class="Condicoes">
                <h1 class="title2">Condições do Estágio:</h1>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        md="4"
                      >
                        <v-radio-group inline 
                        label="Tipo de Estágio"
                        >
                        <v-radio label="Obrigatório" value="1"></v-radio>
                        <v-radio label="Não-Obrigatório" value="2"></v-radio>
                      </v-radio-group>
                      </v-col>
                      <v-col
                        cols="12"
                        md="2"
                      >
                        <v-text-field 
                          type="date"
                          :counter="10"
                          label="Inicio de Estágio"
                          required
                          hide-details
                        ></v-text-field>
                      </v-col>
  
                      <v-col
                        cols="12"
                        md="2"
                      >
                        <v-text-field
                          type="date"
                          :counter="10"
                          label="Término de Estágio"
                          hide-details
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        md="2"
                      >
                        <v-text-field
                          type="time"
                          :counter="10"
                          label="Horario Inicial"
                          required
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        md="2"
                      >
                        <v-text-field
                          type="time"
                          label="Horario final"
                          hide-details
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        md="2"
                      >
                        <v-text-field
                          type="number"
                          :counter="10"
                          label="Jornada Semanal"
                          required
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        md="3"
                      >
                        <v-text-field
                          type="number"
                          :counter="10"
                          label="Bolsa auxílio (R$)"
                          required
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        md="3"
                      >
                        <v-text-field
                          type="number"
                          :counter="10"
                          label="Auxilio Transporte (R$)"
                          required
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        md="12"
                      >
                        <v-textarea
                          :counter="10"
                          label="Plano de Atividades de Estágio"
                          placeholder="1-&#10;2-&#10;3-&#10;4-&#10;5-"
                          required
                          hide-details
                        ></v-textarea>
                      </v-col>
                      
                    </v-row>
                  </v-container>
          </div>
            <div class="main-btn">
              <v-btn type="submit" class="buttonTCE" to="/inicio/estagio">Voltar</v-btn>
              <v-btn type="submit" class="buttonTCE" to="/Termo/Compromisso">Cadastrar</v-btn>
            </div>
        </v-form>
      </div>
  </div>
  </template>
  <script lang="ts" setup>
    import { ref } from 'vue';
    const show = ref(false);
  </script>
  
  <style src="./style.scss" lang="scss" scoped>
  
  </style>