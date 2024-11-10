<script setup lang="ts">
// Define the `recipe` prop, with the appropriate type
defineProps({
  recipe: {
    type: Object,
    required: true,
  },
});
const fallbackImage =
  "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

function checkImage(event) {
  //If image link return no image
  const img = event.target;
  if (img.naturalWidth === 0 || img.naturalHeight === 0) {
    img.src = fallbackImage;
  }
}
function onImageError(event) {
  //If image link broken
  event.target.src = fallbackImage;
}
</script>

<template>
  <Card
    class="w-full h-28 flex flex-row items-center overflow-hidden my-4 drop-shadow-xl hover:bg-slate-100 hover:duration-100 hover:ease-in-out active:bg-blue-600 active:duration-75"
    :pt="{
      header: 'h-full',
      body: 'w-full',
      content: 'w-[200px] sm:w-auto',
      title: 'text-base flex justify-between ',
    }"
  >
    <template #header>
      <img
        class="min-w-28 max-w-28 h-full object-cover rounded-xl overflow-hidden"
        alt="food header"
        :src="
          Array.isArray(recipe?.image)
            ? recipe?.image?.[0]
            : recipe?.image ||
              'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
        "
        @load="checkImage"
        @error="onImageError"
      />
    </template>
    <template #title
      >
      <!-- {{ recipe.name }} -->
      <div class="truncate max-w-[150px] sm:max-w-full">{{ recipe.name }}</div>
      <FavouriteToggleButton @click.stop="" :recipe-id="(recipe, recipe.id)"
    /></template>
    <template #content>
      <p class="m-0 h-16 w-full text-sm overflow-hidden text-ellipsis">
        {{ recipe?.description || "Explore this recipe to learn more!" }}
      </p>
    </template>
  </Card>
</template>
