<script setup>
import { useRecipeListStore } from '@/stores/recipeList';  // Adjust path if needed
// Access the store
const recipeStore = useRecipeListStore();

// Access the getter
const getRecipeList = recipeStore.getRecipes;
</script>

<template>
  <div v-if="getRecipeList.length">
    <ul>
      <li v-for="recipe in getRecipeList" :key="recipe.name">
        {{ recipe.name }}
      </li>
    </ul>
  </div>
  <div v-else>
    <p>No recipes found.</p>
  </div>
</template>
