import { defineStore } from "pinia";

export type Recipe = {
  name: string;
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

export const useRecipeListStore = defineStore("recipeList", {
  state: (): { recipeList: Recipe[]; hasFetched: boolean } => ({
    recipeList: [],
    hasFetched: false,
  }),
  getters: {
    // Getter to access recipes directly
    getRecipeList(state) {
      return state.recipeList;
    }
  },
  actions: {
    setRecipeList(newRecipes: Recipe[]) {
      this.recipeList = newRecipes;
      this.hasFetched = true;
      console.log('Recipe List:', this.recipeList);
    },
    async fetchRecipeList() {
      if (!this.hasFetched) {
        try {
          const response = await fetch(
            `https://raw.githubusercontent.com/micahcochran/json-cookbook/refs/heads/main/cookbook-100.json`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch recipes");
          }
          const data: Recipe[] = await response.json();
          this.setRecipeList(data); // Use setRecipes to update the recipes array
          console.log(data)
        } catch (error) {
          console.error("Error fetching recipes:", error);
        }
      }
    },
  },
});
