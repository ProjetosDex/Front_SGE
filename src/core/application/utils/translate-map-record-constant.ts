import {
  InternshipProcessMovement,
  InternshipProcessStatus,
} from '@/core/domain/entities/internshipProcess.entity';

export const InternshipProcessStatusTranslations: Record<
  InternshipProcessStatus,
  string
> = {
  [InternshipProcessStatus.COMPLETED]: 'COMPLETO',
  [InternshipProcessStatus.UNDER_REVIEW]: 'EM ANÁLISE',
  [InternshipProcessStatus.IN_PROGRESS]: 'EM ANDAMENTO',
  [InternshipProcessStatus.REJECTED]: 'REJEITADO',
};

export const InternshipProcessMovementTranslations: Record<
  InternshipProcessMovement,
  string
> = {
  [InternshipProcessMovement.STAGE_START]: 'INÍCIO DE ESTÁGIO',
  [InternshipProcessMovement.STAGE_END]: 'FIM DE ESTÁGIO',
};
