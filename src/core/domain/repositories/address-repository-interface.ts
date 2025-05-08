import type { AddressCepResponse } from '@/core/application/dtos/address-cep-response-dto';

export interface AddressRepositoryInterface {
  getAddressDataByCep(cepAddress: string): Promise<AddressCepResponse>;
}
