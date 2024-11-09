<template>
  <div>
    <div v-if="recipe">
      <!-- Todo: apply  parallax-->
      <img
        class="w-full object-cover overflow-hidden"
        alt="food header"
        :src="recipe.image[0]"
      />
      <Card
        class="text-lg -mt-16 rounded-3xl relative shadow-none"
        :pt="{
          title: 'text-3xl font-bold',
        }"
      >
        <template #title>{{ recipe.name }}</template>
        <template #subtitle>
          <div class="flex gap-2">
            <div>{{ recipe.recipeCategory }}</div>
            <div>•</div>
            <div>{{ recipe.cookTime }}</div>
          </div>
        </template>
        <template #content>
          <BaseReadMore :text="recipe.description" class="text-base" />
          <BaseDivider />
          <RecipeInfo title="Ingredients">
            <template #body>
              <RecipeIngredient :recipe-ingredient="recipe.recipeIngredient" />
            </template>
          </RecipeInfo>
          <BaseDivider />
          <RecipeInfo title="Steps">
            <template #body>
              <RecipeIntructions
                :recipe-instructions="recipe.recipeInstructions"
              />
            </template>
          </RecipeInfo>
        </template>
      </Card>
    </div>
    <div v-else>
      <p>Loading recipes...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRecipeArrayStore } from "@/stores/recipeArrayStore";

const recipeStore = useRecipeArrayStore();

const recipe = computed(() => recipeStore.getRecipeById(1));
</script>
