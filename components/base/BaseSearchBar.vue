<template>
  <FloatLabel variant="over">
    <IconField>
      <InputIcon class="pi pi-search"></InputIcon>
      <InputText
        id="over_label"
        class="h-10 min-w-72"
        :value="value"
        @input="handleInput"
        autocomplete="off"
      />
    </IconField>
    <label for="over_label">{{ placeholder }}</label>
  </FloatLabel>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  value: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Search by Name or Ingredient',
  },
} as const)

const emit = defineEmits<{
  (e: 'update:value', value: string): void;
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:value', target.value);
};
</script>
