<template>
  <div>
    <div>{{ title }}</div>
    <div>
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true
  }
});
</script>
