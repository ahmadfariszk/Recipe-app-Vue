<template>
  <Card class=" w-full overflow-hidden">
    <template #header class=" w-10">
      <img classname=" object-fit" alt="food header" :src="recipe.image" />
    </template>
    <template #title>{{recipe.name}}</template>
    <template #subtitle>{{recipe.totalTime}}</template>
    <template #content>
      <p class="m-0 h-10 overflow-clip">
        {{recipe.description}}
      </p>
    </template>
    <template #footer>
      <div class="flex gap-4 mt-1">
        <Button label="Cancel" severity="secondary" outlined class="w-full"></Button>
        <Button label="Save" class="w-full" ></Button>
      </div>
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