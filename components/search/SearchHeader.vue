<script setup lang="ts">
import { Search } from "lucide-vue-next";
const selectedCity = ref();
const cities = ref([
  { name: "New York", code: "NY" },
  { name: "Rome", code: "RM" },
  { name: "London", code: "LDN" },
  { name: "Istanbul", code: "IST" },
  { name: "Paris", code: "PRS" },
]);

defineProps<{
  badgeFilterValue?: string;
  badgeFilterOptions?: string[];
  badgeFilterOnClick?: (value: string) => void;
}>();
</script>

<template>
  <div
    class="flex justify-center items-center min-h-12 pt-8 -mb-12 relative bg-blue-500"
  ></div>
  <div class="flex justify-center items-center pt-8">
    <FloatLabel variant="over">
      <IconField>
        <InputIcon class="pi pi-search"></InputIcon>
        <InputText id="over_label" class="h-10 min-w-72" autocomplete="off" />
      </IconField>
      <label for="over_label">Search recipes, keywords...</label>
    </FloatLabel>
  </div>
  <!-- subheader -->
  <div class="flex justify-center mb-1">
    <SearchBadgeFilterToggle
      :value="badgeFilterValue"
      :options="badgeFilterOptions"
      :onClick="badgeFilterOnClick"
    />
  </div>
  <div class="flex justify-center">
    <Select
      v-model="selectedCity"
      :options="cities"
      optionLabel="name"
      placeholder="Select a City"
      class="w-2/5 md:w-56"
    ></Select
    ><Select
      v-model="selectedCity"
      :options="cities"
      optionLabel="name"
      placeholder="Select a City"
      class="w-2/5 md:w-56"
    ></Select>
  </div>
</template>
