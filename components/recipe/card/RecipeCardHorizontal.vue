<template>
  <Card class="w-full h-28 flex flex-row items-center overflow-hidden my-4 drop-shadow-xl" :pt="{
        header:'h-full ', title:'text-base'}">
    <template #header>
      <img class="max-w-28 h-full object-cover rounded-xl overflow-hidden" alt="food header" :src="recipe.image" />
    </template>
    <template #title>Simple Card</template>
    <template #content>
      <p class="m-0 h-16 text-sm overflow-hidden">
        {{ recipe.description }}
      </p>
    </template>
  </Card>
</template>

<script setup>
// Define the `recipe` prop, with the appropriate type
defineProps({
  recipe: {
    type: Object,
    required: true,
  },
});
</script>
