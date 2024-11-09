<template>
    <!-- Check if recipeList is defined and has items before rendering -->
    <div class=" p-4">
      <div v-if="recipeList && recipeList.length">
        <RecipeCardHorizontal
          v-for="recipe in recipeList"
          :key="recipe.name"
          :recipe="recipe"
        />
      </div>
      <div v-else>
        <p>Loading recipes...</p>
      </div>
    </div>
  </template>
  <script setup>
  import { computed } from 'vue';
  import { useRecipeListStore } from '@/stores/recipeList';
  
  const recipeStore = useRecipeListStore();
  console.log(recipeStore.getRecipeList)
  
  const recipeList = computed(() => recipeStore.getRecipeList);
  </script>