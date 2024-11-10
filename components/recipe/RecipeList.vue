<script setup lang="ts">
import { computed } from "vue";
import { useRecipeArrayStore } from "@/stores/recipeArrayStore";

const recipeStore = useRecipeArrayStore();
const recipeArray = computed(() => recipeStore.getRecipeArray);

</script>

<template>
  <!-- Check if recipeArray is defined and has items before rendering -->
  <div class="p-4">
    <div v-if="recipeArray && recipeArray.length">
      <RecipeCardHorizontal
        v-for="recipe in recipeArray"
        :key="recipe.name"
        :recipe="recipe"
        @click="handleClickToRecipe(recipe.id)"
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
