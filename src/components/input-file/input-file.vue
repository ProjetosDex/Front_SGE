<template>
    <div class="upload-box">
        <!-- Formulário para arrastar e soltar arquivos -->
        <form @dragover.prevent="handleDragOver" @drop="handleDrop" @dragleave="handleDragLeave">
            <input class="file-input" type="file" name="file" ref="files" @change="uploadFile" multiple hidden />
            <div class="icon" @click="openFileInput">
                <img src="../../assets/cloud-uploading.png" />
            </div>
            <p>Faça o Upload dos Arquivos Necessários</p>
        </form>

        <!-- Alerta de erro -->
        <v-alert v-if="showAlert" type="error" title="Erro" :text="alertMessage" dismissible></v-alert>

        <!-- Área que mostra os arquivos sendo carregados -->
        <section class="uploaded-area">
            <li class="row" v-for="(file, index) in uploadFiles" :key="index">
                <div class="fileUpload">
                    <div class="content upload">
                        <i class="mdi mdi-file-document"></i>
                        <span class="name">{{ file.name }}</span>
                        <i v-if="file.progress === 100" class="mdi mdi-check-bold"></i>
                    </div>
                    <div class="progress-bar">
                        <div class="progress" :style="{ width: file.progress + '%' }"></div>
                    </div>
                    <span class="size">{{ file.progress }}%</span>
                </div>
                <button class="mdi mdi-close" @click="removeFile(index)" v-if="file.progress === 100"></button>
            </li>
        </section>

        <!-- Botão para enviar os arquivos -->
        <div class="buttonSubmit">
            <v-btn type="submit" class="buttonUpload" @click="submitFiles">Enviar Arquivos</v-btn>
        </div>
    </div>
</template>

<script setup lang="ts">
// import { ref, PropType } from 'vue';
import { ref } from 'vue';

// Interface para armazenar informações sobre os arquivos de upload
interface UploadFile {
    name: string;
    progress: number;
    loading: number;
}

// Definindo a prop para receber a URL de upload dinamicamente
const props = defineProps<{ uploadUrl: string }>();

// Referências e estados necessários
const files = ref<HTMLInputElement>();
const uploadFiles = ref<UploadFile[]>([]);
const showAlert = ref(false);
const alertMessage = ref("");
let alertTimeout: number | null = null;

// Função para abrir a janela de seleção de arquivos
const openFileInput = () => {
    files.value?.click();
};

// Função para verificar se um arquivo já está sendo carregado
const isFileAlreadyUploading = (fileName: string) => {
    const isUploading = uploadFiles.value.some(uploadFile => uploadFile.name === fileName);
    if (isUploading) {
        alertMessage.value = `O arquivo com o nome '${fileName}' já foi carregado.`;
        showAlert.value = true;
        if (alertTimeout) {
            clearTimeout(alertTimeout);
        }
        alertTimeout = setTimeout(() => {
            showAlert.value = false;
        }, 3000);
    }
    return isUploading;
};

// Função para iniciar o upload dos arquivos selecionados
const uploadFile = () => {
    const selectedFiles = files.value?.files;

    if (!selectedFiles) return;

    for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        if (isFileAlreadyUploading(file.name)) {
            continue;
        }
        uploadFiles.value.push({ name: file.name, progress: 0, loading: 0 });
        const formData = new FormData();
        formData.append("file", file);
        simulateUpload(formData, file);
    }
    if (files.value) {
        files.value.value = '';
    }
};

// Função simulada para o progresso do upload
const simulateUpload = (formData: FormData, file: File) => {
    const progressInterval = setInterval(() => {
        const uploadedFile = uploadFiles.value.find(item => item.name === file.name);
        if (!uploadedFile) return;

        if (uploadedFile.loading >= 100) {
            clearInterval(progressInterval);
            return;
        }

        uploadedFile.loading += 20;
        uploadedFile.progress = Math.min(100, uploadedFile.loading);
    }, 1000);
};

// Funções para o comportamento de arrastar e soltar
const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    const targetElement = event.currentTarget as HTMLElement;
    const droppedFiles = event.dataTransfer?.files;
    if (!droppedFiles) return;
    for (let i = 0; i < droppedFiles.length; i++) {
        const file = droppedFiles[i];
        if (isFileAlreadyUploading(file.name)) {
            continue;
        }
        uploadFiles.value.push({ name: file.name, progress: 0, loading: 0 });
        const formData = new FormData();
        formData.append("file", file);
        simulateUpload(formData, file);
    }
    if (targetElement) {
        targetElement.classList.remove('drag-over');
    }
};

const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
    const targetElement = event.currentTarget as HTMLElement;
    if (targetElement) {
        event.dataTransfer!.dropEffect = 'copy';
        targetElement.classList.add('drag-over');
    }
};

const handleDragLeave = (event: DragEvent) => {
    const targetElement = event.currentTarget as HTMLElement;
    if (targetElement) {
        targetElement.classList.remove('drag-over');
    }
};

// Função para remover arquivos da lista de upload
const removeFile = (index: number) => {
    uploadFiles.value.splice(index, 1);
};

// Função para enviar os arquivos ao backend utilizando a URL definida na prop
const submitFiles = () => {
    // Aqui você enviaria os arquivos para o backend usando a prop `uploadUrl`
    uploadFiles.value.forEach(file => {
        console.log(`Uploading ${file.name} to ${props.uploadUrl}`);
        // Implementar a lógica real de upload aqui usando fetch, axios, etc.
    });
};
</script>

<style src="./style.scss" lang="scss" scoped>
/* Adicione aqui os estilos personalizados para o componente */
</style>
