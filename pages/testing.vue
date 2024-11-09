<template>
  <!-- Check if recipeList is defined and has items before rendering -->
  <div v-if="recipeList && recipeList.length">
    <BrowseRecipe
      v-for="recipe in recipeList"
      :key="recipe.name"
      :recipe="recipe"
    />
  </div>
  <div v-else>
    <p>Loading recipes...</p>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRecipeListStore } from '@/stores/recipeList';
import BrowseRecipe from '@/components/BrowseRecipes.vue';

const recipeStore = useRecipeListStore();
console.log(recipeStore.getRecipeList)

const recipeList = computed(() => recipeStore.getRecipeList);
</script>