<template>
  <div class="download-container">
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
}>();

const isDownloading = ref(false);

const fileName = computed(() => {
  const fileNames: Record<string, string> = {
    [FileType.TERM_COMMITMENT]: 'termo_compromisso.pdf',
    [FileType.SUPERVISOR_EVALUATION]: 'avaliacao.pdf',
  };

  return fileNames[props.fileType || ''] || 'arquivo.pdf';
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

const fetchTermCommitmentFile = async () => {
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
    if (props.fileType === FileType.TERM_COMMITMENT) {
      const blob = await fetchTermCommitmentFile();
      downloadFile(fileName.value, blob);
    }
    switch (props.fileType) {
      case FileType.TERM_COMMITMENT:
        break;

      case FileType.SUPERVISOR_EVALUATION:
        // TODO: Implementar lógica específica para avaliação
        throw new Error('Download de avaliação ainda não implementado');

      default:
        throw new Error(`Tipo de arquivo não suportado: ${props.fileType}`);
    }
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
</style>
