<template>
    <!-- Check if recipeArray is defined and has items before rendering -->
    <div class=" p-4">
      <div v-if="recipeArray && recipeArray.length">
        
          <RecipeCardHorizontal
            v-for="recipe in recipeArray"
            :key="recipe.name"
            :recipe="recipe"
          />
        
      </div>
      <div class="text-center" v-else-if="recipeStore.getSelectedCategoryValue">
        <p>There are no recipes found.</p>
      </div>
      <div v-else>
        <p>Loading recipes...</p>
      </div>
    </div>
  </template>
  <script setup>
  import { computed } from 'vue';
  import { useRecipeArrayStore } from '@/stores/recipeArrayStore';
  
  const recipeStore = useRecipeArrayStore();
  console.log(recipeStore.getRecipeArray)
  
  const recipeArray = computed(() => recipeStore.getRecipeArray);
  </script>