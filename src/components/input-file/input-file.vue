<template>
    <div class="upload-box" >
        <p>Faça Upload dos Arquivos para Solicitar o atestado de Estágio</p>
        <form @dragover.prevent="handleDragOver" @drop="handleDrop" @dragleave="handleDragLeave">
            <input class="file-input" type="file" name="file" ref="files" @change="uploadFile" multiple hidden />
                <div class="icon" @click="openFileInput">
                    <img src="../../assets/cloud-uploading.png" />
                 </div>
            <p>Faça o Upload dos Arquivos Necessários</p>
        </form>
        
        <section class="uploaded-area">
            <li class="row" v-for="(file, index) in uploadFiles" :key="index">
            <div class="fileUpload">
                <div class="content upload">
                    <i class="mdi mdi-file-document"></i>
                    <span class="name">{{ file.name }}</span>  
                </div>
                
                <div class="progress-bar">  
                    <div class="progress" :style="{ width: file.progress + '%' }"></div>
                    
                </div>
                <span class="size">{{ file.progress }}%</span> 
            </div>
            <i v-if="file.progress === 100" class="mdi mdi-check-bold"></i>
            </li>
        </section>
        <div class="buttonSubmit">
            <v-btn type="submit" class="buttonUpload" to="">Enviar Arquivos</v-btn>
        </div>
        
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface UploadFile {
    name: string;
    progress: number;
    loading: number;
}

const files = ref<HTMLInputElement>();
const uploadFiles = ref<UploadFile[]>([]);

const openFileInput = () => {
    files.value?.click();
};

const uploadFile = () => {
    const selectedFiles = files.value?.files;

    if (!selectedFiles) return;

    for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const formData = new FormData();
        formData.append("file", file);
        
        simulateUpload(formData, file);
    }
};

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

    uploadFiles.value.push({ name: file.name, progress: 0, loading: 0 });
};

const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    const targetElement = event.currentTarget as HTMLElement;
    const droppedFiles = event.dataTransfer?.files;
    if (!droppedFiles) return;
    for (let i = 0; i < droppedFiles.length; i++) {
        const file = droppedFiles[i];
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

</script>

<style src="./style.scss" lang="scss" scoped>

</style>