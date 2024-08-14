<template>
  <!-- 500 -->
  <div>
    <h1>{{ props.title }}</h1>
    <p>{{ props.message }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
  },
  message: {
    type: String,
  },
});
</script>
