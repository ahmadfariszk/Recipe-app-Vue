<script setup lang="ts">
// Define the `recipe` prop, with the appropriate type
defineProps({
  recipe: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <Card
    class="w-full h-28 flex flex-row items-center overflow-hidden my-4 drop-shadow-xl hover:bg-slate-100 hover:duration-100 hover:ease-in-out active:bg-blue-600 active:duration-75"
    :pt="{
      header: 'h-full',
      body: 'w-full',
      title: 'text-base flex justify-between ',
    }"
  >
    <template #header>
      <img
        class="min-w-28 max-w-28 h-full object-cover rounded-xl overflow-hidden"
        alt="food header"
        :src="Array.isArray(recipe.image) ? recipe.image?.[0] : recipe?.image"
      />
    </template>
    <template #title
      >{{ recipe.name
      }}<FavouriteToggleButton @click.stop="" :recipe-id="(recipe, recipe.id)"
    /></template>
    <template #content>
      <p class="m-0 h-16 text-sm overflow-hidden">
        {{ recipe.description }}
      </p>
    </template>
  </Card>
</template>
