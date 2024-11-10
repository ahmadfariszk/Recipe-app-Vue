<script setup lang="ts">
import { computed } from "vue";
import { useRecipeArrayStore } from "@/stores/recipeArrayStore";

const recipeStore = useRecipeArrayStore();
const recipeArray = computed(() => recipeStore.getRecipeArray);

</script>

<template>
  <!-- Check if recipeArray is defined and has items before rendering -->
  <div class="w-full flex justify-center">
    <div class="px-4 max-w-xl">
      <div v-if="recipeArray && recipeArray.length">
        <RecipeCardHorizontal
          v-for="recipe in recipeArray"
          :key="recipe.name"
          :recipe="recipe"
          @click="handleClickToRecipe(recipe.id)"
        />
      </div>
      <div  v-else-if="recipeStore.getSelectedCategoryValue" class="text-center">
        <p>There are no recipes found.</p>
      </div>
      <div v-else class="flex flex-col justify-center items-center mt-56 ">
        <BaseSpinner/>
        <p>Loading recipes...</p>
      </div>
    </div>
  </div>
</template>
