import { defineStore } from "pinia";
import { startCase } from 'lodash';

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
  state: (): { recipeArray: Recipe[]; hasFetched: boolean; recipeCategoryOptions: Set<string>; selectedCategoryValue: string; filteredRecipeArray: Recipe[] } => ({
    recipeArray: [],
    hasFetched: false,
    recipeCategoryOptions: new Set(),
    selectedCategoryValue: '',
    filteredRecipeArray: [],
  }),
  getters: {
    getRecipeArray(state) {
      return state.selectedCategoryValue ? state.filteredRecipeArray : state.recipeArray;
    },
    getRecipeById: (state) => (id: number) => {
      return state.recipeArray.find((recipe) => recipe.id === id);
    },
    getCategoryOptions(state) {
      return Array.from(state.recipeCategoryOptions).sort();
    },
    getSelectedCategoryValue(state) {
      return state.selectedCategoryValue;
    },
  },
  actions: {
    setRecipeArray(newRecipes: Recipe[]) {
      this.recipeArray = newRecipes;
      this.updateCategoryOptions();
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

          const recipesWithIds = data.map((recipe, index) => ({
            ...recipe,
            id: index + 1,
          }));

          this.setRecipeArray(recipesWithIds);
          console.log('category options', this.getCategoryOptions);
        } catch (error) {
          console.error("Error fetching recipes:", error);
        }
      }
    },
    updateCategoryOptions() {
      const categoryCounts = new Map();

      this.recipeArray.forEach((recipe) => {
        let categories: string[] = [];
        if (Array.isArray(recipe.recipeCategory)) {
          categories = recipe.recipeCategory;
        } else if (typeof recipe.recipeCategory === "string") {
          categories = recipe.recipeCategory.split(",");
        }

        categories.forEach((category) => {
          const normalizedCategory = startCase(category.trim().toLowerCase());
          categoryCounts.set(
            normalizedCategory,
            (categoryCounts.get(normalizedCategory) || 0) + 1
          );
        });
      });

      this.recipeCategoryOptions = new Set(
        Array.from(categoryCounts.entries())
          .filter(([_, count]) => count > 2)
          .map(([category]) => category)
      );
    },
    handleOnClickCategory(value: string) {
      console.log('Selected category: ', value);
      this.selectedCategoryValue = value;
      this.filterRecipesByCategory(); // Call the filter function when category is selected
      console.log('filtered: ', this.filteredRecipeArray)
    },
    filterRecipesByCategory() {
      if (!this.selectedCategoryValue) {
        this.filteredRecipeArray = this.recipeArray; // If no category is selected, show all recipes
        return;
      }

      const selectedCategory = startCase(this.selectedCategoryValue.trim().toLowerCase());
      this.filteredRecipeArray = this.recipeArray.filter((recipe) => {
        if (Array.isArray(recipe.recipeCategory)) {
          return recipe.recipeCategory.some(category => startCase(category.trim().toLowerCase()) === selectedCategory);
        } else if (typeof recipe.recipeCategory === "string") {
          return startCase(recipe.recipeCategory.trim().toLowerCase()) === selectedCategory;
        }
        return false;
      });
    },
  },
});

