import type { AddressCepResponseDto } from '@/core/application/dtos/address-cep-response-dto';
import axiosAddressCepApiInstance from '../interceptors/axios-address-cep-client';

export class AddressCepApi {
  private controllerUrl = '/ws';

  async getAddressDataByCep(
    cepAddress: string,
  ): Promise<AddressCepResponseDto> {
    const response = await axiosAddressCepApiInstance.get(
      `${this.controllerUrl}/${cepAddress}/json`,
    );

    return response.data;
  }
}
