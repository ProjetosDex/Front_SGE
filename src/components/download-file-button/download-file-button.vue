<template>
  <div class="download-container" :style="colorStyle">
    <div class="left-content">
      <v-icon class="file-icon">mdi-file</v-icon>
      <span class="file-name">{{ fileName }}</span>
    </div>

    <v-btn
      class="download-icon"
      :loading="isDownloading"
      :disabled="isDownloading"
      @click="handleDownload"
    >
      <v-icon small>mdi-download</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts" setup>
import { FileType } from '@/core/domain/entities/file.entity';
import axiosBackEndClient from '@/core/infrastructure/interceptors/axios-backend-client';
import { computed, ref } from 'vue';

const props = defineProps<{
  fileId?: string;
  fileType?: string;
  isRejected?: boolean;
}>();

const isDownloading = ref(false);

const fileName = computed(() => {
  const fileNames: Record<string, string> = {
    [FileType.TERM_COMMITMENT]: 'TermoCompromisso.pdf',
    [FileType.SUPERVISOR_EVALUATION]: 'AvaliacaoSupervisor.pdf',
    [FileType.INTERNSHIP_CERTIFICATE]: 'CertificadoConclusaoEstagio.pdf',
    [FileType.INTERNSHIP_GRANTOR_EVALUATION]: 'AvaliacaoConcedente.pdf',
    [FileType.STUDENT_SELF_EVALUATION]: 'AutoAvaliacaoEstagiario.pdf',
  };

  return fileNames[props.fileType || ''] || 'arquivo.pdf';
});

const colorStyle = computed(() => {
  return props.isRejected
    ? 'background-color: rgba(255,82,82);' // vermelho suave e transparente
    : 'background-color: rgb(162, 246, 169)';
});

const downloadFile = (filename: string, blob?: Blob) => {
  if (blob) {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => window.URL.revokeObjectURL(url), 100);
  }
};

const fetchFile = async () => {
  try {
    const response = await axiosBackEndClient.post(
      '/file/download',
      {
        fileId: props.fileId,
        fileType: props.fileType,
      },
      {
        responseType: 'blob',
      },
    );

    return new Blob([response.data], { type: 'application/pdf' });
  } catch (error) {
    isDownloading.value = false;
  }
};

const handleDownload = async () => {
  if (!props.fileId || !props.fileType) {
    console.error('fileId e fileType são obrigatórios');
    return;
  }

  isDownloading.value = true;

  try {
    const blob = await fetchFile();
    downloadFile(fileName.value, blob);
  } catch (error) {
    console.error('Erro ao fazer download do arquivo:', error);
  } finally {
    isDownloading.value = false;
  }
};
</script>

<style scoped>
.download-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(162, 246, 169);
  padding: 12px 24px;
  border-radius: 4px;
}

.left-content {
  display: flex;
  align-items: center; /* Alinha o ícone e o texto verticalmente */
}

.file-icon {
  margin-right: 12px; /* Espaço entre o ícone e o nome do arquivo */
  color: #1aaa4c; /* Cor do ícone */
}

.file-name {
  color: black; /* Cor do texto */
}

.download-icon {
  cursor: pointer; /* Mostra que o ícone é clicável */
  color: #1aaa4c; /* Cor do ícone */
}

@media (max-width: 600px) {
  .download-container {
    flex-direction: column;
    align-items: center;
  }

  .download-icon {
    margin-top: 12px;
  }
}
</style>
