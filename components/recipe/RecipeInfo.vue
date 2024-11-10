<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div>
    <div class="text-2xl font-semibold mb-2">{{ title }}</div>
    <div>
      <slot name="body"></slot>
    </div>
  </div>
</template>
