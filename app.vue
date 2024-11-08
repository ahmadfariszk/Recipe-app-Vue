<script setup lang="ts">
import { onMounted } from 'vue';
import { useRecipeListStore } from '@/stores/recipeList';

const recipeStore = useRecipeListStore();

onMounted(() => {
  recipeStore.fetchRecipes(); // Trigger API fetch once when the app mounts
});
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>
