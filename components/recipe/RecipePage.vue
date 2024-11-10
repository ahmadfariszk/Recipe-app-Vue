<script setup lang="ts">
import { computed } from "vue";
import { useRecipeArrayStore } from "@/stores/recipeArrayStore";
import { formatDuration, intervalToDuration } from "date-fns";

const recipeStore = useRecipeArrayStore();
const props = defineProps<{ id: number }>();
const recipe = computed(() => recipeStore.getRecipeById(props.id));

const nameInitials = computed(() => {
  const name = recipe.value?.author?.name || "";
  const words = name.split(" ").slice(0, 2); // Take only the first two words
  const initials = words.map((word) => word.charAt(0).toUpperCase()).join("");
  return initials;
});

const truncatedName = computed(() => {
  const author = recipe.value?.author;
  // Cut off person name at special characters
  if (author?.["@type"] === "Person") {
    const name = author?.name || "";
    const index = name.search(/[^a-zA-Z\s]/);
    console.log("test");
    return index === -1 ? name : name.slice(0, index).trim();
  }
  return author?.name || "";
});

const formattedTime = computed(() => {
  const durationString: string = recipe.value?.cookTime ?? "PT0M"; // ISO 8601 format for 80 minutes
  function parseDuration(durationISO: string): {
    hours: number;
    minutes: number;
  } {
    const minutesMatch = durationISO.match(/PT(\d+)M/);
    const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;
    const hours = Math.floor(minutes / 60);
    return { hours, minutes: minutes % 60 };
  }
  const duration = parseDuration(durationString);
  const formattedDuration: ComputedRef<string> = computed(() => {
    const parts: string[] = [];
    if (duration.hours > 0) {
      parts.push(`${duration.hours} hour${duration.hours > 1 ? "s" : ""}`);
    }
    if (duration.minutes > 0) {
      parts.push(
        `${duration.minutes} minute${duration.minutes !== 1 ? "s" : ""}`,
      );
    }
    return parts.join(" ") || "0 minutes";
  });
  return formattedDuration;
});
</script>

<template>
  <div>
    <div v-if="recipe">
      <!-- Todo: apply  parallax-->
      <div class="sm:flex sm:items-center sm:justify-center sm:h-screen">
        <div class="sm:flex sm:items-center sm:min-w-96 sm:bg-gradient-to-r sm:from-cyan-500 sm:to-blue-500 sm:h-screen">
          <img
            class="w-full max-h-96 object-cover bg-fixed overflow-hidden sm:object-scale-down"
            alt="food header"
            :src="recipe?.image[0]"
          />
        </div>
        <Card
          class="text-lg -mt-16 sm:overflow-x-hidden rounded-3xl relative shadow-none sm:h-screen sm:py-24 sm:overflow-scroll sm:max-w-prose"
          :pt="{
            title: 'text-3xl font-bold',
          }"
        >
          <template #title>{{ recipe?.name || "Unnamed Recipe" }}</template>
          <template #subtitle>
            <div class="flex gap-2">
              <div>{{ recipe?.recipeCategory || "No Category" }}</div>
              <div>•</div>
              <div>{{ formattedTime || "Unknown duration" }}</div>
            </div>
            <div class="flex items-center mt-3 -mb-1 text-sm font-semibold">
              <Avatar
                :label="nameInitials"
                class="mr-2"
                style="background-color: #dee9fc; color: #1a2551"
                shape="circle"
              />
              <div>
                {{ truncatedName }}
                <span v-if="truncatedName && recipe?.datePublished"> • </span>
                {{ recipe?.datePublished }}
              </div>
            </div>
          </template>
          <template #content>
            <BaseReadMore :text="recipe?.description" class="text-base" />
            <BaseDivider />
            <RecipeInfo title="Ingredients">
              <template #body>
                <RecipeIngredient
                  :recipe-ingredient="recipe?.recipeIngredient"
                />
              </template>
            </RecipeInfo>
            <BaseDivider />
            <RecipeInfo title="Steps">
              <template #body>
                <RecipeIntructions
                  :recipe-instructions="recipe?.recipeInstructions"
                />
              </template>
            </RecipeInfo>
          </template>
        </Card>
      </div>
    </div>
    <div v-else class="flex">
      <BaseSpinner />
      <p>Loading recipes...</p>
    </div>
  </div>
</template>
