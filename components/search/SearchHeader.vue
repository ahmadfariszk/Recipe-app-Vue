<script setup lang="ts">
defineProps<{
  badgeFilterValue?: string;
  badgeFilterOptions?: string[];
  badgeFilterOnClick?: (value: string) => void;
  searchInputValue?: string;
  searchInputOnChange?: (value: string) => void;
}>();
const recipeStore = useRecipeArrayStore();
const isSelected = computed(() => recipeStore.getSelectedCategoryValue);
</script>

<template>
  <div
    class="flex justify-center items-center min-h-12 pt-8 -mb-12 relative bg-gradient-to-r from-cyan-500 to-blue-500"
  ></div>
  <div class="flex justify-center items-center pt-8">
    <BaseSearchBar 
      :value="searchInputValue"
      @update:value="searchInputOnChange"
    />
  </div>
  <!-- subheader -->
  <div class="flex justify-center mb-1">
    <SearchBadgeFilterToggle
      :value="badgeFilterValue"
      :options="badgeFilterOptions"
      :onClick="badgeFilterOnClick"
    />
    
  </div>
  <div 
      :class="{
        'opacity-0': isSelected === '', 
        'visibility-hidden': isSelected === ''
      }"
      class="flex justify-center transition-opacity duration-300 text-muted-color-emphasis text-sm"
    >
      <div>Unselect filter to see all recipes</div>
    </div>
</template>
