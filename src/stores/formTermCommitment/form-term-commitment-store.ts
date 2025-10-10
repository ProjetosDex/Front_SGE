import type { FormTermCommitmentInterface } from './form-term-commitment-interface';
import { useFormTermCommitmentStore } from './use-form-term-commitment';

export class FormTermCommitmentStore implements FormTermCommitmentInterface {
  private formTermCommitmentStore = useFormTermCommitmentStore();
  clear(): void {
    this.formTermCommitmentStore.clear();
  }
}
