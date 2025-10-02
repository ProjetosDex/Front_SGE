<template>
  <div class="upload-box">
    <form
      @dragover.prevent="handleDragOver"
      @drop="handleDrop"
      @dragleave="handleDragLeave"
    >
      <input
        class="file-input"
        type="file"
        name="file"
        ref="files"
        @change="storageUploadedFiles"
        multiple
        hidden
      />
      <div class="icon" @click="openFileInput">
        <img src="@/assets/images/cloud-uploading.png" draggable="false"/>
      </div>
      <p style="text-align: center">Arraste e solte os arquivos aqui ou clique para selecionar</p>
    </form>

    <v-alert
      v-if="showAlert"
      type="error"
      title="Erro"
      :text="alertMessage"
      dismissible
    ></v-alert>

    <v-alert v-if="showSuccessAlert" type="success" title="Sucesso" dismissible>
      Arquivos enviados com sucesso!
    </v-alert>

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
        <button
          class="mdi mdi-close"
          @click="removeFile(index)"
          v-if="file.progress === 100"
        ></button>
      </li>
    </section>

    <div class="buttonSubmit">
      <v-btn type="submit" class="buttonUpload" @click="handleEmit">{{
        actionButtonLabel
      }}</v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface UploadFile {
  name: string;
  progress: number;
  loading: number;
  data: File;
}

const emits = defineEmits<{
  (e: 'uploadedFiles', files: File[]): void;
}>();

defineProps<{
  actionButtonLabel: string;
}>();

const files = ref<HTMLInputElement>();
const uploadFiles = ref<UploadFile[]>([]);
const showAlert = ref(false);
const showSuccessAlert = ref(false);
const alertMessage = ref('');
let alertTimeout: number | null = null;

const openFileInput = () => {
  files.value?.click();
};

const isFileAlreadyUploading = (fileName: string) => {
  const isUploading = uploadFiles.value.some(
    (uploadFile) => uploadFile.name === fileName,
  );
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

const storageUploadedFiles = () => {
  const selectedFiles = files.value?.files;

  if (!selectedFiles) return;

  if (showAlert.value) {
    showAlert.value = false;
  }

  for (let i = 0; i < selectedFiles.length; i++) {
    const file = selectedFiles[i];
    if (isFileAlreadyUploading(file.name)) {
      continue;
    }
    uploadFiles.value.push({
      name: file.name,
      loading: 0,
      progress: 0,
      data: file,
    });
    storageFile(file);
  }
  if (files.value) {
    files.value.value = '';
  }
};

const storageFile = async (file: File) => {
  const progressInterval = setInterval(async () => {
    const uploadedFile = uploadFiles.value.find(
      (item) => item.name === file.name,
    );
    if (!uploadedFile) return;

    if (uploadedFile.loading >= 100) {
      clearInterval(progressInterval);
      return;
    }

    try {
      uploadedFile.loading = 100;
      uploadedFile.progress = 100;
    } catch (error) {
      clearInterval(progressInterval);
    }
  }, 1000);
};

const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  const targetElement = event.currentTarget as HTMLElement;
  const droppedFiles = event.dataTransfer?.files;
  if (!droppedFiles) return;

  if (showAlert.value) {
    showAlert.value = false;
  }

  for (let i = 0; i < droppedFiles.length; i++) {
    const file = droppedFiles[i];
    if (isFileAlreadyUploading(file.name)) {
      continue;
    }
    uploadFiles.value.push({
      name: file.name,
      loading: 0,
      progress: 0,
      data: file,
    });
    storageFile(file);
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

const removeFile = async (index: number) => {
  uploadFiles.value.splice(index, 1);
};

const handleEmit = async () => {
  emits(
    'uploadedFiles',
    uploadFiles.value.map((f) => f.data),
  );
};
</script>

<style src="./style.scss" lang="scss" scoped></style>
