import type { EndInternshipProcessDataTableDto } from '@/core/application/dtos/end-internship-process-data-table-dto';
import type { FileEntity } from '@/core/domain/entities/file.entity';
import { FileType } from '@/core/domain/entities/file.entity';
import {
  InternshipProcessMovement,
  InternshipProcessStatus,
  type InternshipProcess,
} from '@/core/domain/entities/internshipProcess.entity';
import type { InternshipProcessHistory } from '@/core/domain/entities/internshipProcessHistory.entity';

export enum Step {
  INTERNSHIP_START = '1',
  INTERNSHIP_END = '2',
}

export const MovementToStepTranslation: Record<
  InternshipProcessMovement,
  Step
> = {
  [InternshipProcessMovement.STAGE_START]: Step.INTERNSHIP_START,
  [InternshipProcessMovement.STAGE_END]: Step.INTERNSHIP_END,
};

//faça um record que traduza o status do processo para pt-bt
export const StatusTranslation: Record<InternshipProcessStatus, string> = {
  [InternshipProcessStatus.IN_PROGRESS]: 'Em andamento',
  [InternshipProcessStatus.UNDER_REVIEW]: 'Em análise',
  [InternshipProcessStatus.COMPLETED]: 'Concluído',
  [InternshipProcessStatus.REJECTED]: 'Rejeitado',
};

export const FileTypeToFileName: Record<FileType, string> = {
  [FileType.TERM_COMMITMENT]: 'termo_compromisso',
  [FileType.STUDENT_SELF_EVALUATION]: 'autoavaliacao_estudante',
  [FileType.INTERNSHIP_GRANTOR_EVALUATION]: 'avaliacao_concedente',
  [FileType.SUPERVISOR_EVALUATION]: 'avaliacao_supervisor',
  [FileType.RENEWAL_DOCUMENT]: 'documento_renovacao',
  [FileType.INTERNSHIP_CERTIFICATE]: 'certificado_estagio',
};

export type HeaderData = {
  title: string;
  align: string;
  key?: string;
  value?: string;
};

export type EndInternshipProcessState = {
  headers: HeaderData[];
  data: EndInternshipProcessDataTableDto[];
  selectedProcess: EndInternshipProcessDataTableDto[];
  showSuccessModal: boolean;
  showErrorModal: boolean;
  messageError: string | null;
  loading: boolean;
};

export interface EndInternshipProcessStateInterface {
  state: EndInternshipProcessState;
  setEligibleInternshipFinalizationProcesses(
    InternshipProcess: InternshipProcess[],
  ): void;
  setSelectedProcess(
    endInternshipProcessDataTableDto: EndInternshipProcessDataTableDto[],
  ): void;
  setShowSuccessModal(showModal: boolean): void;
  setShowErrorModal(showModal: boolean): void;
  setMessageError(message: string): void;
  setLoading(loading: boolean): void;
  clear: () => void;
}
