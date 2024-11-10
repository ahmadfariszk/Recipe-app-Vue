<template>
  <div class="overflow-x-auto whitespace-nowrap">
    <div class="flex items-start mx-2">
      <!-- Flex container for left alignment -->
      <SelectButton
        v-bind:modelValue="value"
        :options="options"
        :pt="{
          pcToggleButton: {
            // root: 'bg-blue-500 data-[p-checked=true]:bg-green-500 data-[p-checked=true]:before:bg-orange-500',
            // content: 'bg-red-500',
            onLable: 'a',
            root:'!rounded-full m-2 mx-1 border-surface-300 bg-transparent data-[p-checked=true]:bg-surface-200 data-[p-checked=true]:before:bg-surface-200 data-[p-checked=true]:before:shadow-none',
            label: 'text-nowrap',
          },
        }"
        @click="handleClick"
      />
    </div>
  </div>
  <!-- <div class="flex justify-center">
    <BaseToggleButtonBadge /><BaseToggleButtonBadge /><BaseToggleButtonBadge /><BaseToggleButtonBadge />
  </div> -->
</template>
<script setup lang="ts">
// const value = "Main Dish"; // Default value
// const options = ["Drinks", "Main Dish", "Pasta"]; // Options
const checked = ref(false);

const {
  value = "Main Dish",
  options = ["Drinks", "Main Dish", "Pasta"],
  onClick,
} = defineProps<{
  value?: string;
  options?: string[];
  onClick?: (value: string) => void;
}>();

// Track the last clicked category
const lastClickedCategory = ref<string | null>(null);

const handleClick = (event: PointerEvent) => {
  const input = event.target as HTMLElement;
  const clickedCategory = input?.innerText?.trim();

  // If the clicked category is the same as the last one, set it to an empty string
  if (clickedCategory === lastClickedCategory.value) {
    onClick?.("");
    lastClickedCategory.value = null; // Reset the last clicked category
  } else {
    onClick?.(clickedCategory);
    lastClickedCategory.value = clickedCategory; // Update last clicked category
  }
};
</script>
