<template>
    <div>
        <p>Faça Upload dos Arquivos Preenchidos para Solicitar o Atestado de Estágio</p>

        <!-- Seção para mostrar os arquivos modelo -->
        <div class="model-files">
            <p>Modelo dos arquivos necessários:</p>
            <div class="model-file-items">
                <v-btn
                    v-for="file in modelFiles"
                    :key="file.name"
                    :href="file.url"
                    download
                    class="buttonUpload"
                >
                    {{ file.name }}
                </v-btn>
            </div>
        </div>

        <!-- Componente de upload -->
        <input-file :uploadUrl="uploadUrl" />
    </div>
</template>

<script setup lang="ts">
    import inputFile from "../../components/input-file/input-file.vue";

    // URL de upload
    const uploadUrl = 'https://minha-api.com/upload';

    // Arquivos modelo
    const modelFiles = [
        { name: 'Auto Avaliação do Estagiário', url: 'https://sigaa.ifpa.edu.br/sigaa/verProducao?idProducao=1097275&&key=bd64adf971f7a8d62aa58966f6f14f1d' },
        { name: 'Avaliação do Estagiário - Concedente', url: 'https://sigaa.ifpa.edu.br/sigaa/verProducao?idProducao=1097276&&key=ecead2273608bcb87a428cd6b737d1ef' },
        { name: 'Avaliação do Estagiário - Professor Orientador', url: 'https://sigaa.ifpa.edu.br/sigaa/verProducao?idProducao=1097278&&key=2f4cee6135e4b5e4f256fb861bc8751c' }
    ];
</script>

<style src="./style.scss" lang="scss" scoped>
</style>
