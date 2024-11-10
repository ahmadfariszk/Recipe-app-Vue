<script setup lang="ts">
import { computed } from "vue";
import { useRecipeArrayStore } from "@/stores/recipeArrayStore";

const recipeStore = useRecipeArrayStore();

const categoryList = computed(() => recipeStore.getCategoryOptions);
const selectedCategoryValue = computed(
  () => recipeStore.getSelectedCategoryValue
);
</script>

<template>
  <SearchHeader
    :badge-filter-options="categoryList"
    :badge-filter-on-click="recipeStore.handleOnClickCategory"
    :badge-filter-value="selectedCategoryValue"
  />
  <RecipeList />
</template>
