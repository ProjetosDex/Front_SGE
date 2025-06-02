import { reactive, toRefs } from 'vue';
import type { CreateTermCommitmentUseCase } from '@/core/application/usecases/create-term-commitment-usecase';
import type { FormTermCommitmentInterface } from '@/stores/formTermCommitment/form-term-commitment-interface';
import type {
  FieldUpdateEvent,
  FormTceData,
} from '../../types/term-commitment-form-types';
import {
  formTermCommitmentInitialState,
  getInitialState,
} from './termCommitment.state';
import type { UploadTermCommitmentPdfUseCase } from '@/core/application/usecases/upload-term-commitment-pdf-usecase';
import type { RegisterTermCommitmentFileIdInProcessHistoryUseCase } from '@/core/application/usecases/register-term-commitment-file-id-in-process-history-usecase';
import { TermCommitmentFormRequestMapper } from '@/core/application/mappers/termCommitmentFormRequestMapper';
import type { GenerateTermCommitmentPdfUseCase } from '@/core/application/usecases/generate-term-commitment-pdf-usecase';
import type { GetUserUseCase } from '@/core/application/usecases/get-user-usecase';
import type { FindInternshipProcessByIdUseCase } from '@/core/application/usecases/find-internship-process-by-id-usecase';
import type { GetAddressInformationByPostalCodeUseCase } from '@/core/application/usecases/get-address-information-by-postal-code-usecase';

export class TermCommitmentBloc {
  private state = reactive<FormTceData>(formTermCommitmentInitialState);

  constructor(
    private readonly formTermCommitmentStore: FormTermCommitmentInterface,
    private readonly createTermCommitmentUseCase: CreateTermCommitmentUseCase,
    private readonly generateTermCommitmentPdfUseCase: GenerateTermCommitmentPdfUseCase,
    private readonly uploadTermCommitmentPdfUseCase: UploadTermCommitmentPdfUseCase,
    private readonly registerTermCommitmentFileIdInProcessHistoryUseCase: RegisterTermCommitmentFileIdInProcessHistoryUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly findInternshipProcessByIdUseCase: FindInternshipProcessByIdUseCase,
    private readonly getAddressInformationByPostalCodeUseCase: GetAddressInformationByPostalCodeUseCase,
  ) {
    this.state.sections.concedente.sectionData[
      'grantingCompanyPostalCode'
    ].onBlur = this.fillFormAddressFieldsByCep.bind(this);
  }

  getState() {
    return toRefs(this.state);
  }

  clearState() {
    Object.assign(this.state, getInitialState());
  }

  async createTermCommitment() {
    const termCommitmentRequestBody = TermCommitmentFormRequestMapper.toRequest(
      this.state,
    );

    try {
      this.state.loading = true;

      const createdTerm = await this.createTermCommitmentUseCase.handle(
        termCommitmentRequestBody,
      );

      const internshipProcessId = createdTerm.internshipProcessId;

      const termPdfFormData =
        await this.generateTermCommitmentPdfUseCase.handle(createdTerm);

      const filePathId =
        await this.uploadTermCommitmentPdfUseCase.handle(termPdfFormData);

      await this.registerTermCommitmentFileIdInProcessHistoryUseCase.handle(
        internshipProcessId,
        filePathId,
      );

      this.state.loading = false;
      this.state.filePathId = filePathId;
      this.state.createdInternshipProcessId = internshipProcessId;
      console.log(this.state);
      this.state.showSuccessModal = true;
      this.clearState();
    } catch (error: any) {
      this.state.loading = false;
      this.state.showErrorModal = true;
      this.state.messageError = error.message;
    }
  }

  async updateTermCommitment() {
    return;
  }

  updateFormField(fieldEvent: FieldUpdateEvent) {
    const section = this.state.sections[fieldEvent.sectionIndex]; // é um FormSectionData<...>
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
    const userData = await this.getUserUseCase.handle();

    this.state.sections.aluno.sectionData['name'].fieldValue = userData.name;
    this.state.sections.aluno.sectionData['registration'].fieldValue =
      userData.registration;
    this.state.sections.aluno.sectionData['cpf'].fieldValue = userData.cpf;
    this.state.sections.aluno.sectionData['course'].fieldValue =
      userData.courseStudy;
    this.state.sections.aluno.sectionData['email'].fieldValue = userData.email;
    this.state.sections.aluno.sectionData['telephone'].fieldValue =
      userData.telephone;
  }

  async fillDataUpdateForm(internshipProcessId: string): Promise<void> {
    await this.loadUserData();

    const internshipProcess =
      await this.findInternshipProcessByIdUseCase.handle(internshipProcessId);

    this.state.sections.concedente.sectionData[
      'grantingCompanyName'
    ].fieldValue = internshipProcess.termCommitment.grantingCompanyName;

    this.state.sections.concedente.sectionData[
      'grantingCompanyCNPJ'
    ].fieldValue = internshipProcess.termCommitment.grantingCompanyCNPJ;

    this.state.sections.concedente.sectionData[
      'grantingCompanyPostalCode'
    ].fieldValue = internshipProcess.termCommitment.grantingCompanyPostalCode;

    this.state.sections.concedente.sectionData[
      'grantingCompanyDistrict'
    ].fieldValue = internshipProcess.termCommitment.grantingCompanyDistrict;

    this.state.sections.concedente.sectionData[
      'grantingCompanyCity'
    ].fieldValue = internshipProcess.termCommitment.grantingCompanyCity;

    this.state.sections.concedente.sectionData[
      'grantingCompanyState'
    ].fieldValue = internshipProcess.termCommitment.grantingCompanyState;

    this.state.sections.concedente.sectionData[
      'grantingCompanyAddress'
    ].fieldValue = internshipProcess.termCommitment.grantingCompanyAddress;

    this.state.sections.concedente.sectionData[
      'grantingCompanyEmail'
    ].fieldValue = internshipProcess.termCommitment.grantingCompanyEmail;

    this.state.sections.concedente.sectionData[
      'grantingCompanyLegalRepresentative'
    ].fieldValue =
      internshipProcess.termCommitment.grantingCompanyLegalRepresentative;

    this.state.sections.concedente.sectionData[
      'legalRepresentativeRole'
    ].fieldValue = internshipProcess.termCommitment.legalRepresentativeRole;

    this.state.sections.concedente.sectionData['supervisor'].fieldValue =
      internshipProcess.termCommitment.supervisor;

    this.state.sections.concedente.sectionData[
      'supervisorPosition'
    ].fieldValue = internshipProcess.termCommitment.supervisorPosition;

    //condicoes estagio
    this.state.sections.condicoesEstagio.sectionData['isMandatory'].fieldValue =
      internshipProcess.termCommitment.isMandatory;

    this.state.sections.condicoesEstagio.sectionData[
      'internshipStartDate'
    ].fieldValue =
      internshipProcess.termCommitment.internshipStartDate.split('T')[0];

    this.state.sections.condicoesEstagio.sectionData[
      'internshipEndDate'
    ].fieldValue =
      internshipProcess.termCommitment.internshipEndDate.split('T')[0];

    this.state.sections.condicoesEstagio.sectionData[
      'internshipStartTime'
    ].fieldValue = internshipProcess.termCommitment.internshipStartTime
      .split('T')[1]
      .substring(0, 5);

    this.state.sections.condicoesEstagio.sectionData[
      'internshipEndTime'
    ].fieldValue = internshipProcess.termCommitment.internshipEndTime
      .split('T')[1]
      .substring(0, 5);

    this.state.sections.condicoesEstagio.sectionData[
      'weeklyWorkload'
    ].fieldValue = internshipProcess.termCommitment.weeklyWorkload;

    this.state.sections.condicoesEstagio.sectionData[
      'internshipGrant'
    ].fieldValue = internshipProcess.termCommitment.internshipGrant;

    this.state.sections.condicoesEstagio.sectionData[
      'transportationAllowance'
    ].fieldValue = internshipProcess.termCommitment.transportationAllowance;

    this.state.sections.condicoesEstagio.sectionData[
      'internshipActivityPlan'
    ].fieldValue = this.formatActivityPlans(
      internshipProcess.termCommitment.internshipActivityPlan,
    );
  }

  private formatActivityPlans(activityPlansString: string) {
    return JSON.parse(activityPlansString);
  }

  async fillFormAddressFieldsByCep() {
    const cep =
      this.state.sections.concedente.sectionData['grantingCompanyPostalCode']
        .fieldValue;

    if (cep) {
      try {
        this.state.loading = true;
        const addressData =
          await this.getAddressInformationByPostalCodeUseCase.handle(
            cep as string,
          );

        this.state.sections.concedente.sectionData[
          'grantingCompanyDistrict'
        ].fieldValue = addressData.bairro;

        this.state.sections.concedente.sectionData[
          'grantingCompanyCity'
        ].fieldValue = addressData.localidade;

        this.state.sections.concedente.sectionData[
          'grantingCompanyState'
        ].fieldValue = addressData.uf;

        this.state.sections.concedente.sectionData[
          'grantingCompanyAddress'
        ].fieldValue = `${addressData.complemento} ${addressData.logradouro}`;

        this.state.loading = false;
      } catch (error) {
        this.state.loading = false;
      }
    }
  }

  fillFormMock() {
    this.state.sections.concedente.sectionData[
      'grantingCompanyName'
    ].fieldValue = 'AGU';
    this.state.sections.concedente.sectionData[
      'grantingCompanyCNPJ'
    ].fieldValue = '49892589000179';
    this.state.sections.concedente.sectionData[
      'grantingCompanyPostalCode'
    ].fieldValue = '67145855';
    this.state.sections.concedente.sectionData[
      'grantingCompanyDistrict'
    ].fieldValue = 'Paar';
    this.state.sections.concedente.sectionData[
      'grantingCompanyCity'
    ].fieldValue = 'Ananindeua';
    this.state.sections.concedente.sectionData[
      'grantingCompanyState'
    ].fieldValue = 'PA';
    this.state.sections.concedente.sectionData[
      'grantingCompanyAddress'
    ].fieldValue = 'tv.esquina';
    this.state.sections.concedente.sectionData[
      'grantingCompanyEmail'
    ].fieldValue = 'rafa.teste@email.com';
    this.state.sections.concedente.sectionData[
      'grantingCompanyLegalRepresentative'
    ].fieldValue = 'Afonso';
    this.state.sections.concedente.sectionData[
      'legalRepresentativeRole'
    ].fieldValue = 'Product Owner';
    this.state.sections.concedente.sectionData['supervisor'].fieldValue =
      'Afonso';
    this.state.sections.concedente.sectionData[
      'supervisorPosition'
    ].fieldValue = 'Product Owner';

    //condicoes estagio
    this.state.sections.condicoesEstagio.sectionData['isMandatory'].fieldValue =
      '1';

    this.state.sections.condicoesEstagio.sectionData[
      'internshipStartDate'
    ].fieldValue = '2025-04-18';

    this.state.sections.condicoesEstagio.sectionData[
      'internshipEndDate'
    ].fieldValue = '2025-04-18';

    this.state.sections.condicoesEstagio.sectionData[
      'internshipStartTime'
    ].fieldValue = '08:00';

    this.state.sections.condicoesEstagio.sectionData[
      'internshipEndTime'
    ].fieldValue = '12:00';

    this.state.sections.condicoesEstagio.sectionData[
      'weeklyWorkload'
    ].fieldValue = '20';

    this.state.sections.condicoesEstagio.sectionData[
      'internshipGrant'
    ].fieldValue = '800';

    this.state.sections.condicoesEstagio.sectionData[
      'transportationAllowance'
    ].fieldValue = '100';

    this.state.sections.condicoesEstagio.sectionData[
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
