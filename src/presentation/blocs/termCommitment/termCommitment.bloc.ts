import { reactive, toRefs } from 'vue';
import type { CreateTermCommitmentUseCase } from '@/core/application/usecases/create-term-commitment-usecase';
import type { FormTermCommitmentInterface } from '@/stores/formTermCommitment/form-term-commitment-interface';
import type {
  FieldUpdateEvent,
  FormSectionKey,
  FormTceData,
} from '../../types/term-commitment-form-types';
import { formTermCommitmentInitialState } from './termCommitment.state';
import type { UploadTermCommitmentPdfUseCase } from '@/core/application/usecases/upload-term-commitment-pdf-usecase';
import type { RegisterTermCommitmentFileIdInProcessHistoryUseCase } from '@/core/application/usecases/register-term-commitment-file-id-in-process-history-usecase';
import { TermCommitmentFormRequestMapper } from '@/core/application/mappers/termCommitmentFormRequestMapper';
import type { GenerateTermCommitmentPdfUseCase } from '@/core/application/usecases/generate-term-commitment-pdf-usecase';

export class TermCommitmentBloc {
  private state = reactive<FormTceData>(formTermCommitmentInitialState);

  constructor(
    private readonly formTermCommitmentStore: FormTermCommitmentInterface,
    private readonly createTermCommitmentUseCase: CreateTermCommitmentUseCase,
    private readonly generateTermCommitmentPdfUseCase: GenerateTermCommitmentPdfUseCase,
    private readonly uploadTermCommitmentPdfUseCase: UploadTermCommitmentPdfUseCase,
    private readonly registerTermCommitmentFileIdInProcessHistoryUseCase: RegisterTermCommitmentFileIdInProcessHistoryUseCase,
  ) {}

  getState() {
    return toRefs(this.state);
  }

  getAllSections() {
    return this.state;
  }

  async createTermCommitment() {
    const termCommitmentRequestBody = TermCommitmentFormRequestMapper.toRequest(
      this.state,
    );

    const createdTerm = await this.createTermCommitmentUseCase.handle(
      termCommitmentRequestBody,
    );

    const internshipProcessId = createdTerm.id;

    const termPdfFormData =
      await this.generateTermCommitmentPdfUseCase.handle(createdTerm);

    const filePathId =
      await this.uploadTermCommitmentPdfUseCase.handle(termPdfFormData);

    await this.registerTermCommitmentFileIdInProcessHistoryUseCase.handle(
      internshipProcessId,
      filePathId,
    );
  }

  async updateTermCommitment(formData: any) {
    return;
  }

  updateFormField(fieldEvent: FieldUpdateEvent) {
    const section = this.state[fieldEvent.sectionIndex]; // é um FormSectionData<...>
    if (!section) {
      console.warn('Seção não encontrada:', fieldEvent.sectionIndex);
      return;
    }

    const sectionData = section.sectionData;

    if (
      fieldEvent.fieldIndex &&
      sectionData &&
      sectionData[fieldEvent.fieldIndex]
    ) {
      sectionData[fieldEvent.fieldIndex].fieldValue = fieldEvent.value;
    } else {
      console.warn(
        'Campo não encontrado na seção',
        fieldEvent.fieldIndex,
        section.sectionData,
      );
    }
  }

  async loadUserData(): Promise<void> {
    return;
  }

  fillFormMock() {
    this.state.concedente.sectionData['grantingCompanyName'].fieldValue = 'AGU';
    this.state.concedente.sectionData['grantingCompanyCNPJ'].fieldValue =
      '49892589000179';
    this.state.concedente.sectionData['grantingCompanyPostalCode'].fieldValue =
      '67145855';
    this.state.concedente.sectionData['grantingCompanyDistrict'].fieldValue =
      'Paar';
    this.state.concedente.sectionData['grantingCompanyCity'].fieldValue =
      'Ananindeua';
    this.state.concedente.sectionData['grantingCompanyState'].fieldValue = 'PA';
    this.state.concedente.sectionData['grantingCompanyAddress'].fieldValue =
      'tv.esquina';
    this.state.concedente.sectionData['grantingCompanyEmail'].fieldValue =
      'rafa.teste@email.com';
    this.state.concedente.sectionData[
      'grantingCompanyLegalRepresentative'
    ].fieldValue = 'Afonso';
    this.state.concedente.sectionData['legalRepresentativeRole'].fieldValue =
      'Product Owner';
    this.state.concedente.sectionData['supervisor'].fieldValue = 'Afonso';
    this.state.concedente.sectionData['supervisorPosition'].fieldValue =
      'Product Owner';

    //condicoes estagio
    this.state.condicoesEstagio.sectionData['isMandatory'].fieldValue = '1';
    this.state.condicoesEstagio.sectionData['internshipStartDate'].fieldValue =
      '2025-04-18';
    this.state.condicoesEstagio.sectionData['internshipEndDate'].fieldValue =
      '2025-04-18';
    this.state.condicoesEstagio.sectionData['internshipStartTime'].fieldValue =
      '08:00';
    this.state.condicoesEstagio.sectionData['internshipEndTime'].fieldValue =
      '12:00';
    this.state.condicoesEstagio.sectionData['weeklyWorkload'].fieldValue = '20';
    this.state.condicoesEstagio.sectionData['internshipGrant'].fieldValue =
      '800';
    this.state.condicoesEstagio.sectionData[
      'transportationAllowance'
    ].fieldValue = '100';
    this.state.condicoesEstagio.sectionData[
      'internshipActivityPlan'
    ].fieldValue = [
      'atividade 1',
      'atividade 2',
      'atividade 3',
      'atividade 4',
      'atividade 5',
    ];
  }
}
