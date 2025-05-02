<template>
  <div class="aluno">
    <h1 class="title2">{{ sectionTitle }}</h1>
    <v-container>
      <v-row>
        <v-col
          v-for="(item, index) in sectionData"
          cols="12"
          :md="item.type !== 'multi-text-field' ? 3 : 0"
          :key="index"
        >
          <template v-if="item.type === 'radio-group'">
            <v-radio-group
              inline
              :label="item.label"
              :model-value="item.fieldValue"
              :rules="item.rules"
              :error-messages="item.errorMessages"
              :required="item.required"
              hide-details="auto"
              @update:modelValue="(value) => handleFieldUpdate(index, value)"
            >
              <v-radio
                v-for="(option, optIndex) in item.options"
                :key="optIndex"
                :label="option.label"
                :value="option.value"
              ></v-radio>
            </v-radio-group>
          </template>

          <template v-else-if="item.type === 'multi-text-field'">
            <label>{{ item.label }}</label>

            <template
              v-for="(fields, subInputIndex) in item.fieldValue"
              :key="subInputIndex"
            >
              <v-text-field
                variant="underlined"
                :model-value="
                  Array.isArray(item.fieldValue) &&
                  item.fieldValue.length > subInputIndex &&
                  typeof item.fieldValue[subInputIndex] === 'string'
                    ? item.fieldValue[subInputIndex]
                    : ''
                "
                type="text"
                :counter="100"
                :label="`${item.labelFields} ` + (subInputIndex + 1)"
                required
                @update:modelValue="
                  (value) =>
                    handleMultiTextFieldUpdate(index, subInputIndex, value)
                "
                hide-details
              ></v-text-field>
            </template>
          </template>

          <v-text-field
            v-else
            :type="item.type"
            :counter="item.counter"
            :model-value="item.fieldValue"
            :label="item.label"
            :rules="item.rules"
            :error-messages="item.errorMessages"
            :required="item.required"
            hide-details="auto"
            :readonly="item.readonly"
            @input="formatCnpj(item.label, index, item.fieldValue)"
            @update:modelValue="(value) => handleFieldUpdate(index, value)"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
type FieldValue = string | number | boolean | null | undefined | string[];

type FieldUpdateEvent = {
  index: number;
  subInputIndex?: number;
  value: FieldValue;
};

type SectionData<T = string> = {
  type: string;
  counter?: number | boolean;
  fieldValue: FieldValue;
  labelFields?: string;
  label: string;
  rules: Array<(value: T) => string | boolean>;
  errorMessages: string[];
  required: boolean;
  readonly?: boolean;
  options?: Array<{ label: string; value: string }>;
};

defineProps<{
  sectionData: Array<SectionData>;
  sectionTitle: string;
}>();

const emit = defineEmits<{
  (e: 'update:field', payload: FieldUpdateEvent): void;
}>();

const handleFieldUpdate = (index: number, value: FieldValue) => {
  emit('update:field', { index, value });
};

const handleMultiTextFieldUpdate = (
  index: number,
  subInputFieldIndex: number,
  value: FieldValue,
) => {
  emit('update:field', {
    index: index,
    subInputIndex: subInputFieldIndex,
    value,
  });
};

const formatCnpj = (label: string, index: number, value: FieldValue) => {
  if (label === 'CNPJ' && typeof value === 'string') {
    value = value?.replace(/[^\d]+/g, '');
  }
  handleFieldUpdate(index, value);
};
</script>

<style scoped></style>
