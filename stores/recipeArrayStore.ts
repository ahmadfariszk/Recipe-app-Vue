import { defineStore } from "pinia";
import { startCase, some } from "lodash";
export type Author = {
  "@type": "Person" | "Organisation"; // Union for @type
  name: string; // Common property for both Person and Organisation
};
export type Recipe = {
  name: string;
  id: number;
  url: string;
  image: string[] | string;
  author: Author;
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
  state: (): {
    recipeArray: Recipe[];
    hasFetched: boolean;
    recipeCategoryOptions: Set<string>;
    selectedCategoryValue: string;
    filteredRecipeArray: Recipe[];
    favRecipeIds: number[];
    favRecipeArray: Recipe[];
    searchRecipeInputValue: string;
    debounceTimeout: ReturnType<typeof setTimeout> | null; // For debouncing
  } => ({
    recipeArray: [],
    hasFetched: false,
    recipeCategoryOptions: new Set(),
    selectedCategoryValue: "",
    filteredRecipeArray: [],
    favRecipeIds: JSON.parse(localStorage.getItem("favRecipeIds") || "[]"),
    favRecipeArray: [],
    searchRecipeInputValue: "",
    debounceTimeout: null as ReturnType<typeof setTimeout> | null, // For debouncing
  }),
  getters: {
    getRecipeArray(state) {
      return state.selectedCategoryValue || state.searchRecipeInputValue
        ? state.filteredRecipeArray
        : state.recipeArray;
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
    favoriteRecipes(state) {
      return state.recipeArray.filter((recipe) =>
        state.favRecipeIds.includes(recipe.id),
      );
    },
    getFavRecipeIds(state) {
      return state.favRecipeIds;
    },
    getFavRecipeArray(state) {
      return state.favRecipeArray;
    },
    getSearchRecipeInputValue(state) {
      return state.searchRecipeInputValue;
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
            `https://raw.githubusercontent.com/micahcochran/json-cookbook/refs/heads/main/cookbook-100.json`,
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
          this.updateFavRecipeArray();
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
            (categoryCounts.get(normalizedCategory) || 0) + 1,
          );
        });
      });

      this.recipeCategoryOptions = new Set(
        Array.from(categoryCounts.entries())
          .filter(([_, count]) => count > 2)
          .map(([category]) => category),
      );
    },
    handleOnClickCategory(value: string) {
      console.log("Selected category: ", value);
      this.selectedCategoryValue = value;
      this.filterRecipesByCategory(); // Call the filter function when category is selected
      this.filterRecipesBySearch(); // Calling this just in case there's a search input value
      console.log("filtered: ", this.filteredRecipeArray);
    },

    filterRecipesByCategory() {
      if (!this.selectedCategoryValue) {
        this.filteredRecipeArray = this.recipeArray; // If no category is selected, show all recipes
        return;
      }

      const selectedCategory = startCase(
        this.selectedCategoryValue.trim().toLowerCase(),
      );
      const recipeArrayToFilter = this.searchRecipeInputValue
        ? this.filteredRecipeArray
        : this.recipeArray;

      this.filteredRecipeArray = recipeArrayToFilter.filter((recipe) => {
        if (Array.isArray(recipe.recipeCategory)) {
          return recipe.recipeCategory.some(
            (category) =>
              startCase(category.trim().toLowerCase()) === selectedCategory,
          );
        } else if (typeof recipe.recipeCategory === "string") {
          return (
            startCase(recipe.recipeCategory.trim().toLowerCase()) ===
            selectedCategory
          );
        }
        return false;
      });
    },
    toggleFavorite(recipeId: number) {
      if (this.favRecipeIds.includes(recipeId)) {
        this.favRecipeIds = this.favRecipeIds.filter((id) => id !== recipeId);
      } else {
        this.favRecipeIds.push(recipeId);
      }
      this.updateFavRecipeArray();
      this.saveFavorites();
    },

    saveFavorites() {
      localStorage.setItem("favRecipeIds", JSON.stringify(this.favRecipeIds));
    },

    loadFavorites() {
      this.favRecipeIds = JSON.parse(
        localStorage.getItem("favRecipeIds") || "[]",
      );
    },
    updateFavRecipeArray() {
      this.favRecipeArray = this.recipeArray.filter((recipe) =>
        this.favRecipeIds.includes(recipe.id),
      );
    },

    listenLocalStorageEventUpdate() {
      if (typeof window !== "undefined") {
        window.addEventListener("storage", (event) => {
          if (event.key === "favRecipeIds") {
            // Check if the key is 'likeCount'
            this.loadFavorites(); // Update the Pinia store with the latest array from localStorage
            this.updateFavRecipeArray();
          }
        });
      }
    },

    handleOnSearchRecipeInput(value: string) {
      this.searchRecipeInputValue = value;

      if (this.debounceTimeout) {
        clearTimeout(this.debounceTimeout);
      }

      this.debounceTimeout = setTimeout(() => {
        this.filterRecipesByCategory(); // Calling this just in case there's a category selected
        this.filterRecipesBySearch();
      }, 1000);
    },

    filterRecipesBySearch() {
      const keywordRegex = new RegExp(
        `\\b${this.searchRecipeInputValue}\\b`,
        "i",
      ); // word boundary regex
      const recipeArrayToFilter = this.selectedCategoryValue
        ? this.filteredRecipeArray
        : this.recipeArray;

      const result = recipeArrayToFilter.filter((obj) =>
        some(
          obj,
          (value) => typeof value === "string" && keywordRegex.test(value),
        ),
      );
      this.filteredRecipeArray = this.searchRecipeInputValue
        ? result
        : this.getRecipeArray;
    },
  },
});
