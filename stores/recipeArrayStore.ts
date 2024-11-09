import { defineStore } from "pinia";

export type Recipe = {
  name: string;
  id: number;
  url: string;
  image: string[];
  author: {
    name: string;
  };
  datePublished: string;
  description: string;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  keywords: string;
  recipeCuisine: string;
  recipeCategory: string;
  nutrition: {
    fatContent: number;
    fiberContent: number;
    carbohydrateContent: number;
    proteinContent: number;
    cholesterolContent: number;
  };
  recipeIngredient: string[];
  recipeInstructions: {
    text: string;
  }[];
  aggregateRating: null | number;
};

export const useRecipeArrayStore = defineStore("recipeArray", {
  state: (): { recipeArray: Recipe[]; hasFetched: boolean } => ({
    recipeArray: [],
    hasFetched: false,
  }),
  getters: {
    // Getter to access recipes directly
    getRecipeArray(state) {
      return state.recipeArray;
    },
    // Retrieve a single recipe by ID
    getRecipeById: (state) => (id:number) => {
      return state.recipeArray.find((recipe) => recipe.id === id);
    },
  },
  actions: {
    setRecipeArray(newRecipes: Recipe[]) {
      this.recipeArray = newRecipes;
      this.hasFetched = true;
    },
    async fetchRecipeArray() {
      if (!this.hasFetched) {
        try {
          const response = await fetch(
            `https://raw.githubusercontent.com/micahcochran/json-cookbook/refs/heads/main/cookbook-100.json`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch recipes");
          }
          const data: Recipe[] = await response.json();

          // Add unique IDs to each recipe, for selecting recipe individually (even after mutation)
          const recipesWithIds = data.map((recipe, index) => ({
            ...recipe,
            id: index + 1, // Start IDs at 1, or use `index` if you want to start at 0
          }));

          this.setRecipeArray(recipesWithIds); // Update the recipes array with IDs
        } catch (error) {
          console.error("Error fetching recipes:", error);
        }
      }
    },
  },
});
