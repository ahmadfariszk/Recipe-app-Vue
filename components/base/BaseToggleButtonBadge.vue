<template>
    <div>
      <ToggleButton
        v-model="checked"
        class="h-12 text-sm rounded-3xl"
        size="small"
        :onLabel="label"
        :offLabel="label"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const checked = ref(false);
  const label = ref('Active');
  
  </script>