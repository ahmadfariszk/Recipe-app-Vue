<template>
    <div class="flex justify-center items-center min-h-12 pt-8 -mb-12 relative bg-blue-500"></div>
  <div class="flex justify-center items-center pt-8">
      <FloatLabel variant="over">
        <IconField >
            <InputIcon class="pi pi-search" ><Search :size="20" /></InputIcon>
            <InputText id="over_label" class="h-10 min-w-72 " autocomplete="off" />
        </IconField>
        <label for="over_label" >Search recipes, keywords...</label>
      </FloatLabel>
  </div>
</template>
<script setup lang="ts">
import { Search } from 'lucide-vue-next';
</script>