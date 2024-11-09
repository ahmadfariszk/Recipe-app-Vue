<template>
  <Card class="w-full h-32 overflow-hidden flex flex-row items-center my-4" :pt="{
        header:'h-full'}">
    <template #header class="h-full">
      <img class="max-w-28 h-full object-cover overflow-hidden" alt="food header" :src="recipe.image" />
    </template>
    <template #title>Simple Card</template>
    <template #content>
      <p class="m-0 h-16 overflow-hidden">
        {{ recipe.description }}
      </p>
    </template>
  </Card>
</template>

<script setup>
import { defineProps } from "vue";

// Define the `recipe` prop, with the appropriate type
defineProps({
  recipe: {
    type: Object,
    required: true,
  },
});
</script>
