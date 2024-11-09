<template>
  <div>
    <div v-if="recipe">
      <img
        class="w-full object-cover overflow-hidden"
        alt="food header"
        :src="recipe.image[0]"
      />
      <Card>
        <template #title>{{ recipe.name }}</template>
        <template #subtitle
          >{{ recipe.recipeCategory }}{{ recipe.cookTime }}</template
        >
        <template #content>
          <div class="h-full">
            <BaseReadMore :text="recipe.description" class="text-sm" />
          </div>
          <Divider />
          <RecipeInfo title="Ingredient">
            <template #body>
              <RecipeIngredient :recipe-ingredient="recipe.recipeIngredient" />
            </template>
          </RecipeInfo>
          <RecipeInfo title="Ingredient">
            <template #body>
              <RecipeIntructions :recipe-instructions="recipe.recipeInstructions"/>
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
import { useRecipeListStore } from "@/stores/recipeList";

const recipeStore = useRecipeListStore();

const recipe = computed(() => recipeStore.getRecipeById(1));
</script>
