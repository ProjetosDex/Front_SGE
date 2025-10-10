import type { AddressCepApi } from '../api/address-cep-api';
import type { AddressRepositoryInterface } from '@/core/domain/repositories/address-repository-interface';
import type { AddressCepResponseDto } from '@/core/application/dtos/address-cep-response-dto';

export class AddressRepository implements AddressRepositoryInterface {
  constructor(private readonly addressCepApi: AddressCepApi) {}

  async getAddressDataByCep(
    cepAddress: string,
  ): Promise<AddressCepResponseDto> {
    return this.addressCepApi.getAddressDataByCep(cepAddress);
  }
}
