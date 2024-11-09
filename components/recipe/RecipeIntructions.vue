<template>
  <div
    class="flex mb-4"
    v-for="(instruction, step) in recipeInstructions"
    :key="step"
  >
    <div>
      <div
        class="flex items-center justify-center rounded-full bg-slate-600 w-9 h-9 text-white text-center mr-2"
      >
        {{ step + 1 }}
      </div>
    </div>
    <div class="mt-1">
      {{ instruction.text }}
    </div>
  </div>
</template>
<script lang="ts">
interface Instruction {
  text: string;
}

export default {
  props: {
    recipeInstructions: {
      type: Array as PropType<Instruction[]>,
      required: true
    }
  }
};
</script>
