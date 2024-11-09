<script setup lang="ts">
import { onMounted } from 'vue';
import { useRecipeArrayStore } from '@/stores/recipeArrayStore';

const recipeStore = useRecipeArrayStore();

onMounted(() => {
  recipeStore.fetchRecipeArray(); // Trigger API fetch once when the app mounts
});
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>
