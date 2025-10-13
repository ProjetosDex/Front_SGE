<template>
  <div class="aluno">
    <h1 class="title2">{{ sectionTitle }}</h1>
    <v-container>
      <v-row>
        <v-col
          v-for="key in Object.keys(sectionData)"
          :key="key"
          cols="12"
          :md="sectionData[key].type !== 'multi-text-field' ? 3 : 0"
        >
          <template v-if="sectionData[key].type === 'radio-group'">
            <v-radio-group
              inline
              :label="sectionData[key].label"
              :model-value="sectionData[key].fieldValue"
              :rules="sectionData[key].rules"
              :error-messages="sectionData[key].errorMessages"
              :required="sectionData[key].required"
              hide-details="auto"
              @update:modelValue="(value) => handleFieldUpdate(key, value)"
            >
              <v-radio
                v-for="(option, optIndex) in sectionData[key].options"
                :key="optIndex"
                :label="option.label"
                :value="option.value"
              ></v-radio>
            </v-radio-group>
          </template>

          <template v-else-if="sectionData[key].type === 'multi-text-field'">
            <label>{{ sectionData[key].label }}</label>

            <template
              v-for="(fields, subInputIndex) in Array.isArray(
                sectionData[key].fieldValue,
              )
                ? sectionData[key].fieldValue
                : []"
              :key="subInputIndex"
            >
              <v-text-field
                variant="underlined"
                :model-value="typeof fields === 'string' ? fields : ''"
                type="text"
                :counter="100"
                :label="
                  `${sectionData[key].labelFields} ` + (subInputIndex + 1)
                "
                required
                @update:modelValue="
                  (value) =>
                    handleMultiTextFieldUpdate(key, subInputIndex, value)
                "
                hide-details
              ></v-text-field>
            </template>
          </template>

          <v-text-field
            v-else
            :type="sectionData[key].type"
            :counter="sectionData[key].counter"
            :model-value="sectionData[key].fieldValue"
            :label="sectionData[key].label"
            :rules="sectionData[key].rules"
            :error-messages="sectionData[key].errorMessages"
            :required="sectionData[key].required"
            hide-details="auto"
            :readonly="sectionData[key].readonly"
            @input="
              formatCnpj(
                sectionData[key].label,
                key,
                sectionData[key].fieldValue,
              )
            "
            @blur="sectionData[key].onBlur?.()"
            @update:modelValue="(value) => handleFieldUpdate(key, value)"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
export type FieldValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | string[]
  | (string | null)[];

type FieldUpdateEvent = {
  fieldIndex: string;
  subInputIndex?: number;
  value: FieldValue;
};

export type SectionData<V = FieldValue, R = (value: V) => string | boolean> = {
  type: string;
  counter?: number | boolean;
  fieldValue: V;
  labelFields?: string;
  label: string;
  rules: Array<R>;
  errorMessages: string[];
  required: boolean;
  readonly?: boolean;
  options?: Array<{ label: string; value: string }>;
  onBlur?: () => void;
};

export type SectionDataMap<
  V = FieldValue,
  R = (value: V) => string | boolean,
> = Record<string, SectionData<V, R>>;

defineProps<{
  sectionData: SectionDataMap;
  sectionTitle: string;
}>();

const emit = defineEmits<{
  (e: 'update:field', payload: FieldUpdateEvent): void;
}>();

const handleFieldUpdate = (fieldIndex: string, value: FieldValue) => {
  emit('update:field', { fieldIndex, value });
};

const handleMultiTextFieldUpdate = (
  fieldIndex: string,
  subInputFieldIndex: number,
  value: FieldValue,
) => {
  emit('update:field', {
    fieldIndex,
    subInputIndex: subInputFieldIndex,
    value,
  });
};

const formatCnpj = (label: string, index: string, value: FieldValue) => {
  if (label === 'CNPJ' && typeof value === 'string') {
    value = value?.replace(/[^\d]+/g, '');
  }
  handleFieldUpdate(index, value);
};
</script>

<style scoped></style>
