<template>
  <Card style="width: 25rem; overflow: hidden">
    <template #header>
      <img alt="food header" :src="recipe.image" />
    </template>
    <template #title>{{recipe.name}}</template>
    <template #subtitle>{{recipe.totalTime}}</template>
    <template #content>
      <p class="m-0">
        {{recipe.description}}
      </p>
    </template>
    <template #footer>
      <div class="flex gap-4 mt-1">
        <Button label="Cancel" severity="secondary" outlined class="w-full" />
        <Button label="Save" class="w-full" />
      </div>
    </template>
  </Card>
</template>
<script setup>
import { defineProps } from 'vue';

// Define the `recipe` prop, with the appropriate type
defineProps({
  recipe: {
    type: Object,
    required: true,
  },
});
</script>