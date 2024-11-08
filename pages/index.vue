<script setup>
const counter = useState('counter', () => Math.round(Math.random() * 1000))
const sameCounter = useState('counter')
</script>

<template>
  <div>HEllo world</div>
</template>
