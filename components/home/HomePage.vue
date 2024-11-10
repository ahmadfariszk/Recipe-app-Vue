<script setup lang="ts">
// Handler to redirect when search is focused (triggered by focus event)
const handleFocus = () => {
  console.log("Search bar focused");
  useRouter().push({ path: `/search` });
  //   Redirect to search page after a small delay to allow animation to complete
  setTimeout(() => {
    console.log("Redirecting to /search page");
    useRouter().push({ path: `/search` });
  }, 300); // Delay matching your transition timing
};
</script>

<template>
  <div class="h-screen">
    <div class="flex justify-center items-center h-1/3 bg-blue-500">
      <SearchBar @click="handleFocus" />
    </div>
    <FavouriteList/>
  </div>
</template>
