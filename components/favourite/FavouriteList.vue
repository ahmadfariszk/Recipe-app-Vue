<script setup lang="ts">
const recipeStore = useRecipeArrayStore();
const favRecipeArray = computed(() => recipeStore.getFavRecipeArray);
recipeStore.listenLocalStorageEventUpdate();

</script>

<template>
    <div class="p-4">
      <div class="title text-xl">Your Favourites</div>
      <div v-if="favRecipeArray && favRecipeArray?.length">
        <RecipeCardHorizontal
          v-for="recipe in favRecipeArray"
          :key="recipe?.name"
          :recipe="recipe"
          @click="handleClickToRecipe(recipe?.id)"
        />
      </div>
      <div v-else>
        <p>Loading recipes...</p>
      </div>
    </div>
</template>