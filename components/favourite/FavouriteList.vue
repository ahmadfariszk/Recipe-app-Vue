<script setup lang="ts">
const recipeStore = useRecipeArrayStore();
const favRecipeArray = computed(() => recipeStore.getFavRecipeArray);
recipeStore.listenLocalStorageEventUpdate();
</script>

<template>
  <div class="p-4 w-[99.9%] sm:max-w-xl ">
    <div class="title text-3xl font-semibold sm:text-4xl">Your Favourites</div>
    <div class="title text-sm flex items-center gap-1 text-muted-color">
      <i class="pi pi-info-circle mt-[2px]" style="font-size: 0.75rem"></i>
      Remove from favourites by toggling 
      <i class="pi pi-heart-fill" style="font-size: 0.75rem"></i>
      button
    </div>
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
