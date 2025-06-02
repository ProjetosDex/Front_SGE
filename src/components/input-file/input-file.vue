<template>
  <div class="upload-box">
    <!-- Formulário para arrastar e soltar arquivos -->
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
        @change="uploadFile"
        multiple
        hidden
      />
      <div class="icon" @click="openFileInput">
        <img src="@/assets/cloud-uploading.png" />
      </div>
      <p>Faça o Upload dos Arquivos Necessários</p>
    </form>

    <!-- Alerta de erro -->
    <v-alert
      v-if="showAlert"
      type="error"
      title="Erro"
      :text="alertMessage"
      dismissible
    ></v-alert>

    <!-- Alerta de sucesso -->
    <v-alert v-if="showSuccessAlert" type="success" title="Sucesso" dismissible>
      Arquivos enviados com sucesso!
    </v-alert>

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
        <button
          class="mdi mdi-close"
          @click="removeFile(index, file)"
          v-if="file.progress === 100"
        ></button>
      </li>
    </section>

    <!-- Botão para enviar os arquivos -->
    <div
      class="buttonSubmit"
      v-if="
        props.uploadOption === InternshipProcessMovement.STAGE_END &&
        props.uploadStatus === InternshipProcessStatus.UNDER_REVIEW
      "
    >
      <v-btn type="submit" class="buttonUpload" @click="aprovarFimEstagio"
        >Aprovar fim de estagio</v-btn
      >
    </div>
    <div
      class="buttonSubmit"
      v-else-if="props.uploadOption === InternshipProcessMovement.STAGE_END"
    >
      <v-btn type="submit" class="buttonUpload" @click="finalizarProcesso"
        >Finalizar Processo</v-btn
      >
    </div>
    <div class="buttonSubmit" v-else>
      <v-btn type="submit" class="buttonUpload" @click="registerFiles"
        >Enviar Arquivos</v-btn
      >
    </div>
    <div>{{ props.internshipProcessId }}</div>
  </div>
</template>

<script setup lang="ts">
import axios, { type AxiosProgressEvent } from 'axios';
import {
  InternshipProcessMovement,
  InternshipProcessStatus,
  type InternshipProcess,
} from '@/core/domain/entities/internshipProcess.entity';
import { ref } from 'vue';

// Interface para armazenar informações sobre os arquivos de upload
interface UploadFile {
  name: string;
  progress: number;
  loading: number;
  path?: string;
}

// Definindo a prop para receber a URL de upload dinamicamente
const props = defineProps<{
  uploadUrl: string;
  uploadOption: string;
  uploadStatus: string;
  multiple: boolean;
  internshipProcessId?: string | undefined;
}>();

import { useAuthStore } from '@/stores/auth.store';
import axiosBackEndInstance from '@/core/infrastructure/interceptors/axios-backend-client';
import axiosFileApiInstance from '@/core/infrastructure/interceptors/axios-files-interceptor';
import { FileType } from '@/core/domain/entities/file.entity';
import { UserRole } from '@/core/domain/entities/user.entity';
const userAuthStore = useAuthStore();

// Referências e estados necessários
const files = ref<HTMLInputElement>();
const uploadFiles = ref<UploadFile[]>([]);
const showAlert = ref(false);
const showSuccessAlert = ref(false);
const alertMessage = ref('');
let alertTimeout: number | null = null;

// Função para abrir a janela de seleção de arquivos
const openFileInput = () => {
  files.value?.click();
};

// Função para verificar se um arquivo já está sendo carregado
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

// Função para iniciar o upload dos arquivos selecionados
const uploadFile = () => {
  const selectedFiles = files.value?.files;

  if (!selectedFiles) return;

  // Esconder a mensagem de erro assim que um arquivo for selecionado
  if (showAlert.value) {
    showAlert.value = false;
  }

  for (let i = 0; i < selectedFiles.length; i++) {
    const file = selectedFiles[i];
    if (isFileAlreadyUploading(file.name)) {
      continue;
    }
    uploadFiles.value.push({ name: file.name, progress: 0, loading: 0 });
    const formData = new FormData();
    formData.append('file', file);
    simulateUpload(formData, file);
  }
  if (files.value) {
    files.value.value = '';
  }
};

// Função simulada para o progresso do upload
const simulateUpload = async (formData: FormData, file: File) => {
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
      if (
        props.uploadOption === InternshipProcessMovement.STAGE_END &&
        props.uploadStatus === InternshipProcessStatus.UNDER_REVIEW
      ) {
        console.log('aqui é um arquivo que e a creditacao');
        const response = await axiosFileApiInstance.post(
          '/file/upload/internship-certificate',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent: AxiosProgressEvent) => {
              if (progressEvent.total) {
                // Calcula o progresso do upload
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total,
                );

                // Atualiza o progresso do arquivo
                uploadedFile.loading = percentCompleted;
                uploadedFile.progress = percentCompleted;
              }
            },
          },
        );
        uploadedFile.path = response.data;

        console.log('Upload bem-sucedido');
      } else if (props.uploadOption === InternshipProcessMovement.STAGE_END) {
        const response = await axiosFileApiInstance.post(
          '/file/upload/internship/evaluation',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent: AxiosProgressEvent) => {
              if (progressEvent.total) {
                // Calcula o progresso do upload
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total,
                );

                // Atualiza o progresso do arquivo
                uploadedFile.loading = percentCompleted;
                uploadedFile.progress = percentCompleted;
              }
            },
          },
        );
        uploadedFile.path = response.data;
      } else if (props.uploadOption === InternshipProcessMovement.STAGE_START) {
        console.log('aqui');
        const response = await axiosFileApiInstance.post(
          '/file/upload/term',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent: AxiosProgressEvent) => {
              if (progressEvent.total) {
                // Calcula o progresso do upload
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total,
                );

                // Atualiza o progresso do arquivo
                uploadedFile.loading = percentCompleted;
                uploadedFile.progress = percentCompleted;
              }
            },
          },
        );
        uploadedFile.path = response.data;

        console.log('Upload bem-sucedido');
      }
    } catch (error) {
      console.error('Erro no upload:', error);
      clearInterval(progressInterval); // Para o intervalo em caso de erro
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
    uploadFiles.value.push({ name: file.name, progress: 0, loading: 0 });
    const formData = new FormData();
    formData.append('file', file);
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

const fileNameToTypeMap: Record<string, FileType> = {
  'Auto Avaliação do Estagiário.pdf': FileType.STUDENT_SELF_EVALUATION,
  'Avaliação do Estagiário - Concedente.pdf':
    FileType.INTERNSHIP_GRANTOR_EVALUATION,
  'Avaliação do Estagiário - Professor Orientador.pdf':
    FileType.SUPERVISOR_EVALUATION,
};

const removeFile = async (index: number, file: UploadFile) => {
  try {
    if (
      props.uploadOption === InternshipProcessMovement.STAGE_END &&
      props.uploadStatus === InternshipProcessStatus.UNDER_REVIEW
    ) {
      axiosFileApiInstance.delete(
        `/file/delete/internship-certificate/${file.path}`,
      );
      uploadFiles.value.splice(index, 1);
    } else if (props.uploadOption === InternshipProcessMovement.STAGE_END) {
      axiosFileApiInstance.delete(
        `/file/delete/internship-evaluation/${file.path}`,
      );
      uploadFiles.value.splice(index, 1);
    } else if (props.uploadOption === InternshipProcessMovement.STAGE_START) {
      axiosFileApiInstance.delete(`/file/delete/term/${file.path}`);
      uploadFiles.value.splice(index, 1);
    }
  } catch (error) {
    console.error('error');
  }
};

const finalizarProcesso = async () => {
  if (!props.internshipProcessId) {
    alertMessage.value =
      'Selecione um processo para realizar o upload dos arquivos.';
    showAlert.value = true;
    return;
  }
  if (uploadFiles.value.length < 3) {
    alertMessage.value =
      'São Necessários os 3 arquivos para realizar a finalização do processo.';
    showAlert.value = true;
    return;
  }

  if (!validateEndInternshipNameFiles(uploadFiles.value)) {
    alertMessage.value =
      'os arquivos de finalização de estágio devem conter a mesma nomenclatura dos modelos no formato pdf';
    showAlert.value = true;
    return;
  }

  await axiosBackEndInstance.post(
    'processo/estagio/register/assign-end-internship',
    {
      internshipEvaluationFilesPaths: uploadFiles.value.map((uploadFile) => {
        return {
          filePath: uploadFile.path,
          fileType: fileNameToTypeMap[uploadFile.name],
        };
      }),
      internshipProcessId: props.internshipProcessId,
    },
  );
  window.location.reload();
};

const aprovarFimEstagio = async () => {
  if (uploadFiles.value.length < 1) {
    alertMessage.value =
      'É necessário fazer o upload do certificado de estágio para realizar a aprovação.';
    showAlert.value = true;
    return;
  }
  if (uploadFiles.value.length > 1) {
    alertMessage.value =
      'para realizar a aprovação é permitido apenas o envio de 1 certificado de estagio.';
    showAlert.value = true;
    return;
  }

  const internshipCertificateFilePath = uploadFiles.value.map((uploadFile) => {
    return {
      filePath: uploadFile.path,
      fileType: FileType.INTERNSHIP_CERTIFICATE,
    };
  })[0];

  await axiosBackEndInstance.post(
    'processo/estagio/validate/assign-end-internship',
    {
      internshipCertificateFilePath,
      internshipProcessId: props.internshipProcessId,
      validate: true,
    },
  );
  window.location.reload();
};

interface FiletType {
  name: string;
  progress: number;
  loading: number;
  path?: string | undefined;
}

const validateEndInternshipNameFiles = (uploadFiles: FiletType[]): boolean => {
  console.log(uploadFiles);
  if (uploadFiles.length !== 3) {
    return false;
  }

  const requiredFileNames = [
    'Auto Avaliação do Estagiário.pdf',
    'Avaliação do Estagiário - Concedente.pdf',
    'Avaliação do Estagiário - Professor Orientador.pdf',
  ];

  return requiredFileNames.every((requiredName) =>
    uploadFiles.some((file) => file.name === requiredName),
  );
};

// Função para enviar os arquivos ao backend utilizando a URL definida na prop
const registerFiles = async () => {
  if (uploadFiles.value.length === 0) {
    alertMessage.value = 'Nenhum arquivo selecionado para upload.';
    showAlert.value = true;
    return;
  }

  if (
    props.uploadOption === 'FIM_ESTAGIO' &&
    userAuthStore.userRole === UserRole.STUDENT
  ) {
    await finalizarProcesso();
  }

  if (
    props.uploadOption === InternshipProcessMovement.STAGE_START &&
    userAuthStore.userRole === UserRole.STUDENT
  ) {
    console.log('funcionou');
    console.log(uploadFiles.value[0].path);
    await axiosBackEndInstance.post('termCommitment/register/assign', {
      termFilePath: uploadFiles.value[0].path,
      internshipProcessId: props.internshipProcessId,
    });
    window.location.reload();
  } else if (
    props.uploadOption === InternshipProcessMovement.STAGE_START &&
    (userAuthStore.userRole === UserRole.EMPLOYEE ||
      userAuthStore.userRole === UserRole.ADMINISTRATOR)
  ) {
    console.log('aqui ?');
    await axiosBackEndInstance.post('/termCommitment/validate/assign', {
      validate: true,
      termFilePath: uploadFiles.value[0].path,
      internshipProcessId: props.internshipProcessId,
    });
    window.location.reload();
  } else if (
    props.uploadOption === 'FIM_ESTAGIO' &&
    (userAuthStore.userRole === UserRole.EMPLOYEE ||
      userAuthStore.userRole === UserRole.ADMINISTRATOR)
  ) {
    console.log(props.internshipProcessId);
    await axiosBackEndInstance.post(
      '/processo/estagio/validate/assign-end-internship',
      {
        validate: true,
        termFilePath: uploadFiles.value.map((uploadFile) => {
          return uploadFile.path;
        }),
        internshipProcessId: props.internshipProcessId,
      },
    );
    window.location.reload();
  }

  //separa condicao se for termo assinado aluno ou funcionario/administrador

  // Simula o envio dos arquivos ao backend
  // uploadFiles.value.forEach(async (file) => {
  //   const formData = new FormData();
  //   formData.append('file', file.name);
  //   console.log('chegou aqui');
  //   await axios.post(props.uploadUrl, formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   });
  //   // Falta implementar a lógica real de upload.
  // });

  // Mostra o pop-up de sucesso por 3 segundos
  showSuccessAlert.value = true;
  setTimeout(() => {
    showSuccessAlert.value = false;
  }, 3000);
};
</script>

<style src="./style.scss" lang="scss" scoped></style>
