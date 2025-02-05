<template>
  <div class="download-container">
    <!-- Ícone do arquivo e nome do arquivo (alinhados à esquerda) -->
    <div class="left-content">
      <v-icon class="file-icon">mdi-file</v-icon>
      <span class="file-name">{{ fileName }}</span>
    </div>

    <a
      :href="downloadLink"
      :download="fileName"
      class="download-link"
      @click.prevent="handleDownload"
    >
      <v-btn class="download-icon">
        <v-icon small>mdi-download</v-icon>
      </v-btn>
    </a>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
  fileId?: string;
  fileType?: string;
}>();

// Nome do arquivo (pode ser dinâmico)
const fileName = computed(() => {
  if (props.fileType === 'Termo_compromisso') {
    return 'termo_compromisso.pdf';
  } else if (props.fileType === 'Avaliacao') {
    return 'avaliacao.pdf';
  }
  return 'arquivo.pdf'; // Nome padrão
});

// Link de download (dinâmico com base no fileType e fileId)
const downloadLink = computed(() => {
  if (props.fileType === 'Termo_compromisso') {
    return `http://localhost:4001/file/download/term?path=${props.fileId}`;
  } else if (props.fileType === 'Avaliacao') {
    return `http://localhost:4001/file/download/internship/evaluation?path=${props.fileId}`;
  }
  return '#'; // Fallback caso o tipo não seja reconhecido
});

// Função para evitar o comportamento padrão do link e forçar o download
const handleDownload = (event: Event) => {
  if (downloadLink.value === '#') {
    event.preventDefault(); // Evita o comportamento padrão se o link for inválido
    console.error('Tipo de arquivo não reconhecido ou link inválido.');
    return;
  }

  // Cria um link temporário para forçar o download
  const link = document.createElement('a');
  link.href = downloadLink.value;
  link.download = fileName.value;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>

<style scoped>
.download-container {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Alinha os elementos nas extremidades */
  background-color: rgb(162, 246, 169); /* Fundo verde */
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
