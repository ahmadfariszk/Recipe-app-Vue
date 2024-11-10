<script setup lang="ts">
import { computed } from "vue";
import { useRecipeArrayStore } from "@/stores/recipeArrayStore";

const recipeStore = useRecipeArrayStore();

const categoryList = computed(() => recipeStore.getCategoryOptions);
const selectedCategoryValue = computed(() => recipeStore.getSelectedCategoryValue);
recipeStore.listenLocalStorageEventUpdate();

const searchInputValue = computed(() => recipeStore.getSearchRecipeInputValue);

</script>

<template>
  <SearchHeader
    :badge-filter-options="categoryList"
    :badge-filter-on-click="recipeStore.handleOnClickCategory"
    :badge-filter-value="selectedCategoryValue"
    :search-input-on-change="recipeStore.handleOnSearchRecipeInput"
    :search-input-value="searchInputValue"
  />
  <RecipeList/>
</template>