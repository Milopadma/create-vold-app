<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps<{
  direction: 'left' | 'right';
}>();
</script>
<template>
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle opacity="0.2" cx="10" cy="10" r="10" fill="white" />
    <path :d="props.direction === 'left' ? 'M11 13L8 10L11 7' : 'M9 13L12 10L9 7'" stroke="white" stroke-width="1.5" />
  </svg>
</template>
