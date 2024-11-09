<template>
  <!-- Check if recipeList is defined and has items before rendering -->
  <div v-if="recipeList && recipeList.length">
    <ul>
      <li v-for="recipe in recipeList" :key="recipe.name">
        {{ recipe.name }}
      </li>
    </ul>
  </div>
  <div v-else>
    <p>Loading recipes...</p>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRecipeListStore } from '@/stores/recipeList';

const recipeStore = useRecipeListStore();
console.log(recipeStore.getRecipeList)

// Fetch recipes when component mounts
// onMounted(() => {
//   if (!recipeStore.hasFetched) {
    // recipeStore.fetchRecipeList();
//   }
// });

const recipeList = computed(() => recipeStore.getRecipeList);
</script>