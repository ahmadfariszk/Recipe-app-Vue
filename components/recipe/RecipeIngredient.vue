<template>
    <div>
      <ul>
        <li v-for="(ingredient, index) in recipeIngredient" :key="index">{{ ingredient }}</li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    props: {
      recipeIngredient: {
        type: Array,
        required: true
      }
    }
  }
  </script>
