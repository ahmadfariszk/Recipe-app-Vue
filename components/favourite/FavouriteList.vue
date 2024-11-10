<script setup lang="ts">
const recipeStore = useRecipeArrayStore();
const favRecipeArray = computed(() => recipeStore.getFavRecipeArray);
</script>

<template>
    <div v-if="favRecipeArray && favRecipeArray.length">
      <RecipeCardHorizontal
        v-for="recipe in favRecipeArray"
        :key="recipe.name"
        :recipe="recipe"
        @click="handleClickToRecipe(recipe.id)"
      />
    </div>
    <div v-else>
      <p>Loading recipes...</p>
    </div>
</template>