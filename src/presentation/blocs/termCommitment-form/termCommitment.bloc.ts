import { toRefs } from 'vue';
import type { CreateTermCommitmentUseCase } from '@/core/application/usecases/create-term-commitment-usecase';
import type { FieldUpdateEvent } from '../../types/term-commitment-form-types';
import { TermCommitmentFormRequestMapper } from '@/core/application/mappers/termCommitmentFormRequestMapper';
import type { GetUserUseCase } from '@/core/application/usecases/get-user-usecase';
import type { FindInternshipProcessByIdUseCase } from '@/core/application/usecases/find-internship-process-by-id-usecase';
import type { GetAddressInformationByPostalCodeUseCase } from '@/core/application/usecases/get-address-information-by-postal-code-usecase';
import type { FormTermCommitmentStateInterface } from './state/term-commitment-state-interface';
import type { Router } from 'vue-router';
import type { UpdateTermCommitmentUseCase } from '@/core/application/usecases/update-term-commitment-usecase';

export class TermCommitmentBloc {
  constructor(
    private readonly formTermCommitmentState: FormTermCommitmentStateInterface,
    private readonly router: Router,
    private readonly createTermCommitmentUseCase: CreateTermCommitmentUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly findInternshipProcessByIdUseCase: FindInternshipProcessByIdUseCase,
    private readonly getAddressInformationByPostalCodeUseCase: GetAddressInformationByPostalCodeUseCase,
    private readonly updateTermCommitmentUseCase: UpdateTermCommitmentUseCase,
  ) {
    this.formTermCommitmentState.setOnblurEventInPostalCodeField(
      this.fillFormAddressFieldsByCep.bind(this),
    );
  }

  getState() {
    return toRefs(this.formTermCommitmentState.getState());
  }

  async createTermCommitment() {
    const termCommitmentRequestBody = TermCommitmentFormRequestMapper.toRequest(
      this.formTermCommitmentState.getState(),
    );

    try {
      const hasEmptyField = Object.values(termCommitmentRequestBody).some(
        (value) => value === null || value === '',
      );

      if (hasEmptyField) {
        throw new Error(
          'Por favor, revise os campos: todos os campos são obrigatórios e devem ser preenchidos corretamente.',
        );
      }

      this.formTermCommitmentState.setLoading(true);

      const { termFilePathId, internshipProcessId } =
        await this.createTermCommitmentUseCase.handle(
          termCommitmentRequestBody,
        );

      this.formTermCommitmentState.setLoading(false);
      this.formTermCommitmentState.setTermFilePathId(termFilePathId);

      this.formTermCommitmentState.setInternshipProcessId(internshipProcessId);
      this.formTermCommitmentState.setShowSuccessModal(true);
      this.formTermCommitmentState.clear();
    } catch (error: any) {
      this.formTermCommitmentState.setLoading(false);
      this.formTermCommitmentState.setShowErrorModal(true);
      const errorMessage = error.response?.data?.message || error.message;
      this.formTermCommitmentState.setMessageError(errorMessage);
    }
  }

  async updateTermCommitment(internshipProcessId: string) {
    const termCommitmentRequestBody = TermCommitmentFormRequestMapper.toRequest(
      this.formTermCommitmentState.getState(),
    );

    try {
      this.formTermCommitmentState.setLoading(true);
      await this.updateTermCommitmentUseCase.handle(
        internshipProcessId,
        termCommitmentRequestBody,
      );

      this.formTermCommitmentState.setLoading(false);
      window.location.reload();
    } catch (error: any) {
      this.formTermCommitmentState.setLoading(false);
      this.formTermCommitmentState.setShowErrorModal(true);
      this.formTermCommitmentState.setMessageError(error.response.data.message);
    }
  }

  updateFormField(fieldEvent: FieldUpdateEvent) {
    this.formTermCommitmentState.updateSectionDataBySectionIndex(fieldEvent);
  }

  async loadUserData(): Promise<void> {
    const userData = await this.getUserUseCase.handle();

    this.formTermCommitmentState.setUserSectionData(userData);
  }

  openInternshipProcessDetails(internshipProcessId: string) {
    this.formTermCommitmentState.setShowSuccessModal(false);
    this.router.push({
      name: 'detalhamentoProcessoEstagio',
      params: { id: internshipProcessId },
    });
  }

  async fillDataUpdateForm(internshipProcessId: string): Promise<void> {
    await this.loadUserData();

    const internshipProcess =
      await this.findInternshipProcessByIdUseCase.handle(internshipProcessId);

    this.formTermCommitmentState.fillTermCommitmentData(internshipProcess);
  }

  async fillFormAddressFieldsByCep() {
    const cep = this.formTermCommitmentState.getGrantingCompanyPostalCode();

    if (cep) {
      try {
        this.formTermCommitmentState.setLoading(true);
        const addressData =
          await this.getAddressInformationByPostalCodeUseCase.handle(
            cep as string,
          );

        this.formTermCommitmentState.fillFormAddressFields(addressData);

        this.formTermCommitmentState.setLoading(false);
      } catch (error) {
        this.formTermCommitmentState.setLoading(false);
      }
    }
  }

  fillFormMock() {
    this.formTermCommitmentState.fillFormMock();
  }
}
