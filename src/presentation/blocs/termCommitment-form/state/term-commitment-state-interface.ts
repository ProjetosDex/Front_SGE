import type { AddressCepResponseDto } from '@/core/application/dtos/address-cep-response-dto';
import type { InternshipProcess } from '@/core/domain/entities/internshipProcess.entity';
import type { User } from '@/core/domain/entities/user.entity';
import type {
  FieldUpdateEvent,
  FieldValue,
  FormTceData,
} from '@/presentation/types/term-commitment-form-types';

export interface FormTermCommitmentStateInterface {
  clear(): void;
  getState(): FormTceData;
  getGrantingCompanyPostalCode(): FieldValue;
  setLoading(loading: boolean): void;
  setShowSuccessModal(showModal: boolean): void;
  setShowErrorModal(showModal: boolean): void;
  setOnblurEventInPostalCodeField(fillFormAddressFieldsByCep: () => void): void;
  setMessageError(message: string): void;
  setTermFilePathId(termFilePathId: string): void;
  setInternshipProcessId(internshipProcessId: string): void;
  updateSectionDataBySectionIndex(fieldEvent: FieldUpdateEvent): void;
  setUserSectionData(userData: User): void;
  fillTermCommitmentData(internshipProcess: InternshipProcess): void;
  fillFormAddressFields(addressData: AddressCepResponseDto): void;
  fillFormMock(): void;
}
