<script setup lang="ts"></script>

<template>
  <ToggleButton
    v-model="checked"
    onLabel=" "
    onIcon="pi pi-heart-fill"
    offLabel=" "
    offIcon="pi pi-heart"
    size="small"
    class="rounded-full max-w-6 max-h-6 border-surface-300 bg-transparent data-[p-checked=true]:bg-surface-200 data-[p-checked=true]:before:bg-surface-200 data-[p-checked=true]:before:shadow-none"
  />
</template>
