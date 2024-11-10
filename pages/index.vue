<script setup>
import { useRecipeArrayStore } from '@/stores/recipeArrayStore';  // Adjust path if needed
// Access the store
const recipeStore = useRecipeArrayStore();

// Access the getter
const getRecipeArray = recipeStore.getRecipes;
</script>

<template>
  <div v-if="getRecipeArray.length">
    <ul>
      <li v-for="recipe in getRecipeArray" :key="recipe.name">
        {{ recipe.name }}
      </li>
    </ul>
  </div>
  <div v-else>
    <p>No recipes found.</p>
  </div>
</template>
