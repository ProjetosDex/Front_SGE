import { reactive, toRefs } from 'vue';
import type { CreateTermCommitmentUseCase } from '@/core/application/usecases/createTermCommitment.usecase';
import type { FormTermCommitmentInterface } from '@/stores/formTermCommitment/form-term-commitment-interface';
import type { FormTceData } from '../../types/term-commitment-form-types';
import { formTermCommitmentInitialState } from './termCommitment.state';

export class TermCommitmentBloc {
  private state = reactive<FormTceData>(formTermCommitmentInitialState);
  private formTermCommitmentStore: FormTermCommitmentInterface;
  private createTermCommitmentUseCase: CreateTermCommitmentUseCase;

  constructor(
    formTermCommitmentStore: FormTermCommitmentInterface,
    createTermCommitmentUseCase: CreateTermCommitmentUseCase,
  ) {
    this.formTermCommitmentStore = formTermCommitmentStore;
    this.createTermCommitmentUseCase = createTermCommitmentUseCase;
  }

  public getState() {
    return toRefs(this.state);
  }

  async createTermCommitment(formData: any) {
    // this.state.status = 'loading';
    // const result = await this.createTermCommitmentUseCase.execute({
    //   username,
    //   password,
    // });
    // if (result.success) {
    //   this.state.status = 'success';
    //   this.state.user = result.data;
    //   // você pode usar a store para persistir
    //   this.store.setUser(result.data);
    // } else {
    //   this.state.status = 'error';
    //   this.state.message = result.message;
    // }
  }

  async updateTermCommitment(formData: any) {
    return;
  }

  async loadUserData(): Promise<void> {
    return;
  }
}
