<script setup lang="ts">
import { useRecipeArrayStore } from '~/stores/recipeArrayStore';
import { computed } from 'vue';

const props = defineProps<{ recipe: { id: number; [key: string]: any } }>();
const recipeStore = useRecipeArrayStore();

// Define a computed property for `v-model`
const isFavorite = computed({
  get: () => recipeStore.favRecipeArray.includes(props.recipe.id),
  set: (value) => {
    recipeStore.toggleFavorite(props.recipe.id);
  }
});
</script>

<template>
  <ToggleButton
    v-model="isFavorite"
    onLabel=" "
    onIcon="pi pi-heart-fill"
    offLabel=" "
    offIcon="pi pi-heart"
    size="small"
    class="rounded-full max-w-6 max-h-6 border-surface-300 bg-transparent data-[p-checked=true]:bg-surface-200 data-[p-checked=true]:before:bg-surface-200 data-[p-checked=true]:before:shadow-none"
  />
</template>
