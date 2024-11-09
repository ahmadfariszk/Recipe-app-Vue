<template>
  <!-- Check if recipeList is defined and has items before rendering -->
  <div class=" p-4">
    <div v-if="recipeList && recipeList.length">
      <RecipeCardVertical
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
import { computed, onMounted } from 'vue';
import { useRecipeListStore } from '@/stores/recipeList';
import RecipeCardVertical from '@/components/RecipeCardVertical.vue';

const recipeStore = useRecipeListStore();
console.log(recipeStore.getRecipeList)

const recipeList = computed(() => recipeStore.getRecipeList);
</script>