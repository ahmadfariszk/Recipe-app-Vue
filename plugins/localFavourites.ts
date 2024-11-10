export default defineNuxtPlugin(nuxtApp => {
    const recipeStore = useRecipeArrayStore();
  
    // Load the favorite recipes from localStorage (only on client-side)
    const loadFavorites = () => {
      // Using onMounted ensures this code runs only on the client side
      onMounted(() => {
        if (typeof window !== 'undefined' && localStorage) {
          const storedFavorites = localStorage.getItem('favRecipeIds');
          if (storedFavorites) {
            recipeStore.favRecipeIds = JSON.parse(storedFavorites);
          }
        }
      });
    };
  
    // Save the favorite recipes to localStorage (only on client-side)
    const saveFavorites = () => {
      onMounted(() => {
        if (typeof window !== 'undefined' && localStorage) {
          localStorage.setItem('favRecipeIds', JSON.stringify(recipeStore.favRecipeIds));
        }
      });
    };
  
    // Load the favorites when the app is mounted (client-side only)
    nuxtApp.hook('app:mounted', () => {
      loadFavorites();
    });
  
    // Save favorites after each page load
    nuxtApp.hook('page:finish', () => {
      saveFavorites();
    });
  });