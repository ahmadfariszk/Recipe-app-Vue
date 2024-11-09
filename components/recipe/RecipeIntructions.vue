<template>
  <div
    class="flex"
    v-for="(instruction, step) in recipeInstructions"
    :key="step"
  >
    <div>
      <div
        class="flex items-center justify-center rounded-full bg-slate-600 w-12 h-12 text-white text-center mx-2"
      >
        {{ step + 1 }}
      </div>
    </div>
    <div>
      {{ instruction.text }}
    </div>
  </div>
</template>
<script lang="ts">
interface Instruction {
  text: string;
}

const props = defineProps({
  recipeInstructions: {
    type: Array as PropType<Instruction[]>,
    required: true,
  },
});
</script>
