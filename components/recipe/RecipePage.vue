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
          <div class="flex items-center mt-2">
            <Avatar
              :label="nameInitials"
              class="mr-2"
              style="background-color: #dee9fc; color: #1a2551"
              shape="circle"
            />
            <div>{{ truncatedName }}</div>
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
const props = defineProps<{ id: number }>();
const recipe = computed(() => recipeStore.getRecipeById(props.id));

const str = "Lodash is great";
const nameInitials = computed(() => {
  const name = recipe.value?.author?.name || '';
  const words = name.split(' ').slice(0, 2); // Take only the first two words
  const initials = words.map(word => word.charAt(0).toUpperCase()).join('');
  return initials;
});

const truncatedName = computed(() => {
  const author = recipe.value?.author;
  
  // Check if @type is "Person"
  if (author?.["@type"] === "Person") {
    const name = author.name || '';
    const index = name.search(/[^a-zA-Z\s]/); // Search for the first non-letter character
    console.log("test")
    return index === -1 ? name : name.slice(0, index).trim(); // Slice before the first non-letter character
  }
  
  // If @type is "Organisation" or anything else, return the full name
  return author?.name || '';
});
</script>
