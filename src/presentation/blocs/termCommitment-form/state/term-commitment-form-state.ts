import type { InternshipProcess } from '@/core/domain/entities/internshipProcess.entity';
import type { User } from '@/core/domain/entities/user.entity';
import type { FormTermCommitmentStateInterface } from './term-commitment-state-interface';
import { useTermCommitmentFormStore } from './use-term-commitment-form-store';
import type {
  FieldUpdateEvent,
  FieldValue,
} from '@/presentation/types/term-commitment-form-types';
import type { AddressCepResponseDto } from '@/core/application/dtos/address-cep-response-dto';

export class FormTermCommitmentState
  implements FormTermCommitmentStateInterface
{
  private formTermCommitmentStore = useTermCommitmentFormStore();

  setOnblurEventInPostalCodeField(
    fillFormAddressFieldsByCep: () => void,
  ): void {
    this.formTermCommitmentStore.setOnblurEventInPostalCodeField(
      fillFormAddressFieldsByCep,
    );
  }

  fillFormAddressFields(addressData: AddressCepResponseDto): void {
    this.formTermCommitmentStore.fillFormAddressFields(addressData);
  }

  getGrantingCompanyPostalCode(): FieldValue {
    const cep = this.formTermCommitmentStore.getGrantingCompanyPostalCode();
    return cep;
  }

  setShowSuccessModal(showModal: boolean): void {
    this.formTermCommitmentStore.setShowSuccessModal(showModal);
  }
  setShowErrorModal(showModal: boolean): void {
    this.formTermCommitmentStore.setShowErrorModal(showModal);
  }
  setMessageError(message: string): void {
    this.formTermCommitmentStore.setMessageError(message);
  }
  setTermFilePathId(termFilePathId: string): void {
    this.formTermCommitmentStore.setTermFilePathId(termFilePathId);
  }
  setInternshipProcessId(internshipProcessId: string): void {
    this.formTermCommitmentStore.setInternshipProcessId(internshipProcessId);
  }
  updateSectionDataBySectionIndex(fieldEvent: FieldUpdateEvent): void {
    this.formTermCommitmentStore.updateSectionDataBySectionIndex(fieldEvent);
  }
  setUserSectionData(userData: User): void {
    this.formTermCommitmentStore.setUserSectionData(userData);
  }
  fillTermCommitmentData(internshipProcess: InternshipProcess): void {
    this.formTermCommitmentStore.fillTermCommitmentData(internshipProcess);
  }

  fillFormMock(): void {
    this.formTermCommitmentStore.fillFormMock();
  }

  getState() {
    return this.formTermCommitmentStore.state;
  }

  clear(): void {
    this.formTermCommitmentStore.clear();
  }

  setLoading(loading: boolean) {
    this.formTermCommitmentStore.setFormLoading(loading);
  }
}
