<script setup lang="ts">
    const route = useRoute();
    const id = Number(route.params.id); 
</script>
<template>
    <RecipePage :id="id" />
</template>