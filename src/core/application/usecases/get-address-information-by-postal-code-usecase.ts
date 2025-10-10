import type { AddressCepResponseDto } from '../dtos/address-cep-response-dto';
import type { AddressRepositoryInterface } from '@/core/domain/repositories/address-repository-interface';

export class GetAddressInformationByPostalCodeUseCase {
  constructor(private readonly addressRepository: AddressRepositoryInterface) {}

  async handle(postalCode: string): Promise<AddressCepResponseDto> {
    return this.addressRepository.getAddressDataByCep(postalCode);
  }
}
